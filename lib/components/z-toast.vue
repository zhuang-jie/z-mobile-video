<template>
    <teleport :to="teleport">
        <transition name="z-fade">
            <div v-show="show" class="z-toast" :class="[`z-toast--${position}`]" :style="{zIndex: zIndex}">
                <div class="z-toast__inner">{{ message }}</div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts">
export default {
    name: 'ZToast'
}
</script>
<script setup lang="ts">
import type { TeleportProps } from 'vue'
interface Props {
    show: boolean;
    message?: string;
    position?: 'bottom' | 'middle';
    zIndex?: number;
    duration?: number;
    teleport?: TeleportProps['to'];
    onClose?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
    show: false,
    message: '',
    position: 'middle',
    zIndex: 2000,
    duration: 2000,
    teleport: 'body',
    onClose: () => {}
})
const emit = defineEmits(['update:show'])

const updateShow = (show: boolean) => emit('update:show', show)

let timer: any = null
const clearTimer = () => clearTimeout(timer)
watch(
    () => [props.show, props.message, props.duration],
    () => {
        clearTimer()
        if (props.show && props.duration > 0) {
            timer = setTimeout(() => {
                updateShow(false)
                props.onClose()
            }, props.duration)
        }
    }
)
</script>
