<script setup lang="ts">
import { Eleme } from '@element-plus/icons-vue'
import { Compass } from '@element-plus/icons-vue'
import { Tickets } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const footer_name = ref(route.name)

//监测路由的变化来进行改变颜色的变化
watch(
    () => route.name,
    () => (footer_name.value = route.name as string),
)
const gotoHome = () => {
    router.push({ path: '/takeaway/36.665291,116.994926' })
}
const gotoSearch = () => {
    router.push({ path: '/search' })
}
const gotoOrderList = () => {
    router.push({ path: '/orderlist' })
}
const gotoUser = () => {
    router.push({ path: '/user' })
}
</script>

<template>
    <footer>
        <div @click="gotoHome">
            <el-icon
                size="5.6vw"
                :class="{ active_name: footer_name === 'takeaway' }"
                ><Eleme
            /></el-icon>
            <span>外卖</span>
        </div>
        <div @click="gotoSearch">
            <el-icon
                size="5vw"
                :class="{ active_name: footer_name === 'search' }"
                ><Compass
            /></el-icon>
            <span>搜索</span>
        </div>
        <div @click="gotoOrderList">
            <el-icon
                size="5vw"
                :class="{ active_name: footer_name === 'orderlist' }"
                ><Tickets
            /></el-icon>
            <span>订单</span>
        </div>
        <div @click="gotoUser">
            <el-icon size="5vw" :class="{ active_name: footer_name === 'user' }"
                ><User
            /></el-icon>
            <span>我的</span>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    div {
        padding: 1vw 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
            font-size: 1vw;
            text-align: center;
        }
    }
}
.active_name {
    color: $themeColor;
}
</style>
