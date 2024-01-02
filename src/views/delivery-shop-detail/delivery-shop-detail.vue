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
import { onMounted, provide, ref } from 'vue'
import {
    FoodMenu,
    RateInfoType,
    ShopDetailInfo,
} from '@/apis/types/dekivery-home.ts'
import listenBottom from '@/utils/listenBottomOut.ts'

const route = useRoute()
//#region获取商铺详情信息
const shopInfo = ref<ShopDetailInfo>()
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
    assessInfoParam.value.offset += 20
    AssessInfo.value = [...AssessInfo.value, ...res]
}
//endregion
onMounted(() => {
    getShopDetailInfoApi()
    getFoodMenuApi()
    getAssessInfoApi()
})
</script>

<template>
    <div class="shop-detail">
        <header>
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
        <main v-show="activeIndex == 1">
            <Food :foodMenu="foodMenu"></Food>
        </main>
        <main
            v-show="activeIndex == 2"
            class="assess_main"
            @scroll="Bottom"
            ref="main_assess"
        >
            <Assessment
                ref="assessment"
                :handleAssess="handleAssess"
            ></Assessment>
        </main>
        <footer v-show="activeIndex == 1">
            <Cart
                :restaruant_id="route.params.shop_id"
                :shopInfo="shopInfo"
            ></Cart>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.shop_detail {
    height: 100%;
    overflow: hidden;
}
.header {
    position: sticky;
}
header {
    display: block;
    height: 25vw;
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
