import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport ({
            imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
            eslintrc: {
                enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
                filepath: './.eslintrc-auto-import.json', // 生成json文件
                globalsPropValue: true,
            },
            dts: 'src/auto-import.d.ts' // 生成 `auto-import.d.ts` 全局声明
        })
    ],
    resolve: {
        alias: {
            // 配置别名
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        hmr: { overlay: false },
        port: 3000,
        open: true,
        host: '0.0.0.0'
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: 'ZMobileVideo',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
