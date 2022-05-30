import { App } from 'vue'
import ZMobileVideo from './z-mobile-video/index.vue'

const install = (app: App) => {
    app.component(ZMobileVideo.name, ZMobileVideo)
}
export { ZMobileVideo }
export default { install }
