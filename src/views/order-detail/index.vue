<script setup lang="ts">
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import Header from '@/components/common-header-2/index.vue'
import { getOrderDetail } from '@/apis/order.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { OrderDetailType } from '@/apis/types/order.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const route = useRoute()
const userStore: any = useUserStore()
const OrderDetailInfo = ref({} as OrderDetailType)
const order_id = route.params.order_id as string
const router = useRouter()
const getOrderDetailApi = async () => {
    OrderDetailInfo.value = await getOrderDetail(
        userStore.userInfo.user_id,
        order_id,
    )
}
const back = () => {
    history.go(-1)
}
const gotoShopDetail = () => {
    router.push({
        path: `/deliveryShopDetail/${OrderDetailInfo.value._doc.restaurant_id}`,
    })
}
const loading = ref(false)
const watchReturn = () => {
    console.log('监听到了')
}
onMounted(async () => {
    loading.value = true
    await getOrderDetailApi()
    loading.value = false
    backPhone(watchReturn)
})
onUnmounted(() => {
    cancelBack(watchReturn)
})
</script>

<template>
    <div class="order_container">
        <header>
            <Header>
                <template #first>
                    <el-icon size="25" @click="back"
                        ><ArrowLeftBold></ArrowLeftBold
                    ></el-icon>
                </template>
                <template #second>
                    <span>订单详情</span>
                </template>
            </Header>
        </header>
        <div class="order_detail">
            <div style="height: 80vh" v-loading="loading" v-if="loading"></div>
            <div class="pay_status">
                <img
                    :src="
                        formate_img(OrderDetailInfo._doc?.restaurant_image_url)
                    "
                    alt=""
                />
                <span>{{ OrderDetailInfo._doc?.status_bar.title }}</span>
                <button @click="gotoShopDetail">再来一单</button>
            </div>
            <div class="order_info_1">
                <ul>
                    <li @click="gotoShopDetail">
                        <span class="img">
                            <img
                                :src="
                                    formate_img(
                                        OrderDetailInfo._doc
                                            ?.restaurant_image_url,
                                    )
                                "
                                alt=""
                            />
                        </span>
                        <span class="order_name">{{
                            OrderDetailInfo._doc?.restaurant_name
                        }}</span>
                        <span class="icon">
                            <el-icon size="20"
                                ><ArrowRightBold></ArrowRightBold
                            ></el-icon>
                        </span>
                    </li>
                    <li>
                        <span>{{
                            OrderDetailInfo._doc?.basket.group[0][0].name
                        }}</span>
                        <span>X{{ OrderDetailInfo._doc?.total_quantity }}</span>
                        <span
                            >￥{{
                                OrderDetailInfo._doc?.basket.group[0][0].price
                            }}</span
                        >
                    </li>
                    <li>
                        <span>配送费</span>
                        <span>{{
                            OrderDetailInfo._doc?.basket.packing_fee.price
                        }}</span>
                    </li>
                    <li>
                        <span
                            >实付{{ OrderDetailInfo._doc?.total_amount }}</span
                        >
                    </li>
                </ul>
            </div>
            <div class="delivery_info">
                <p class="delivery_name">配送信息</p>
                <ul>
                    <li>
                        <span>送达时间:</span>
                        <span>{{ OrderDetailInfo.deliver_time }}</span>
                    </li>
                    <li>
                        <span>送货地址:</span>
                        <span class="address">{{
                            OrderDetailInfo.addressDetail
                        }}</span>
                    </li>
                    <li>
                        <span>配送方式:</span>
                        <span>蜂鸟专送</span>
                    </li>
                </ul>
            </div>
            <div class="order_info_2" style="margin-bottom: 2vw">
                <p class="delivery_name">订单信息</p>
                <ul>
                    <li>
                        <span>订单号:</span>
                        <span>{{ OrderDetailInfo.phone }}</span>
                    </li>
                    <li>
                        <span>支付方式:</span>
                        <span>{{ OrderDetailInfo.pay_method }}</span>
                    </li>
                    <li>
                        <span>下单时间:</span>
                        <span>2023-12-14 16:32</span>
                    </li>
                </ul>
            </div>
        </div>
        <div style="height: 8vw"></div>
    </div>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
}
.order_detail {
    //支付状态
    .pay_status {
        padding: 2vw 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        line-height: 2;
        box-shadow: 0 -0.2vw 0.4vw 0.5vw rgba(0, 0, 0, 0.1);
        img {
            width: 20vw;
            height: 20vw;
            border-radius: 50%;
        }
        span {
            font-size: 6vw;
            font-weight: 600;
        }
        button {
            padding: 1vw 2vw;
            border-radius: 1.4vw;
            border: 1px solid $themeColor;
            background-color: white;
            color: $themeColor;
        }
    }
    //订单信息-1
    .order_info_1 {
        margin-top: 3vw;
        background-color: white;
        box-shadow: 0 0.1vw 0.4vw 0.5vw rgba(0, 0, 0, 0.1);
        ul {
            li {
                padding: 3vw 2vw;
                border-bottom: 0.2vw solid rgba(115, 115, 115, 0.3);
                font-size: 4vw;
                span {
                    display: inline-block;
                }
                &:first-child {
                    display: flex;
                    align-items: center;
                    .img {
                        margin-right: 2vw;
                        width: 10vw;
                        height: 10vw;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .order_name {
                        flex: 1;
                    }
                }
                &:nth-child(2) {
                    display: flex;
                    span {
                        &:first-child {
                            flex: 1;
                        }
                        &:nth-child(2) {
                            margin-right: 4vw;
                            color: #8888;
                        }
                    }
                }
                &:nth-child(3) {
                    display: flex;
                    span {
                        &:first-child {
                            flex: 1;
                        }
                    }
                }
                &:last-child {
                    text-align: right;
                    color: $themeColor;
                }
            }
        }
    }
    //配送信息和订单信息_2
    .delivery_info,
    .order_info_2 {
        padding-bottom: 2vw;
        font-size: 3.7vw;
        line-height: 1.8;
        box-shadow: 0 0.1vw 0.4vw 0.5vw rgba(0, 0, 0, 0.1);
        background-color: white;

        .delivery_name {
            margin: 4vw 0 0 0;
            padding: 2vw 2vw 2vw 2vw;
            border-bottom: 0.1vw solid rgba(115, 115, 115, 0.2);
            font-size: 5vw;
        }
        ul {
            padding: 0 2vw;
            li {
                display: flex;
                span {
                    display: inline-block;
                    &:first-child {
                        margin-right: 2vw;
                    }
                    &:nth-child(2) {
                        width: 50vw;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}
</style>
