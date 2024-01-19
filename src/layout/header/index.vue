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
        <div class="left">Merikle外卖</div>
        <!--        未登录状态-->
        <div
            class="right"
            v-if="
                store.userInfo.user_id === '' ||
                store.userInfo.user_id == undefined
            "
        >
            <span @click="router.push('/login')">登录</span>
            <span @click="router.push('/login')">注册</span>
        </div>
        <!--        登录状态-->
        <div v-else>
            <el-icon size="30" @click="gotoUser"><User /></el-icon>
        </div>
    </header>
</template>

<style scoped lang="scss">
.top {
    padding: 10vw 2vw 3vw 2vw;
    display: flex;
    justify-content: space-between;
    background-color: $themeColor;
    color: white;
    font-size: 5vw;
}
span {
    display: inline-block;
    padding: 0 10px;
    &:first-child {
        border-right: 1px solid white;
    }
    color: white;
}
</style>
