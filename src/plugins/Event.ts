type OwnEventListener = (SimpleFunction & { fn?: any })
type OwnEventListenName = string | symbol
export type OwnEvent = ReturnType<typeof createOwnEvent>

export function createOwnEvent() {
    /**
     * 第一次调用getEvents的时候才创建map对象
     * @author  linhuibin
     * @date    2021/01/18 14:42
     */
    const getListenMap = (() => {
        let events: Map<ListenName, Listener[]>;
        return () => {
            if (!events) {
                events = new Map<ListenName, Listener[]>()
            }
            return events
        }
    })()

    let hasListener = false

    const event = {
        on: (listenName: ListenName, fn: SimpleFunction) => {

            hasListener = true

            const listenMap = getListenMap()
            const map = listenMap.get(listenName)
            if (!!map) {
                map.push(fn)
            } else {
                listenMap.set(listenName, [fn])
            }
            return () => event.off(listenName, fn)
        },
        once: (listenName: ListenName, fn: SimpleFunction) => {

            hasListener = true

            const on: Listener = (...args: any[]) => {
                event.off(listenName, fn)
                fn(...args)
            }
            on.fn = fn
            event.on(listenName, on)
            return () => event.off(listenName, on)
        },
        off: (listenName: ListenName, fn?: SimpleFunction) => {
            const listenMap = getListenMap()

            const listeners = listenMap.get(listenName)
            if (!listeners) {
                return;
            }

            /*移除listenName的所有监听器*/
            if (!fn) {
                listenMap.set(listenName, [])
                return
            }

            for (let i = 0; i < listeners.length; i++) {
                const listener = listeners[i];
                if (fn === listener || (!!listener.fn && fn === listener.fn)) {
                    listeners.splice(i, 1)
                    break
                }
            }
        },
        emit: (listenName: ListenName, ...args: any[]) => {
            const listeners = getListenMap().get(listenName)
            if (!!listeners) {
                listeners.forEach(listener => listener(...args))
            }
        },
        clear: () => {
            if (hasListener) {
                getListenMap().clear()
            }
        }
    }

    return event
}