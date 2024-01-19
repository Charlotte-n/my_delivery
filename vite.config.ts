import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import PostcssPresetEnv from 'postcss-preset-env'
//element-ui自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import pxtovw from 'postcss-px-to-viewport'
//响应式布局
const my_pxtovw = pxtovw({
    unitToConvert: 'px', //需要转换的单位，默认为"px"
    viewportWidth: 1440,
    unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    propList: ['*'], // 能转化为vw的属性列表
    viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    fontViewportUnit: 'vw', //字体使用的视口单位
    selectorBlackList: ['.ignore-', '.hairlines', 'wrap', '.no_change_px'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: true, // 允许在媒体查询中转换`px`
    replace: true, //是否直接更换属性值，而不添加备用属性
    exclude: [/node_modules/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
    // landscapeUnit: 'vw', //横屏时使用的单位
    // landscapeWidth: 1334, //横屏时使用的视口宽度
})

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        postcss: {
            plugins: [PostcssPresetEnv, my_pxtovw],
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/theme.scss" as *;`,
            },
        },
    },
    //生产环境移除log和debugger
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
