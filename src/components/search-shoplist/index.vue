<script setup lang="ts">
import { SingleRestaurant } from '@/apis/types/search.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    ShopListItem: SingleRestaurant
}>()
const gotoShop = () => {
    router.push({ path: '/deliveryShopDetail/' + props.ShopListItem.id })
}
</script>

<template>
    <div class="shop_list" @click="gotoShop">
        <div class="left">
            <img
                :src="
                    'https://elm.cangdu.org/img/' +
                    props.ShopListItem.image_path
                "
                alt=""
            />
        </div>
        <div class="right">
            <div class="top">{{ props.ShopListItem.name }}</div>
            <div class="middle">
                月售{{ props.ShopListItem.recent_order_num }}单
            </div>
            <div class="bottom">
                {{ props.ShopListItem.float_minimum_order_amount }}元起送 /
                距离{{ props.ShopListItem.distance }}公里
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.shop_list {
    display: flex;
}
.left {
    margin-right: 3vw;
    width: 10vw;
    height: 10vw;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
}
.right {
    margin-right: 3vw;
    flex: 1;
    padding-bottom: 2vw;
    border-bottom: 1px solid rgba(115, 115, 115, 0.2);
    .top {
    }
    .middle {
        margin-top: 2vw;
    }
    .bottom {
        margin-top: 2vw;
    }
}
</style>
