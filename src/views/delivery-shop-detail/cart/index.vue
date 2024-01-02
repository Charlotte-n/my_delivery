<script setup lang="ts">
import { cartItemType, useCart } from '@/store/cart.ts'
import { ShopDetailInfo } from '@/apis/types/dekivery-home.ts'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DeleteFilled } from '@element-plus/icons-vue'

const router = useRouter()
const props = defineProps<{
    restaruant_id: string | number
    shopInfo: ShopDetailInfo
}>()
const cartStore: any = useCart()
const route = useRoute()

//购物车里面的该商店的购物数量
const findAllNum = computed(() => {
    return cartStore.cartItems[props.restaruant_id]?.reduce(
        (current: number, prev: cartItemType) => current + prev.count,
        0,
    )
})
//计算价格
const countPrice = computed(() => {
    return cartStore.cartItems[props.restaruant_id]?.reduce(
        (current: number, prev: cartItemType) =>
            current + prev.count * prev.price,
        0,
    )
})
const unArrivePrice = computed(() => {
    return props.shopInfo?.float_minimum_order_amount - countPrice.value
})
//#region显示购物清单上的列表
const cartList = ref<cartItemType[]>([] as cartItemType[])
const getCartList = () => {
    cartList.value = cartStore.CartList(
        (route.params.shop_id as string) || props.restaruant_id,
    )
}
//加入购物车
const handleAddCart = (item: cartItemType) => {
    cartStore.changeCartData(item, 0)
}
//减少购物车
const handleRemoveCart = (item: cartItemType) => {
    cartStore.removeCartData(item)
}
//清空购物车
const clearAll = () => {
    cartStore.clearCart(route.params.shop_id as string)
    showCartList.value = false
    //重新获取购物清单数据
    getCartList()
}
//显示购物车列表
const showCartList = ref(false)
const showCartContent = () => {
    getCartList()
    if (!findAllNum.value) {
        showCartList.value = false
        return
    }
    showCartList.value = !showCartList.value
}
//endregion
onMounted(() => {})
</script>

<template>
    <div class="cartList" v-if="showCartList && findAllNum">
        <header class="cart_header">
            <span>购物车</span>
            <span class="clear" @click="clearAll">
                <span
                    ><el-icon color="#666" size="20"><DeleteFilled /></el-icon
                ></span>
                <span>清空</span>
            </span>
        </header>
        <main>
            <ul>
                <li v-for="(item, index) in cartList" :key="index">
                    <span class="cart_left">{{ item.name }}</span>
                    <span class="cart_right">
                        <span class="price"
                            >￥{{ item.price * item.count }}</span
                        >
                        <span class="add_and_jian">
                            <svg
                                t="1703465549735"
                                class="icon jian"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="1962"
                                width="20"
                                height="20"
                                @click="handleRemoveCart(item)"
                            >
                                <path
                                    d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z"
                                    p-id="1963"
                                ></path>
                            </svg>
                            <span class="num">{{ item.count }}</span>
                            <svg
                                t="1703259019839"
                                class="icon add"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3340"
                                width="20"
                                height="20"
                                @click="handleAddCart(item)"
                            >
                                <path
                                    d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                    p-id="3341"
                                ></path>
                            </svg>
                        </span>
                    </span>
                </li>
            </ul>
        </main>
    </div>
    <div class="cart_detail">
        <div class="cart_svg" @click="showCartContent">
            <svg
                t="1703346657092"
                :class="{
                    icon: true,
                    cart_icon: true,
                    cart_active: findAllNum,
                }"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9000"
                width="200"
                height="200"
            >
                <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m-33.8 621.2c-2.1 5-5 9.4-8.9 13.1-3.9 3.7-8.3 6.6-13.3 8.9-5 2.2-10.4 3.3-15.9 3.3-5.9 0-11.3-1.2-16.1-3.3-4.9-2.2-9.2-5.1-13.1-8.9-3.9-3.8-6.8-8.1-8.9-13.1-2.1-5-3.1-10.4-3.1-15.9s1-10.9 3.1-15.9 5-9.4 8.9-13.1c3.9-3.7 8.2-6.6 13.1-8.7 4.9-2.1 10.3-3.1 16.1-3.1 5.7 0 10.9 1 15.9 3.1s9.4 4.9 13.3 8.7c3.9 3.7 6.8 8.1 8.9 13.1 2.1 5 3.1 10.4 3.1 15.9 0 5.7-1 10.9-3.1 15.9z m184.5 0.9c-2.2 5-5.1 9.4-8.9 13.1-3.8 3.7-8.2 6.6-13.3 8.9s-10.6 3.3-16.1 3.3c-5.7 0-10.9-1.2-15.9-3.3-5-2.2-9.4-5.1-13.1-8.9-3.7-3.7-6.6-8.1-8.9-13.1-2.2-5-3.3-10.4-3.3-15.9 0-5.7 1.2-10.9 3.3-15.9 2.2-5 5.1-9.4 8.9-13.1 3.7-3.7 8.1-6.6 13.1-8.7 4.9-2.1 10.3-3.1 15.9-3.1 5.7 0 11 1 16.1 3.1 5.1 2.1 9.6 4.9 13.3 8.7 3.7 3.7 6.6 8.1 8.9 13.1 2.2 5 3.3 10.4 3.3 15.9 0.1 5.6-1.1 10.8-3.3 15.9z m67.6-286.4c-0.1 3.7-0.6 6.9-1.6 9.5-0.8 2.6-2.7 8.2-5.5 16.4-2.8 8.3-6 17.4-9.5 27.2-3.6 9.8-7 19.7-10.4 29.4-3.3 9.7-6 17.4-7.7 23-3.9 11.8-8.7 20-14.7 24.6-5.9 4.6-13.2 6.9-21.7 6.9H426.9l6.6 39.9h223.2c14.1 0 21.2 6.1 21.2 18.1 0 5.9-1.4 11-4.2 15.3-2.8 4.3-8.4 6.4-16.6 6.4H425.2c-5.9 0-10.9-1.4-14.9-4s-7.3-6.2-9.9-10.4c-2.6-4.3-4.8-8.9-6.4-13.9-1.6-5-2.9-9.7-3.8-14.1-0.3-1.8-1.2-6.1-2.4-12.9-1.4-6.8-2.9-15.3-4.9-25.4s-4.1-21.6-6.4-34.1c-2.4-12.6-4.7-25.1-7.1-37.9-5.7-29.8-11.9-63-19.1-99.6h-33.2c-4.4 0-8.2-1.2-11.1-3.3-2.9-2.2-5.3-4.9-7.3-8-1.9-3.1-3.2-6.4-4-9.9-0.7-3.6-1.2-6.8-1.2-9.7 0-5.9 2-10.8 6-14.7 4-3.9 9.4-5.8 16.1-5.8H360.4c5.9 0 10.7 0.8 14.1 2.6 3.6 1.8 6.4 4 8.4 6.6 2.1 2.6 3.6 5.4 4.4 8.4 0.8 2.9 1.7 5.4 2.2 7.5 0.6 2.4 1.2 5.7 1.8 9.9 0.6 4.3 1.2 8.7 1.8 13.1 0.8 5.3 1.8 10.9 2.6 16.9l303 0.1c8.3 0 14.7 1.2 19.3 3.3 4.6 2.2 7.9 4.9 9.7 8.2 1.9 3.3 2.9 6.7 2.6 10.4z"
                    fill=""
                    p-id="9001"
                ></path>
            </svg>
            <span class="num" v-if="findAllNum > 0">{{ findAllNum }}</span>
        </div>
        <div class="delivery_fee">
            <div>￥{{ countPrice || 0 }}</div>
            <div>配送费￥{{ props.shopInfo?.float_delivery_fee }}元</div>
        </div>
        <span v-if="unArrivePrice > 0 || isNaN(unArrivePrice)" class="gotoPay"
            >还差{{ props.shopInfo?.float_minimum_order_amount }}元才配送</span
        >
        <span
            v-else
            class="gotoPay_01"
            @click="router.push('/order/pay/' + restaruant_id + '/' + 123)"
            >去支付</span
        >
    </div>
