/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
declare module '@/store'
declare module '@/router/index.ts'
declare module 'markdown'
declare module 'showdown'
declare module '@better-scroll/core'
declare module '@better-scroll/pull-down'
