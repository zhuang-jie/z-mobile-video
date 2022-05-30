import { Ref } from 'vue'
import { isMobile, on, off } from '../utils/util'

const startEvent = isMobile ? 'touchstart' : 'mousedown'
const endEvent = isMobile ? 'touchend' : 'mouseup'

const useDoubleClick = (
    el: Ref<HTMLElement | undefined>,
    clickFn: (e: Event) => void,
    dblClickFn: (e: Event) => void
) => {
    let startTime = 0
    let endTime = 0
    let sx = 0, sy = 0
    let ex = 0, ey = 0
    let isTap = false
    let count = 1
    let timeout: any = null
    function startFn(e: any) {
        startTime = +new Date()
        if (startEvent === 'touchstart') {
            sx = (e as TouchEvent).touches[0].pageX
            sy = (e as TouchEvent).touches[0].pageY
        } else {
            sx = (e as MouseEvent).pageX
            sy = (e as MouseEvent).pageY
        }
    }
    function endFn(e: any) {
        if (startEvent === 'touchstart') {
            ex = (e as TouchEvent).changedTouches[0].pageX
            ey = (e as TouchEvent).changedTouches[0].pageY
        } else {
            ex = (e as MouseEvent).pageX
            ey = (e as MouseEvent).pageY
        }
        // 轻微滑动
        if (Math.abs(ex - sx) < 6 && Math.abs(ey - sy) < 6) {
            isTap = true
        } else {
            isTap = false
        }
        endTime = +new Date()
        if (endTime - startTime < 150 && isTap) { // tap
            if (count === 1) {
                timeout = setTimeout(() => { // 单击事件
                    clickFn(e)
                    timeout = null
                    count = 1
                }, 250)
                count++
            } else if (count === 2) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                count = 1
                dblClickFn(e)
            }
        } else {
            count = 1
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
        }
    }
    onMounted(() => {
        el.value && on(el.value, startEvent, startFn)
        el.value && on(el.value, endEvent, endFn)
    })
    onBeforeUnmount(() => {
        el.value && off(el.value, startEvent, startFn)
        el.value && off(el.value, endEvent, endFn)
    })
}

export default useDoubleClick
