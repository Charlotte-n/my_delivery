<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import OrderlistItem from '@/views/orderlist/components/orderlist-item.vue'
import { getOrderList } from '@/apis/order.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import { OrderList } from '@/apis/types/order.ts'
import ListenBottomOut from '@/utils/listenBottomOut.ts'
import { useRouter } from 'vue-router'
import { usePosition } from '@/store/position.ts'
const router = useRouter()
const store = usePosition()
//#region 获取订单列表
const isShow = ref(false)
const OrderList = ref<OrderList>([] as OrderList)
const params = ref({
    limit: 20,
    offset: 0,
})

const getOrderListApi = async () => {
    const res = await getOrderList(params.value)
    if (res.length === 0) {
        isShow.value = true
        return
    }
    params.value.offset += 20
    OrderList.value = [...OrderList.value, ...res]
}
//endregion
//#region 触底下滑
const listenBottom = ListenBottomOut(isShow, getOrderListApi)
//endregion
//回到前面
//#region加载组件
const loading = ref(false)
//endregion
const gotoHome = () => {
    router.push({ path: `/takeaway/${store.geohash}` })
}
onMounted(async () => {
    loading.value = true
    await getOrderListApi()
    loading.value = false
    window.addEventListener('scroll', listenBottom)
})
onUnmounted(() => {
    window.removeEventListener('scroll', listenBottom)
})
</script>

<template>
    <div class="orderlist_container">
        <header>
            <Header>
                <template #first>
                    <el-icon size="25" @click="gotoHome"
                        ><ArrowLeftBold></ArrowLeftBold
                    ></el-icon>
                </template>
                <template #second> 订单列表 </template>
            </Header>
        </header>
        <div class="orderlists">
            <div v-loading="loading" style="height: 100vh" v-if="loading"></div>
            <div
                class="orderlist-item"
                v-for="item in OrderList"
                :key="item.id"
            >
                <orderlist-item :orderInfo="item"></orderlist-item>
            </div>
        </div>
        <div style="height: 10vw"></div>
    </div>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
}
.orderlist-item {
    margin-top: 6vw;
    padding: 3vw 2vw;
    background-color: white;
}
.orderlists :first-child {
    margin-top: 0;
}
</style>
