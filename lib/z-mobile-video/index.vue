<template>
    <div class="z-player-wrap">
        <div class="z-player-video">
            <video
                ref="$video"
                class="z-player-video__inner"
                webkit-playsinline
                playsinline
                x5-video-player-type="h5"
                x5-video-player-fullscreen="false"
                x5-video-orientation="portraint"
                :src="src"
                :type="type"
                :poster="poster"
                :volume="volume"
                :muted="muted"
                :loop="loop"
                :preload="preload"
                :style="`object-fit: ${objectFit}`"
                v-on="videoEvents"
            >您的浏览器不支持Video标签。</video>
        </div>
        <div class="z-player-content">
            <div ref="$inner" class="z-player-state">
                <slot v-if="isError" name="error">
                    <div class="z-play-btn z-play-btn--error"></div>
                </slot>
                <slot
                    v-else-if="state.playBtnState === 'play' || state.playBtnState === 'replay'"
                    name="play-btn"
                >
                    <div class="z-play-btn"></div>
                </slot>
            </div>
            <div class="z-player-control">
                <div class="z-player-progress">
                    <z-loading v-show="!state.isDragging ? state.waiting : false" />
                    <z-slider
                        v-model="state.playProgress"
                        :disabled="state.loadStateType === 'error'"
                        @change="progressBarChange"
                        @dragstrat="state.isDragging = true"
                        @dragend="state.isDragging = false"
                    />
                </div>
                <slot v-if="!!$slots['footer']" name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ZMobileVideo',
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import ZSlider from '../components/z-slider.vue'
import ZLoading from '../components/z-loading.vue'
import { Toast } from '../components/toast'
import { compose, timeFormat } from '../utils/util'
import { videoEmits, videoProps } from './tokens'
import useDoubleClick from '../hooks/useDoubleClick'

const props = defineProps(videoProps)
const emit = defineEmits([
    ...videoEmits,
    'click',
    'dblclick',
])

const state = reactive({
    autoPlay: props.autoplay,
    playBtnState: props.autoplay ? 'pause' : 'play', // 播放按钮状态
    loadStateType: 'loadstart', // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
    playProgress: 0,
    currentTime: '00:00:00', // 当前播放时间
    totalTime: '00:00:00', // 总时长
    waiting: false, // 是否在缓冲
    isDragging: false,
})
const isError = computed(() => state.loadStateType === 'error' || state.loadStateType === 'stalled')
const $video = ref<HTMLVideoElement>()
const $inner = ref<HTMLDivElement>()

// 收集video事件
const videoEvents = videoEmits.reduce((events, name) => {
    events[name] = (e: Event) => {
        // console.log(name)
        state.loadStateType = name
        emit(name, e)
    }
    return events
}, {} as {[key: string]: (e: Event) => void})
// 可以播放
videoEvents['canplay'] = compose(videoEvents['canplay'], () => {
    //如果是自动播放 则开始播放
    if (state.playBtnState !== 'play' || state.autoPlay) {
        playHandle()
    }
})
// 播放结束
videoEvents['ended'] = compose(videoEvents['ended'], () => {
    state.playBtnState = 'replay' // 此时的控制按钮应该显示重新播放
})
// error
videoEvents['error'] = compose(videoEvents['error'], () => {
    state.playBtnState = 'replay' //此时的控制按钮应该显示重新播放
    props.errorText && Toast(props.errorText)
})
// 视频缓冲中
videoEvents['waiting'] = compose(videoEvents['waiting'], () => {
    state.waiting = true
})
// 当视频在已因缓冲而暂停或停止后已就绪时触发
videoEvents['playing'] = compose(videoEvents['playing'], () => {
    state.waiting = false
})
// 资源长度改变
videoEvents['durationchange'] = (e) => {
    emit('durationchange', e)
    if (props.currentTime !== 0) {
        if ($video.value) {
            $video.value.currentTime = props.currentTime
        }
    }
    //更新当前时长的所有状态
    videoEvents.timeupdate(e)
}
// 当前播放进度
videoEvents['timeupdate'] = (ev) => {
    emit('timeupdate', ev)
    const duration = (ev.target as HTMLVideoElement).duration || 0 // 媒体总长
    const currentTime = (ev.target as HTMLVideoElement).currentTime // 当前媒体播放长度
    state.playProgress = currentTime / duration //播放进度比例
    state.currentTime = timeFormat(currentTime)
    state.totalTime = timeFormat(duration)
}
//进度条事件
const progressBarChange = (val: number) => {
    if ($video.value) {
        const duration = $video.value.duration // 媒体总长
        $video.value.currentTime = duration * val
        if (props.showCurrentTime) {
            Toast({
                message: `${timeFormat(duration * val)}/${timeFormat(duration)}`,
                position: 'bottom',
                duration: 1000
            })
        }
        if (state.playBtnState === 'play') {
            playHandle()
        }
    }
}

// 绑定单击双击事件
useDoubleClick($inner, (e) => {
    // console.log('click')
    togglePlay()
    emit('click')
}, (e) => {
    // console.log('dblclick')
    emit('dblclick')
})
// 播放方法
let timer: any = null
const playHandle = () => {
    clearTimeout(timer)
    $video.value?.play().catch(() => {
        timer = setTimeout(() => {
            state.playBtnState = 'replay'
            // state.loadStateType = 'error'
        }, 500)
    })
    state.playBtnState = 'pause'
}
// 暂停
const pauseHandle = () => {
    $video.value?.pause()
    state.playBtnState = 'play'
}

// 播放or暂停
const togglePlay = () => {
    if (state.playBtnState === 'play' || state.playBtnState === 'replay') { // 播放
        playHandle()
    } else if (state.playBtnState === 'pause') { // 暂停
        pauseHandle()
    }
}

// 设置播放速度
const playbackRate = (val: number) => {
    $video.value && ($video.value.playbackRate = val)
}

defineExpose({
    $video,
    play: playHandle,
    pause: pauseHandle,
    togglePlay,
    playbackRate,
})
</script>

<style lang="scss">
@import "../style/index.scss";
.z-player-wrap {
    width: v-bind(width);
    height: v-bind(height);
}
</style>