</template>

<style scoped lang="scss">
.cartList {
    width: 100vw;
    background-color: white;
    ul {
        padding: 2vw 2vw 0 2vw;
        background-color: white;

        li {
            padding: 2vw 0;
            display: flex;
            border-bottom: 1px solid rgba(115, 115, 115, 0.2);
            .img {
                margin-right: 2vw;
                width: 13vw;
                height: 13vw;
                flex-shrink: 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .good_detail2 {
                flex: 1;
                display: flex;
                flex-direction: column;
                line-height: 1.4;
                .good_name {
                    width: 20vw;
                }
                span {
                    &:nth-child(2) {
                        color: #888888;
                    }
                    &:nth-child(4) {
                        font-weight: 600;
                        font-size: 3.7vw;
                        color: $themeColor;
                    }
                }
            }
            .good_number {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: right;
                font-size: 3.4vw;
            }
        }
    }
    .cart_header {
        height: 6vw;
        padding: 2vw;
        display: flex;
        justify-content: space-between;
        font-size: 3.8vw;
        background-color: rgba(115, 115, 115, 0.2);
        .clear {
            display: flex;
            align-items: center;
        }
    }
    main {
        padding-bottom: 2vw;
        ul {
            li {
                display: flex;
                justify-content: space-between;
                .cart_right {
                    display: flex;
                    .price {
                        margin-right: 2vw;
                    }
                    .add_and_jian {
                        display: flex;
                        .add {
                            fill: $themeColor;
                        }
                        .jian {
                            fill: $themeColor;
                        }
                    }
                }
            }
        }
    }
}
.cart_detail {
    position: relative;
    display: flex;
    background-color: #3d3d3f;
    width: 100vw;
    height: 13vw;
    color: white;
    .cart_svg {
        position: absolute;
        top: -4vw;
        left: 3vw;
        width: 13vw;
        height: 13vw;
        .cart_icon {
            background-color: #3d3d3f;
            border: 0.8vw solid #444;
            border-radius: 50%;

            width: 13vw;
            height: 13vw;
            z-index: 100;
        }
        .num {
            position: absolute;
            top: -2vw;
            left: 11vw;
            font-size: 5vw;
            border: 1px solid $themeColor;
            border-radius: 2vw;
            z-index: 99999999;
            color: white;
            background-color: $themeColor;
        }
    }
    .delivery_fee {
        margin-left: 20vw;
        line-height: 1.5;
        flex: 1;
        div {
            &:first-child {
                font-size: 4vw;
            }
        }
    }
    .gotoPay {
        padding: 0 2vw;
        line-height: 13vw;
        font-size: 4vw;
        background-color: #888888;
    }
}
.cart_active {
    fill: $themeColor;
}
.gotoPay_01 {
    padding: 0 2vw;
    line-height: 13vw;
    font-size: 4vw;
    background-color: $themeColor;
}
</style>
