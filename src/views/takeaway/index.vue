<script setup lang="ts">
import Header from '@/components/common-header-3/index.vue'
import FoodCategory from './components/food-category/index.vue'
import NearbyBusiness from './components/nearby-business/index.vue'
import { Search } from '@element-plus/icons-vue'
import { getdetailPosi } from '@/apis/city.ts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { usePosition } from '@/store/position.ts'
import { useUserStore } from '@/store/user.ts'
import { User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const store = usePosition()
const userStore: any = useUserStore()

//#region 获取定位详情信息
const detailPosiInfo = ref<string>()
const PosiInfo = ref<any>({} as any)
const getDetailPosiApi = async () => {
    const geohash = String(route.params.geohash)
    const res = await getdetailPosi(geohash)
    detailPosiInfo.value = res.name
    PosiInfo.value = res
    store.$patch({
        longitude: res.longitude,
        latitude: res.latitude,
    })
}
//endregion
//跳到search页面
const gotoSearch = () => {
    router.push({ path: '/search' })
}
//跳转到user页面
const gotoUser = () => {
    router.push({ path: '/user' })
}
onMounted(() => {
    console.log(userStore.userInfo.user_id)
    getDetailPosiApi()
})
</script>

<template>
    <div class="header-v1">
        <Header :cityName="detailPosiInfo">
            <template v-slot:left>
                <el-icon @click="gotoSearch" size="25">
                    <Search></Search>
                </el-icon>
            </template>
            <template v-slot:right>
                <div
                    v-if="
                        userStore.userInfo.user_id == '' ||
                        userStore.userInfo.user_id == undefined
                    "
                >
                    <router-link to="/" class="login">登录</router-link>
                    <router-link to="/" class="register">注册</router-link>
                </div>
                <div v-else>
                    <el-icon size="30" @click="gotoUser"><User></User></el-icon>
                </div>
            </template>
        </Header>
    </div>
    <main>
        <div class="banner">
            <FoodCategory></FoodCategory>
        </div>

        <div class="home_nearby-business">
            <NearbyBusiness :PosiInfo="PosiInfo"></NearbyBusiness>
        </div>
        <div class="zhan"></div>
    </main>
</template>

<style scoped lang="scss">
.header {
    position: fixed;
    width: 98%;
    top: 0;
    left: 0;
    z-index: 999;
}
.header-v1 {
    height: 13vw;
}
.login {
    padding: 0 2vw;
    color: whitesmoke;
    border-right: 1px solid whitesmoke;
}
.register {
    padding: 0 2vw;
    color: whitesmoke;
}
.home_nearby-business {
    margin-top: 3vw;
}
.zhan {
    height: 20rpx;
}
</style>
