<script setup lang="ts">
import { House } from '@element-plus/icons-vue'
import ShopList from '@/components/shoplist/index.vue'
import { getShopRestaurant } from '@/apis/delivery-home.ts'
import { onMounted, onUnmounted } from 'vue'
import { SingleCity } from '@/apis/types/city.ts'
import { Shop } from '@/apis/types/dekivery-home.ts'
import listenBottom from '@/utils/listenBottomOut.ts'
import { ref } from 'vue'

const props = defineProps<{
    PosiInfo: SingleCity
}>()

const isShow = ref(false)
const ShoppingRestaurantInfo = ref<Shop>([] as Shop)
const params = ref({
    latitude: String(props.PosiInfo.latitude),
    longitude: String(props.PosiInfo.longitude),
    limit: 20,
    offset: 0,
})
const getShoppingRestaurantApi = async () => {
    const res = await getShopRestaurant(params.value)
    if (res.length === 0) {
        isShow.value = true
        return
    }
    params.value.offset += 20
    //进行合并
    ShoppingRestaurantInfo.value = [...ShoppingRestaurantInfo.value, ...res]
}
//触底触发函数
// If(滚动高度 + 可视区域  >= 页面高度){ do something函数}
// 滚动高度（document.documentElement.scrollTop）
// 可视区域/屏幕高度（document.documentElement.clientHeight）
// 页面高度（document.documentElement.scrollHeight）
const Bottom = listenBottom(isShow, getShoppingRestaurantApi)
onMounted(() => {
    getShoppingRestaurantApi()
    window.addEventListener('scroll', Bottom)
})
onUnmounted(() => {
    window.removeEventListener('scroll', Bottom, false)
})
</script>

<template>
    <div class="nearby_business">
        <div class="title">
            <el-icon size="4vw"><House /></el-icon>
            <span>附近商家</span>
        </div>
        <div class="businesses">
            <div v-for="item in ShoppingRestaurantInfo" :key="item.id">
                <ShopList :shopListInfo="item"></ShopList>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nearby_business {
    padding: 3vw 2vw;
    border-top: 1px solid rgba(115, 115, 115, 0.3);
    border-bottom: 1px solid rgba(115, 115, 115, 0.3);
    background-color: white;
    .title {
        display: flex;
        align-items: flex-end;
        color: #666666;
        font-size: 3vw;
    }
    .businesses {
        margin-top: 3vw;
    }
}
</style>
