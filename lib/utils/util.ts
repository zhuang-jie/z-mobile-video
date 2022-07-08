import { Component } from 'vue'
// 是否是移动端
export const isMobile = !!('ontouchstart' in window)

// 是否是ios
export const isIOS = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

// 时间格式化
export const timeFormat = (time: number) => {
    let hh: any = ~~(time / 3600)
    let mm: any = ~~((time % 3600) / 60)
    let ss: any = ~~(time % 60) //取整
    hh = hh < 10 ? '0' + hh : hh //个位数补0
    mm = mm < 10 ? '0' + mm : mm //个位数补0
    ss = ss < 10 ? '0' + ss : ss //个位数补0
    return `${hh}:${mm}:${ss}`
}

// 绑定事件
export const on = (
    el: Element | HTMLElement | Document | Window,
    event: string,
    // eslint-disable-next-line no-undef
    handler: EventListenerOrEventListenerObject,
    useCapture = false,
): void => {
    if (el && event && handler) {
        el.addEventListener(event, handler, useCapture)
    }
}

// 解绑事件
export const off = (
    el: Element | HTMLElement | Document | Window,
    event: string,
    // eslint-disable-next-line no-undef
    handler: EventListenerOrEventListenerObject,
    useCapture = false,
): void => {
    if (el && event && handler) {
        el.removeEventListener(event, handler, useCapture)
    }
}
// 获取元素包围盒
export const getRect = (el: Element | HTMLElement) => {
    return el.getBoundingClientRect()
}

// 合并函数
export const compose = (...args: Array<(e: any) => void>) => {
    return (value: any) => args.reverse().reduce((v, fn) => {
        fn(v)
        return v
    }, value)
}

// 创建挂载实例
export function mountComponent(RootComponent: Component) {
    const app = createApp(RootComponent)
    const root = document.createElement('div')

    document.body.appendChild(root)

    return {
        instance: app.mount(root),
        unmount() {
            app.unmount()
            document.body.removeChild(root)
        },
    }
}

export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === 'object'