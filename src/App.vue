<template>
    <div>
        <z-mobile-video v-bind="options" @dblclick="dblClickHandle"></z-mobile-video>
    </div>
</template>

<script setup lang="ts">
import ZMobileVideo from '../lib/z-mobile-video/index.vue'

const options = reactive({
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'https://wx-zkw-public.oss-cn-shenzhen.aliyuncs.com/upload/2022/05/25/1ed72a40107af225b2aa4ecedefb2960.jpg',
    type: 'm3u8',
    volume: 1,
    muted: false,
    objectFit: 'contain',
    showCurrentTime: true,
    // errorText: '请求错误',
})
const dblClickHandle = () => {
    console.log('双击')
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
</style>
