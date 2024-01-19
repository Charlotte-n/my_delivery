<script setup lang="ts">
import {
    ArrowLeftBold,
    User,
    Location,
    ArrowRightBold,
    SuccessFilled,
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted, Ref, ref, UnwrapRef } from 'vue'
import { SingleAddress } from '@/apis/types/user.ts'
import { getAddressList } from '@/apis/user.ts'
import { useUserStore } from '@/store/user.ts'
import { getOrderDetail } from '@/apis/order.ts'
import { OrderDetailType } from '@/apis/types/order.ts'
import { cartItemType, useCart } from '@/store/cart.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { getShopDetailInfo } from '@/apis/delivery-home.ts'
import { SingleRestaurant } from '@/apis/types/search.ts'
import useOrderStore from '@/store/order.ts'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const router = useRouter()
const route = useRoute()
const userStore: any = useUserStore()
const cartStore: any = useCart()
const orderStore = useOrderStore()
const restaurant_id: string = route.params.restaurant_id as string
const back = () => {
    history.go(-1)
}
const addressInfo: SingleAddress = userStore.address
const orderDetail = ref<OrderDetailType>({} as OrderDetailType)
const cartList: Ref<UnwrapRef<cartItemType[]>> = ref([] as cartItemType[])
const restaurant = ref<SingleRestaurant>({} as SingleRestaurant)
const getAddressApi = async () => {
    if (Object.keys(userStore.address).length === 0) {
        const res = await getAddressList(userStore.userInfo.user_id)
        userStore.setAddress(res[0])
    }
    //获取订单详情
    orderDetail.value = await getOrderDetail(
        userStore.userInfo.user_id,
        restaurant_id,
    )
    //拿出仓库存储的订单
    cartList.value = cartStore.CartList(restaurant_id)
    //得到餐厅详情
    restaurant.value = await getShopDetailInfo(restaurant_id)
}
const countPrice = computed(() => {
    return cartStore.cartItems[restaurant_id]?.reduce(
        (current: number, prev: cartItemType) =>
            current + prev.count * prev.price,
        0,
    )
})

//支付方式
const active = ref(false)
const changeActive = () => {
    active.value = false
}
const changePayMethod = () => {
    active.value = !active.value
}
const loading = ref(false)
const watchReturn = () => {
    console.log('监听到了')
}
onMounted(async () => {
    loading.value = true
    await getAddressApi()
    loading.value = false
    backPhone(watchReturn)
})
onUnmounted(() => {
    cancelBack(watchReturn)
})
</script>

