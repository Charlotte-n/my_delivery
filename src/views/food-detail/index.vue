<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { formate_img } from '@/utils/formate_img.ts'
import Cart from '@/views/delivery-shop-detail/cart/index.vue'
import { cartItemType, useCart } from '@/store/cart.ts'
import { ShopDetailInfo } from '@/apis/types/dekivery-home.ts'
import { getShopDetailInfo } from '@/apis/delivery-home.ts'
const route = useRoute()
const cartStore: any = useCart()
const foodDescription = ref({
    img_path: route.query.img_path,
    name: route.query.name,
    description: route.query.description,
    month_sale: route.query.month_sale,
    pinglun: route.query.pinglun,
    haoping: route.query.haoping,
    cartData: JSON.parse(route.query.cartData as string),
})
const back = () => {
    history.go(-1)
}
//加入购物车
const addCart = () => {
    cartStore.changeCartData(foodDescription.value.cartData)
}
//#region获取商铺详情信息
const shopInfo = ref<ShopDetailInfo>()
const getShopDetailInfoApi = async () => {
    console.log(foodDescription.value.cartData.restaurant_id)
    shopInfo.value = await getShopDetailInfo(
        foodDescription.value.cartData.restaurant_id as string,
    )
}
//endregion

const handleCartNum = computed(() => {
    return !findSingleFoodNum.value
})
const findSingleFoodNum = computed(() => {
    //先找到餐厅
    const restaurant = ref()
    Object.keys(cartStore.cartItems).find((item: string) => {
        if (item === String(foodDescription.value.cartData.restaurant_id)) {
            restaurant.value = cartStore.cartItems[item]
        }
    })
    // 再找具体的食物
    const length = restaurant.value?.find((foodvalue: cartItemType) => {
        if (foodvalue.food_id === foodDescription.value.cartData.food_id) {
            return foodvalue
        }
    })

    return length?.count
})
//
const removeCart = () => {
    cartStore.removeCartData(foodDescription.value.cartData)
}
onMounted(() => {
    getShopDetailInfoApi()
})
</script>

<template>
    <Header>
        <template #first>
            <el-icon size="30" @click="back"
                ><ArrowLeftBold></ArrowLeftBold
            ></el-icon>
        </template>
        <template #second> {{ foodDescription.name }} </template>
    </Header>
    <div>
        <div class="img">
            <img :src="formate_img(foodDescription.img_path)" alt="" />
        </div>
        <div class="food_detail_decs">
            <span>
                <span class="spec_name">{{ foodDescription.description }}</span>

                <span v-if="handleCartNum" @click="addCart">
                    <svg
                        t="1703259019839"
                        class="icon add"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3340"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                            p-id="3341"
                        ></path>
                    </svg>
                </span>
                <span v-else-if="findSingleFoodNum >= 1" class="add_and_jian">
                    <svg
                        t="1703465549735"
                        class="icon jian"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1962"
                        width="20"
                        height="20"
                        @click="removeCart"
                    >
                        <path
                            d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z"
                            p-id="1963"
                        ></path>
                    </svg>
                    <span>{{ findSingleFoodNum }}</span>
                    <svg
                        t="1703259019839"
                        class="icon add"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3340"
                        width="20"
                        height="20"
                        @click="addCart"
                    >
                        <path
                            d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                            p-id="3341"
                        ></path>
                    </svg>
                </span>
            </span>
            <span>{{ foodDescription.name }}</span>
            <span>星星代替</span>
            <span>月售{{ foodDescription.month_sale }}</span>
            <span>
                <span style="margin-right: 2vw"
                    >评论数 {{ foodDescription.pinglun }}</span
                >
                <span>好评率 {{ foodDescription.haoping }}%</span>
            </span>
        </div>
    </div>
    <footer>
        <Cart
            :restaruant_id="foodDescription.cartData.restaurant_id"
            :shopInfo="shopInfo"
        ></Cart>
    </footer>
</template>

<style scoped lang="scss">
.img {
    width: 100vw;
    height: 80vw;
    img {
        width: 100%;
        height: 100%;
    }
}
.food_detail_decs {
    padding: 2vw;
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    span {
        &:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .add_and_jian {
            display: flex;
            align-items: center;
        }
        .add {
            fill: $themeColor;
        }
        .jian {
            fill: $themeColor;
        }
    }
}
footer {
    position: fixed;
    bottom: 0;
}
</style>
