import { createApp } from 'vue'
import pinia from '@/store'
import router from '@/router/index.ts'
import App from './App.vue'
import './assets/styles/common.css'
import piniaPersist from 'pinia-plugin-persist'
//全局样式
import 'normalize.css'

const app = createApp(App)
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.mount('#app')
