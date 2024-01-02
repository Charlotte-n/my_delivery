<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import { useRouter } from 'vue-router'
const store: any = useUserStore()
const router = useRouter()

const gotoUser = () => {
    router.push({ path: '/user' })
}
</script>

<template>
    <header class="top">
        <div class="left">孟屿外卖</div>
        <!--        未登录状态-->
        <div
            class="right"
            v-if="
                store.userInfo.user_id === '' ||
                store.userInfo.user_id == undefined
            "
        >
            <a href="/login">登录</a>
            <a href="/register">注册</a>
        </div>
        <!--        登录状态-->
        <div v-else>
            <el-icon size="30" @click="gotoUser"><User /></el-icon>
        </div>
    </header>
</template>

<style scoped lang="scss">
.top {
    padding: 3vw 2vw;
    display: flex;
    justify-content: space-between;
    background-color: $themeColor;
    color: white;
    font-size: 5vw;
}
a {
    padding: 0 10px;
    &:first-child {
        border-right: 1px solid white;
    }
    color: white;
}
</style>
