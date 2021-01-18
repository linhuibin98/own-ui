import {
    Component,
    ComponentPropsOptions,
    defineComponent,
    Directive,
    ExtractPropTypes,
    inject,
    provide,
    SetupContext,
    getCurrentInstance,
    Ref,
    ref,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    EmitsOptions,
    DefineComponent,
} from 'vue'
import {CreateError} from "@/utils/createError"
import {renderNothing} from "@/utils/renderNothing"
import {ComponentEvent, getComponentEmit, useEvent} from "./useEvent"

const error = new CreateError('designComponent')

interface RefValue<T> {
    (): Ref<null | T>

    (refName?: string): Readonly<{ value: null | T }>
}

interface InjectValue<Refer> {
    (): Refer,

    <DefaultValue>(defaultValue?: DefaultValue): Refer | DefaultValue
}

interface UseType<Refer, Props> {
    ref: RefValue<Refer>
    inject: InjectValue<Refer>
    class: Refer
    props: Props
}

export function designComponent<PropsOptions extends Readonly<ComponentPropsOptions>,
    RawBindings,
    D,
    Refer,
    Expose extends object,
    Props extends Readonly<ExtractPropTypes<PropsOptions>>,
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = Record<string, any>,
    EE extends string = string,
    >(
    options: {
        provideRefer?: boolean,
        emits?: E,
        setup?: (parameter: { props: Props, event: ComponentEvent<E>, setupContext: SetupContext<E> }) => {
            refer?: Refer
            render: () => any,
        },
        name?: string,
        props?: PropsOptions,
        mixins?: any[],
        components?: Record<string, Component>;
        directives?: Record<string, Directive>;
    },
    expose?: Expose,
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> & {
    use: UseType<Refer, Props>
} & Expose {
    const {provideRefer, emits, setup, ...leftOptions} = options

    const use: UseType<Refer, Props> = {
        inject: (defaultValue?: any) => {
            return inject(`@@${options.name}`, defaultValue) as Refer
        },
        class: Object as any as Refer,
        ref: (refName?: string) => {
            if (!!refName) {
                const ctx = getCurrentInstance()!
                return {
                    get value() {
                        return ctx.refs[refName!]
                    }
                } as any
            } else {
                return ref(null)
            }
        },
        props: Object as any as Props,
    }

    return Object.assign(
        defineComponent({
            ...(leftOptions as any || {}),
            props: leftOptions.props as PropsOptions,
            emits: getComponentEmit(emits),
            setup(props: any, setupContext: any) {
                if (!setup) {
                    error.throw('setup is necessary!')
                    return renderNothing
                }
                const ctx = getCurrentInstance()!
                const event = useEvent<E>(emits!)
                const {refer, render} = setup({
                    props,
                    event,
                    setupContext,
                })
                if (!!refer) {
                    const duplicateKey = Object.keys(refer || {})
                        .find(i => Object.prototype.hasOwnProperty.call(ctx.proxy as any, i))
                    if (!!duplicateKey) {
                        console.error(`designComponent:${leftOptions.name} key '${duplicateKey}' in refer is not allow here!`)
                    } else {
                        Object.assign(ctx.proxy, refer)
                    }
                }
                (ctx as any)._event = event
                if (provideRefer) {
                    if (!options.name) {
                        error.throw('component name is necessary when provideRefer is true!')
                    } else {
                        provide(`@@${options.name}`, refer)
                    }
                }
                return refer
            },
        }), {use, ...(expose || {}) as any}
    )
}