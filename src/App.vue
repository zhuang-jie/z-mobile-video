<template>
    <div>
        <z-mobile-video v-bind="options" @dblclick="dblClickHandle"></z-mobile-video>
    </div>
</template>

<script setup lang="ts">
import ZMobileVideo from '../lib/z-mobile-video/index.vue'

const options = reactive({
    // src: 'http://wx-zkw-private.oss-cn-shenzhen.aliyuncs.com/test_company_service%2Fupload%2F2022%2F05%2F25%2F1920j1o74j6upv8r2vi8dntt38po.mp4?OSSAccessKeyId=LTAI4Fn1mtmTnmabBDVH3h3n&Signature=m9z%2FxtuU%2Fq%2F3UTCjn5hWkME22JQ%3D&Expires=1653553551',
    src: 'http://wx-zkw-private.oss-cn-shenzhen.aliyuncs.com/test_company_service%2Fupload%2F2022%2F05%2F25%2F1920j1o74j6upv8r2vi8dntt38po.mp4?OSSAccessKeyId=LTAI4Fn1mtmTnmabBDVH3h3n&Signature=5ZVp2FD3v80q66PfC29puQX8HKE%3D&Expires=1655998866',
    poster: 'https://wx-zkw-public.oss-cn-shenzhen.aliyuncs.com/upload/2022/05/25/1ed72a40107af225b2aa4ecedefb2960.jpg',
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