<template>
    <header>
        <div class="header">
            <div class="left">
                <el-icon size="25" @click="back">
                    <ArrowLeftBold></ArrowLeftBold>
                </el-icon>
            </div>
            <div class="middle">
                <span class="text1-ellipsis text"> 确认订单 </span>
            </div>
            <div class="right">
                <el-icon size="25" @click="router.push('/user')"
                    ><User></User
                ></el-icon>
            </div>
        </div>
    </header>
    <main>
        <div style="height: 100vh" v-loading="loading" v-if="loading"></div>
        <div
            class="address"
            @click="router.push({ path: '/order/pay/address' })"
        >
            <div class="icon_location">
                <el-icon size="20"><Location /></el-icon>
            </div>
            <div class="detail_address">
                <div class="user_info">
                    <span>{{ addressInfo.name }}</span>
                    <span>{{ addressInfo.sex === 1 ? '女士' : '先生' }}</span>
                    <span>{{ addressInfo.phone }}</span>
                </div>
                <div class="address_info">
                    <span>{{ addressInfo.tag }}</span>
                    <span>{{ addressInfo.address }}</span>
                </div>
            </div>
            <div class="icon_right">
                <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
            </div>
        </div>
        <div class="arrive_time">
            <div class="left">送达时间</div>
            <div class="right">
                <span
                    >尽快送达 | 预计{{
                        restaurant.order_lead_time
                    }}分钟送达</span
                >
                <span>{{ restaurant.delivery_mode?.text }}</span>
            </div>
        </div>
        <div class="pay">
            <div class="pay_method" @click="changePayMethod">
                <span>支付方式</span>
                <span>在线支付</span>
                <span
                    ><el-icon size="12" color="#666666"
                        ><ArrowRightBold></ArrowRightBold></el-icon
                ></span>
            </div>
            <div class="red_package">
                <span>红包 </span>
                <span>暂时只在饿了么APP中支持 </span>
            </div>
        </div>
        <div class="orderlist">
            <div class="order_header">
                <img :src="formate_img(restaurant.image_path)" alt="" />
                <div class="title">{{ orderDetail._doc?.restaurant_name }}</div>
            </div>
            <div class="order_content">
                <ul>
                    <li v-for="item in cartList" :key="item.item_id">
                        <span>{{ item.name }}</span>
                        <span class="num">x {{ item.count }}</span>
                        <span>￥{{ item.price }}</span>
                    </li>
                    <li>
                        <span>餐盒</span>
                        <span>￥{{ restaurant.float_delivery_fee }}</span>
                    </li>
                    <li>
                        <span>配送费</span>
                        <span>￥{{ restaurant.float_delivery_fee }}</span>
                    </li>
                </ul>
            </div>
            <div class="all_money">
                <span>订单</span>
                <span class="money"
                    >￥{{
                        countPrice + restaurant.float_delivery_fee * 2
                    }}</span
                >
                <span>待支付</span>
            </div>
            <div></div>
        </div>
        <div class="order">
            <ul>
                <li @click="router.push('/order/pay/order_remark')">
                    <span>订单备注</span>
                    <span
                        v-if="Object.keys(orderStore.orderRemark).length !== 0"
                        class="text1-ellipsis"
                    >
                        {{ orderStore.orderRemark.join(',') }}
                    </span>
                    <span v-else>口味、偏好等</span>
                    <span
                        ><el-icon size="15" color="#666666"
                            ><ArrowRightBold></ArrowRightBold></el-icon
                    ></span>
                </li>
                <li @click="router.push('/order/pay/ticket')">
                    <span>发票抬头</span>
                    <span>不需要开发票</span>
                    <span
                        ><el-icon size="15" color="#666666"
                            ><ArrowRightBold></ArrowRightBold></el-icon
                    ></span>
                </li>
            </ul>
        </div>
        <div style="height: 10vw"></div>
    </main>
    <footer>
        <div class="left">待支付 ￥1349</div>
        <div
            class="right"
            @click="router.push({ path: '/order/pay/main-pay' })"
        >
            确定下单
        </div>
    </footer>
    <div class="pay_method_mask" v-if="active">
        <div class="title">支付方式</div>
        <ul>
            <li @click="changeActive">
                <span style="color: rgba(115, 115, 115, 0.3); font-size: 4.5vw"
                    >货到付款(商家不知道货到付款)</span
                >
                <span
                    ><el-icon size="20" color="rgba(115, 115, 115, 0.3)"
                        ><SuccessFilled></SuccessFilled></el-icon
                ></span>
            </li>
            <li @click="changeActive">
                <span style="font-size: 4.5vw">在线支付</span>
                <span
                    ><el-icon size="20" color="#4CD964"
                        ><SuccessFilled></SuccessFilled></el-icon
                ></span>
            </li>
        </ul>
    </div>
    <div class="mask" v-if="active" @click="changeActive"></div>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
}
.header {
    padding: 10vw 2vw 3vw 2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $themeColor;
    color: whitesmoke;
    .text {
        font-size: 4.6vw;
    }
    a {
        color: whitesmoke;
    }
    .middle {
        flex: 1;
        text-align: center;
        span {
            display: inline-block;
            width: 40vw;
        }
    }
}
main {
    height: 85.6vh;
    overflow: auto;
    .address {
        padding: 4vw 2vw;
        display: flex;
        align-items: center;
        background-color: white;
        .icon_location {
            margin-right: 2vw;
            color: $themeColor;
        }
        .detail_address {
            flex: 1;
            font-size: 4vw;
            .user_info {
                margin-bottom: 1vw;
                span {
                    &:first-child {
                        font-size: 5vw;
                        font-weight: 600;
                    }
                }
            }
            .address_info {
                font-size: 3.5vw;
                span {
                    &:first-child {
                        margin-right: 2vw;
                        border-radius: 1vw;
                        padding: 0 1vw;
                        background-color: #1dc779;
                        color: white;
                    }
                }
            }
        }
        .icon_right {
            color: #666666;
        }
    }
    .arrive_time {
        padding: 9vw 3vw;
        border-left: 1.5vw solid $themeColor;
        margin-top: 4vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        .left {
            font-size: 5vw;
            font-weight: 600;
        }
        .right {
            display: flex;
            flex-direction: column;
            color: $themeColor;
            align-items: flex-end;
            span {
                &:first-child {
                    margin-bottom: 2vw;
                    font-size: 4.6vw;
                }
                &:last-child {
                    border-radius: 1vw;
                    padding: 1vw 2vw;
                    font-size: 2vw;
                    background-color: $themeColor;
                    color: white;
                }
            }
        }
    }
    .pay {
        padding: 3vw;
        margin-top: 2vw;
        background-color: white;
        .pay_method {
            padding-bottom: 3vw;
            border-bottom: 1px solid rgba(115, 115, 115, 0.1);
            display: flex;
            align-items: center;
            span {
                font-size: 5vw;
                &:first-child {
                    flex: 1;
                    color: #666666;
                }
                &:nth-child(2) {
                    font-size: 4vw;
                }
            }
        }
        .red_package {
            display: flex;
            align-items: center;
            padding: 3vw 0;
            span {
                color: #666666;
                &:first-child {
                    flex: 1;
                    font-size: 3.8vw;
                }
                &:last-child {
                    font-size: 4.5vw;
                }
            }
        }
    }
    .orderlist {
        margin-top: 2vw;
        background-color: white;
        font-size: 4vw;
        .order_header {
            padding: 2vw;
            border-bottom: 1px solid rgba(115, 115, 115, 0.1);
            display: flex;
            align-items: center;
            img {
                margin-right: 2vw;
                width: 10vw;
                height: 10vw;
            }
        }
        .order_content {
            padding: 2vw;
            line-height: 2.3;
            ul {
                li {
                    display: flex;
                    color: #666666;
                    span {
                        &:first-child {
                            flex: 1;
                        }
                        &:last-child {
                            margin-left: 3vw;
                        }
                    }
                    .num {
                        color: $themeColor;
                    }
                }
            }
        }
        .all_money {
            padding: 0 0 2vw 2vw;
            display: flex;
            color: #666666;
            span {
                &:first-child {
                    flex: 1;
                }
                &:nth-child(2) {
                    margin-right: 2vw;
                    color: $themeColor;
                }
            }
        }
    }
    .order {
        margin-top: 2vw;
        padding: 3vw 2vw;
        background-color: white;
        font-size: 4vw;
        line-height: 2;
        color: #666666;
        ul {
            li {
                padding: 2vw 0;
                display: flex;
                align-items: center;
                span {
                    &:first-child {
                        flex: 1;
                    }
                    &:last-child {
                        margin-left: 2vw;
                    }
                }
            }
        }
    }
}
footer {
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
    color: white;
    .left {
        padding: 3.5vw;
        width: 70%;
        background-color: #3c3c3c;
    }
    .right {
        width: 30%;
        padding: 3.5vw 0;
        text-align: center;
        background-color: $themeColor;
    }
}
.pay_method_mask {
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    .title {
        padding: 4vw;
        background-color: #fafafa;
        text-align: center;
    }
    ul {
        li {
            padding: 4vw;
            display: flex;
            justify-content: space-between;
        }
    }
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
