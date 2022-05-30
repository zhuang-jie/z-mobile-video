<!--
 * @Author: zhuang-jie
 * @Date: 2022-05-30 20:00:00
 * @email: 1450482096@qq.com
-->

[![Version](https://img.shields.io/npm/dt/z-mobile-video.svg?style=flat-square)](https://www.npmjs.com/package/z-mobile-video)
[![Downloads](https://img.shields.io/npm/v/z-mobile-video.svg?style=flat-square)](https://www.npmjs.com/package/z-mobile-video)
[![GitHub stars](https://img.shields.io/github/stars/zhuang-jie/z-mobile-video.svg?style=flat-square)](https://github.com/zhuang-jie/z-mobile-video/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/zhuang-jie/z-mobile-video.svg?style=flat-square)](https://github.com/zhuang-jie/z-mobile-video/issues)
[![GitHub forks](https://img.shields.io/github/forks/zhuang-jie/z-mobile-video.svg?style=flat-square)](https://github.com/zhuang-jie/z-mobile-video/network)

[![NPM](https://nodei.co/npm/z-mobile-video.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/z-mobile-video)

### Vue3 z-mobile-video

适用于 Vue3 的移动端全屏播放组件，PS：仅支持微信浏览器

## 功能一览

1. 支持倍速播放设置
2. 支持从固定时间开始播放
3. 支持双击事件
4. 可自定义播放按钮
5. 可自定义error按钮
6. 暂不支持长按功能，后续版本会加上
7. 暂不支持缩放功能，后续版本会加上

# 使用指南

## 安装

npm 安装：

```bash
npm i z-mobile-video --save
```

## 引入

#### 全局使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import ZMobileVideo from 'z-mobile-video' // 引入组件
import 'z-mobile-video/dist/style.css' // 引入css

const app = createApp(App)
app.use(ZMobileVideo)

app.mount('#app')
```

#### 组件内使用

```js
import 'z-mobile-video/dist/style.css'
import { ZMobileVideo } from 'z-mobile-video'
export default {
  components: {
    ZMobileVideo,
  },
}
```

## 代码演示
```vue
<template>
  <div>
    <z-mobile-video v-bind="options"></z-mobile-video>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const options = reactive({
  width: '100vw',    // 播放器宽度，默认100vw
  height: '100vh',   // 播放器高度，默认100vh
  src: 'xxx.mp4',    // 视频地址
  poster: 'xxx.png', // 视频海报
  type: 'video/mp4', // 视频类型
  muted: false,      // 视频静音
  autoplay: false,   // 自动播放
  loop: true,        // 循环播放
  volume: 1,         // 音量大小 0-1
  preload: 'auto',   // 预加载
  objectFit: 'contain', // 同css object-fit，作用于video标签
  currentTime: 0,    // 当前播放时间
  showCurrentTime: false, // 是否在拖动进度条时toast当前时间文字
  errorText: '',    // 视频error时，toast提示
})
</script>

<style scoped></style>
```

#### autoplay
移动端禁止video自动播放，除非用户主动发生了页面交互动作，比如click，touchstart等事件

#### slots
```vue
<template>
  <div>
    <z-mobile-video v-bind="options">
      <template #play-btn>播放按钮</template>
      <template #error>视频请求失败</template>
      <template #footer>进度条下方显示</template>
    </z-mobile-video>
  </div>
</template>
```

#### 事件示例
`z-mobile-video` 支持原生`video`所有事件
```vue
<template>
  <div>
    <z-mobile-video
      v-bind="options"
      @play="onPlay"
      @pause="onPause"
      @canplay="onCanplay"
      @timeupdate="onTimeupdate"
      @click="onClick"
      @dblclick="onDblclick"
      ...
    ></z-mobile-video>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const options = reactive({
  src: 'xxx.mp4',
  poster: 'xxx.png',
})
const onPlay = (e) => {
  console.log(e, '播放')
}
const onPause = (e) => {
  console.log(e, '暂停')
}
const onCanplay = (e) => {
  console.log(e, '可以播放')
}
const onTimeupdate = (e) => {
  console.log(e, '时间更新')
}
const onClick = () => {
  console.log('click!!!')
}
const onDblclick = () => {
  console.log('双击!!!')
}
...
</script>
```

#### Ref
通过 `ref` 可以获取到 `z-mobild-video` 实例并调用实例方法。
```vue
<template>
  <div>
    <z-mobile-video ref="zVideo" v-bind="options"></z-mobile-video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const zVideo = ref()

onMounted(() => {
	console.log(zVideo.value.$video) // video dom
	// zVideo.value.play() // 播放事件
	// zVideo.value.pause() // 暂停事件
	// zVideo.value.togglePlay() // 播放|暂停切换
	// zVideo.value.playbackRate(2) // 设置播放速率
})
</script>
```

## API

#### props

| 参数             | 说明                                                     | 类型       | 默认值       |
| --------------   | ------------------------------------------------------- | --------- | ------------ |
| width            | 播放器宽度                                               | string     | `100vw`      |
| height           | 播放器高度                                               | string     | `100vh`      |
| src              | 视频地址                                                 | string     | -            |
| poster           | 视频海报                                                 | string     | -            |
| type             | 视频类型                                                 | string     | `video/mp4`  |
| muted            | 静音                                                     | boolean    | `false`      |
| autoplay         | 自动播放                                                 | boolean    | `false`      |
| loop             | 循环播放                                                 | boolean    | `true`       |
| volume           | 音量大小 `0-1`                                           | number     | `1`          |
| preload          | 预加载                                                   | string     | `auto`       |
| objectFit        | video css object-fit                                    | string     | `contain`    |
| currentTime      | 当前播放时间                                             | number     | `0`          |
| showCurrentTime  | 滑动进度条时是否显示时长                                  | boolean    | `false`      |
| errorText        | 视频error时，toast提示文字                               | string     | -            |

#### Events

| 事件名           | 说明                                                     | 回调参数   |
| --------------- | -------------------------------------------------------- | --------- |
| loadstart       | 视频查找,当加载过程开始时                                  | `Event`   |
| play            | 播放监听                                                  | `Event`   |
| pause           | 暂停监听                                                  | `Event`   |
| canplay         | 可播放监听                                                | `Event`   |
| playing         | 当视频在已因缓冲而暂停或停止后已就绪时触发                   | `Event`   |
| seeking         | 查找开始。当用户开始移动/跳跃到视频中新的位置时触发           | `Event`   |
| seeked          | 查找结束。当用户已经移动/跳跃到视频中新的位置时触发           | `Event`   |
| waiting         | 视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发       | `Event`   |
| progress        | 浏览器下载监听                                             | `Event`   |
| durationchange  | 时长变化。当指定的视频的时长数据发生变化时触发                | `Event`   |
| timeupdate      | 播放位置更改时，播放时间更新                                | `Event`   |
| ended           | 播放结束                                                  | `Event`   |
| error           | 播放错误                                                  | `Event`   |
| stalled         | 当浏览器尝试获取媒体数据，但数据不可用时                     | `Event`   |
| click           | 单击事件                                                  | -         |
| dblclick        | 双击事件                                                  | -         |

#### Slots
| 名称         | 说明                                                        |
| ------------ | ----------------------------------------------------------- |
| play-btn     | 播放状态插槽                                                 |
| error        | 失败状态插槽                                                 |
| footer       | 底部插槽                                                     |

#### 方法

| 方法名         | 说明                                                        | 参数   | 返回值  |
| ------------- | ----------------------------------------------------------- | ------ | ------ |
| play          | 播放事件                                                     | -      | -      |
| pause         | 暂停事件                                                     | -      | -      |
| togglePlay    | 播放暂停切换                                                 | -      | -      |
| playbackRate  | 视频播放速率切换                                             | number | -      |

# 点个 start

[z-mobile-video](https://github.com/zhuang-jie/z-mobile-video)
