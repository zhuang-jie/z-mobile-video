import type { ComponentPublicInstance, TeleportProps } from 'vue'
import { mountComponent, isObject } from '../utils/util'
import ZToast from './z-toast.vue'

interface ToastOptions {
    message?: string;
    position?: 'bottom' | 'middle';
    zIndex?: number;
    duration?: number;
    teleport?: TeleportProps['to'];
    onClose?: () => void;
}

const defaultOptions: ToastOptions = {
    position: 'middle',
    zIndex: 2000,
    duration: 2000,
}

let $instance: ComponentPublicInstance<{}, any> | undefined
function useToastState() {
    const state = reactive<{
        show: boolean;
        [key: string]: any;
    }>({
        show: false,
    })

    const toggle = (show: boolean) => {
        state.show = show
    }
    const open = (props: Record<string, any>) => {
        Object.assign(state, props)
        toggle(true)
    }
    const close = () => toggle(false)

    return {
        state,
        toggle,
        open,
        close
    }
}
// 参数解析
function parseOptions(message: string | ToastOptions): ToastOptions {
    if (isObject(message)) {
        return message
    }
    return { message }
}
// 创建单例
function createInstance() {
    const { instance } = mountComponent({
        setup() {
            const { state, toggle, open, close } = useToastState()

            const render = () => {
                return h(ZToast, {
                    ...state,
                    'onUpdate:show': toggle,
                })
            }
            (getCurrentInstance() as any).render = render

            return {
                open,
                close
            }
        }
    })
    return instance
}
function getInstance() {
    if (!$instance) {
        const instance = createInstance()
        $instance = instance
    }
    return $instance
}
function Toast(message: string | ToastOptions = {}) {
    const options: ToastOptions = {
        ...defaultOptions,
        ...parseOptions(message)
    }
    const instance = getInstance()
    instance.open(options)
}

export { Toast }
