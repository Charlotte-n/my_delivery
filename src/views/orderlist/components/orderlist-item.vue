<script setup lang="ts">
import { OrderListItem } from '@/apis/types/order.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    orderInfo: OrderListItem
}>()
const gotoOrderDetail = () => {
    router.push({ path: '/order/detail/' + props.orderInfo.id })
}
const handleBuyMore = () => {
    router.push({
        path: '/deliveryShopDetail/' + props.orderInfo.restaurant_id,
    })
}
</script>

<template>
    <div>
        <div class="desc" @click="gotoOrderDetail">
            <div class="img">
                <img
                    :src="formate_img(props.orderInfo.restaurant_image_url)"
                    alt=""
                />
            </div>
            <div class="order">
                <div class="shop_name">
                    <span>{{ props.orderInfo.restaurant_name }}</span>
                    <span class="arrow">&gt;</span>
                </div>
                <div class="time">
                    {{ props.orderInfo.formatted_created_at }}
                </div>
            </div>
            <div class="order-status">
                {{ props.orderInfo.status_bar.title }}
            </div>
        </div>
        <div class="middle-price">
            <div class="zhanwei"></div>
            <div class="order_name">价格</div>
            <div class="price">
                ￥{{ props.orderInfo.basket.packing_fee.price }}
            </div>
        </div>
        <div class="status">
            <button @click="handleBuyMore">再来一单</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.desc {
    display: flex;
    .img {
        margin-right: 3vw;
        width: 13vw;
        height: 13vw;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .order {
        flex: 1;
        .shop_name {
            font-size: 4vw;
            .arrow {
                color: #666666;
            }
        }
        .time {
            margin-top: 2vw;
            color: #666666;
            font-size: 3vw;
        }
    }
    .order-status {
        font-size: 3.7vw;
    }
}

.middle-price {
    margin-top: 2vw;
    display: flex;
    .zhanwei {
        margin-right: 3vw;
        width: 13vw;
        height: 13vw;
    }
    .order_name {
        flex: 1;
        font-size: 3.5vw;
    }
    .price {
        color: $themeColor;
        font-size: 4vw;
        font-weight: 600;
    }
}
.status {
    text-align: right;
    button {
        padding: 1vw;
        background-color: white;
        outline: none;
        border: 1px solid $themeColor;
        color: $themeColor;
        border-radius: 1vw;
    }
}
</style>
