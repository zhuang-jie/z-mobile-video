export const videoEmits = [
    'loadstart',        // 视频查找,当加载过程开始时
    'play',             // 播放监听
    'pause',            // 暂停监听
    'canplay',          // 可播放监听
    'playing',          // 当视频在已因缓冲而暂停或停止后已就绪时触发
    'seeking',          // 查找开始。当用户开始移动/跳跃到视频中新的位置时触发
    'seeked',           // 查找结束。当用户已经移动/跳跃到视频中新的位置时触发
    'waiting',          // 视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
    'progress',         // 浏览器下载监听
    'durationchange',   // 时长变化。当指定的视频的时长数据发生变化时触发
    'timeupdate',       // 播放位置更改时，播放时间更新
    'ended',            // 播放结束
    'error',            // 播放错误
    'stalled',          // 当浏览器尝试获取媒体数据，但数据不可用时
]

export const videoProps = {
    width: { type: String, default: '100vw' },
    height: { type: String, default: '100vh' },
    src: { required: true, type: String, default: '' }, // 视频地址
    poster: { type: String, default: '' },              // 海报
    type: { type: String, default: 'video/mp4' },       // 视频类型
    currentTime: { type: Number, default: 0 },          // 当前播放时间
    muted: { type: Boolean, default: false },           // 静音
    autoplay: { type: Boolean, default: false },        // 自动播放
    loop: { type: Boolean, default: true },             // 循环播放
    volume: { type: Number, default: 1 },               // 默认音量大小
    preload: { type: String, default: 'auto' },         // 预加载
    objectFit: { type: String, default: '' },           // 视频剪切
    showCurrentTime: { type: Boolean, default: false }, // 滑动进度条时是否显示时长
    errorText: { type: String, default: '' },           // 视频error时，显示的toast
}