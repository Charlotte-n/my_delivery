<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import Footer from '@/layout/footer/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import Filter from './components/filter/index.vue'
import ShopListCommon from '@/components/shoplist/index.vue'
import { getShopRestaurant } from '@/apis/delivery-home.ts'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { usePosition } from '@/store/position.ts'
import { SingleCity } from '@/apis/types/city.ts'
import { useRoute } from 'vue-router'
import listenBottom from '@/utils/listenBottomOut.ts'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const store = usePosition()
const route = useRoute()

const shopList = ref<SingleCity[] | any>([])
const title = route.params.title
//获取数据
const childValue = ref<{
    restaurant_category_ids?: number[]
    order_by?: number
    support_ids?: number[]
}>({
    restaurant_category_ids: [],
    order_by: 4,
    support_ids: [],
})
const params = ref({
    limit: 20,
    offset: 0,
    longitude: String(store.$state.longitude),
    latitude: String(store.$state.latitude),
    restaurant_category_id: route.params.id,
})
//loading
const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const getShopListApi = async () => {
    try {
        let res = await getShopRestaurant({
            ...params.value,
            ...childValue.value,
        })
        loading.value = false
        if (res!.length === 0) {
            isShow.value = true
            return
        }
        params.value.offset += 20
        //进行合并
        shopList.value = [...shopList.value, ...res]
    } catch (error) {
        console.log(error)
    }
}

const isShow = ref(false)
//触底加载
const Bottom = listenBottom(isShow, getShopListApi)
//回退
const back = () => {
    history.go(-1)
}
//获取子组件的信息
const getValues = (id: any, sort_id: number, supports_ids: number[]) => {
    childValue.value.restaurant_category_ids = [id]
    if (sort_id) {
        childValue.value.order_by = sort_id
    }
    if (supports_ids.length !== 0) {
        childValue.value.support_ids = supports_ids
    }
}
//显示加载组件
const load = ref(false)
watch(
    () => (
        childValue.value.restaurant_category_ids,
        childValue.value.order_by,
        childValue.value.support_ids
    ),
    async () => {
        load.value = true
        shopList.value = []
        const res = await getShopListApi()
        console.log(res)
        load.value = false
    },
    {
        deep: true,
    },
)
const watchRetrun = () => {
    console.log('监听到了 ')
}
onMounted(async () => {
    await getShopListApi()
    window.addEventListener('scroll', Bottom)
    backPhone(watchRetrun)
})
onUnmounted(() => {
    window.removeEventListener('scroll', Bottom)
    cancelBack(watchRetrun)
})
</script>

<template>
    <div class="more_restaurants">
        <header>
            <div class="header">
                <Header>
                    <template #first>
                        <el-icon size="20" @click="back"
                            ><ArrowLeftBold
                        /></el-icon>
                    </template>
                    <template #second>
                        <div>{{ title }}</div>
                    </template>
                </Header>
            </div>
        </header>
        <div class="filter-wrapper">
            <!--    筛选-->
            <div class="filter">
                <Filter @getValues="getValues"></Filter>
            </div>
        </div>

        <!--    商品列表-->
        <div style="margin-top: 10vw">
            <div
                v-if="loading || load"
                style="height: 80vh"
                v-loading="loading || load"
                element-loading-text="Loading..."
                :element-loading-spinner="svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
            ></div>
            <div v-for="item in shopList" :key="item.id">
                <ShopListCommon :shopListInfo="item"></ShopListCommon>
            </div>
        </div>

        <div style="height: 10vw"></div>
        <Footer></Footer>
    </div>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    top: 0;
    z-index: 99;
}
header {
    height: 13vw;
}
.filter-wrapper {
    height: 13vw;
}
//.header {
//    position: fixed;
//    width: 100%;
//    z-index: 999;
//}
.filter {
    position: fixed;
    width: 100%;
    top: 20vw;
    z-index: 9999;
}
</style>
