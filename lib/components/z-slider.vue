<template>
    <div
        ref="zSlider"
        class="z-slider"
        :class="{
            'z-slider--hover': state.dragging,
            'z-slider--disabled': disabled,
        }"
        @touchstart.stop="startHandle"
        @touchmove.stop.prevent="onDragging"
        @touchend.stop="onDragEnd"
    >
        <div class="z-slider__runway">
            <div class="z-slider__bar" :style="sliderBarStyle"></div>
            <div class="z-slider__btn" :style="sliderBtnStyle"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ZSlider'
}
</script>
<script setup lang="ts">
import { getRect } from '../utils/util'
interface Props {
	modelValue: number;
    // vertical?: boolean;
    disabled?: boolean
}
interface Emit {
	(e: 'update:modelValue', val: number): void;
    (e: 'change', val: number): void;
    (e: 'dragstrat'): void;
    (e: 'dragend'): void;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    // vertical: false,
    disabled: false
})
const emit = defineEmits<Emit>()

const sliderBarStyle = computed(() => {
    let value = state.dragging ? state.value : props.modelValue
    value = value < 0 ? 0 : value > 1 ? 1 : value
    // return props.vertical ? `height:${value * 100}%` : `width:${value * 100}%`
    return `width:${value * 100}%`
})
const sliderBtnStyle = computed(() => {
    let value = state.dragging ? state.value : props.modelValue
    value = value < 0 ? 0 : value > 1 ? 1 : value
    // return props.vertical ? `bottom:${value * 100}%` : `left:${value * 100}%`
    return `left:${value * 100}%`
})

const zSlider = ref<HTMLDivElement>()

const state = reactive({
    value: props.modelValue,
    dragging: false
})
const startHandle = (e: TouchEvent) => {
    if (props.disabled) return
    state.dragging = true
    setPosition(e)
    emit('dragstrat')
}
// 拖拽中
const onDragging = (e: TouchEvent) => {
    if (state.dragging) {
        setPosition(e)
    }
}
// 拖拽结束
const onDragEnd = (e: TouchEvent) => {
    if (state.dragging) {
        state.dragging = false
        emit('dragend')
    }
}
// 设置当前按下位置
const setPosition = (e: TouchEvent) => {
    const value = getPosition(e)
    state.value = value
    emit('update:modelValue', value)
    emit('change', value)
}
// 获取当前按下位置
const getPosition = (e: TouchEvent) => {
    const ract = getRect(zSlider.value as HTMLElement)
    const touch = e.changedTouches[0]
    const value = (touch.clientX - ract.left) / ract.width
    // if (props.vertical) { // 垂直
    //     value = (ract.bottom - touch.clientY) / ract.height
    // }
    return value < 0 ? 0 : value > 1 ? 1 : value
}
</script>
