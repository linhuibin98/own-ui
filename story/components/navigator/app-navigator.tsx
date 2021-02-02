import { defineComponent, reactive, onBeforeUnmount, provide, inject } from 'vue'
/*路由信息*/
interface Route {
    path?: string
    hash?: string
    param?: { [k: string]: string }
}
const APP_NAVIGATOR_PROVIDER = '@@app-navigator'

/*
* hash路由 获取路由路径
* @author linhuibin
* @date 2021/02/02
* */
function getRoute(): Route {
    let locationHash = window.location.hash || ''
    if (locationHash.charAt(0) === '#') {
        locationHash = locationHash.slice(1)
    }
    const [path, hash] = decodeURIComponent(locationHash).split('#')

    return {
        path,
        hash
    }
}

/*
* 获取路由 state, methods
* @author linhuibin
* @date 2021/02/02
* */
function useAppNavigator(props: { defaultPath?: string }) {
    // 获取当前路由
    const currentRoute = getRoute()
    !currentRoute.path && (currentRoute.path = props.defaultPath)

    const state = reactive({
        route: currentRoute
    })
    const methods = {
        go(path: string) {
            window.location.hash = encodeURIComponent(path)
        }
    }
    const refer = {
        state,
        methods
    }

    const handler = {
        hashchange: () => {
            state.route = getRoute()
        }
    }

    window.addEventListener('hashchange', handler.hashchange)
    onBeforeUnmount(() => window.removeEventListener('hashchange', handler.hashchange))
    /*向子组件注入 路由信息*/
    provide(APP_NAVIGATOR_PROVIDER, refer)
    return refer
}

export function injectAppNavigator() {
    return inject(APP_NAVIGATOR_PROVIDER) as ReturnType<typeof useAppNavigator>
}

export const AppNavigator = defineComponent({
    name: 'app-navigator',
    props: {
        defaultPath: String
    },
    setup(props, setupContext) {
        useAppNavigator(props)
        return () => !!setupContext.slots.default ? setupContext.slots.default() : null
    }
})


