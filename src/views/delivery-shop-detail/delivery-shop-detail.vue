<script setup lang="ts">
import Header from './header/index.vue'
import Food from './food/index.vue'
import Cart from './cart/index.vue'
import Assessment from './assessment/index.vue'
import {
    AssessInfoParam,
    getAssessInfo,
    getFoodCate,
    getShopDetailInfo,
} from '@/apis/delivery-home.ts'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, provide, ref } from 'vue'
import {
    FoodMenu,
    RateInfoType,
    ShopDetailInfo,
} from '@/apis/types/dekivery-home.ts'
import listenBottom from '@/utils/listenBottomOut.ts'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'

const route = useRoute()
//#region获取商铺详情信息
const shopInfo = ref<ShopDetailInfo>({} as ShopDetailInfo)
const getShopDetailInfoApi = async () => {
    shopInfo.value = await getShopDetailInfo(route.params.shop_id as string)
}
//endregion

//#region获取食物
const foodMenu = ref<FoodMenu>([] as FoodMenu)
const getFoodMenuApi = async () => {
    foodMenu.value = await getFoodCate(route.params.shop_id as string)
}
//endregion

//#region 切换tab
const activeIndex = ref(1)
let Bottom: any = null
const changeTab = (index: number) => {
    activeIndex.value = index
    if (activeIndex.value == 2) {
        let assess_main = document.querySelector('.assess_main')
        Bottom = listenBottom(isShow, getAssessInfoApi, assess_main)
    }
}
//endregion

//处理触底下滑
//#region获取评价信息
const AssessInfo = ref<RateInfoType>([] as RateInfoType)
//触底加载
const isShow = ref(false)
const assessInfoParam = ref<AssessInfoParam>({
    tag_name: '',
    offset: 0,
    limit: 20,
})
const handleAssess = (name: string) => {
    assessInfoParam.value.offset = 0
    assessInfoParam.value.tag_name = name
    getAssessInfoApi()
}
provide('AssessInfo', AssessInfo)

const getAssessInfoApi = async () => {
    const res = await getAssessInfo(
        route.params.shop_id as string,
        assessInfoParam.value,
    )
    if (res.length === 0) {
        isShow.value = true
        return true
    }
    assessInfoParam.value.offset! += 20
    AssessInfo.value = [...AssessInfo.value, ...res]
}
const loading = ref(false)
const watchReturn = () => {
    console.log('监听到了')
}
//endregion
onMounted(async () => {
    loading.value = true
    await getShopDetailInfoApi()
    await getFoodMenuApi()
    await getAssessInfoApi()
    loading.value = false
    backPhone(watchReturn)
})
onUnmounted(() => {
    cancelBack(watchReturn)
})
</script>

<template>
    <div class="shop-detail">
        <header class="header-1">
            <Header :shopInfo="shopInfo"></Header>
        </header>
        <div class="menu">
            <el-menu
                default-active="1"
                class="el-menu-demo"
                mode="horizontal"
                @select="changeTab"
            >
                <el-menu-item index="1" class="good">商品</el-menu-item>
                <el-menu-item index="2" class="ping">评价</el-menu-item>
            </el-menu>
        </div>
        <div style="height: 90vh" v-loading="loading" v-if="loading"></div>
        <main v-show="activeIndex == 1">
            <div
                style="height: 70vh"
                v-if="activeIndex == 1 && Object.keys(foodMenu).length === 0"
                v-loading="
                    activeIndex == 1 && Object.keys(foodMenu).length === 0
                "
            ></div>
            <Food :foodMenu="foodMenu"></Food>
        </main>
        <main
            v-show="activeIndex == 2"
            class="assess_main"
            @scroll="Bottom"
            ref="main_assess"
        >
            <div
                style="height: 70vh"
                v-if="activeIndex == 2 && Object.keys(AssessInfo).length === 0"
                v-loading="
                    activeIndex == 2 && Object.keys(AssessInfo).length === 0
                "
            ></div>
            <Assessment
                ref="assessment"
                :handleAssess="handleAssess"
            ></Assessment>
        </main>
        <footer v-show="activeIndex == 1">
            <Cart
                :restaruant_id="route.params.shop_id as string"
                :shopInfo="shopInfo"
            ></Cart>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.header-1 {
    position: sticky;
    top: 0;
    z-index: 99;
}
header {
    display: block;
    height: 35vw;
}
.menu {
    height: 11vw;
    ul {
        height: 11vw;
    }
}
.el-menu-demo {
    position: sticky;
    justify-content: center;
    width: 100vw;
    .good {
        margin-right: 20vw;
        font-size: 4vw;
    }
    .ping {
        font-size: 4vw;
    }
}
main {
    height: 77.4vh;
    overflow: hidden;
}
.assess_main {
    overflow: auto;
}
footer {
    position: fixed;
    bottom: 0;
}
</style>
