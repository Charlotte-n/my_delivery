<script setup lang="ts">
import { Food, FoodMenu, Specfood } from '@/apis/types/dekivery-home.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cartItemType, useCart } from '@/store/cart.ts'
const route = useRoute()
const router = useRouter()
const cartStore: any = useCart()
const props = defineProps<{
    foodMenu: FoodMenu
}>()
//处理tab栏切换
const activeIndexTab = ref(0)
const handleTabChange = (index: number) => {
    activeIndexTab.value = index
    let title = document.querySelectorAll('.title')
    title[activeIndexTab.value].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    })
}
//显示弹窗
const dialogShow = ref(false)
const titleData = ref('')
const SpecFoods = ref<Specfood[]>([] as Specfood[])
const selectPrice = ref()
const selectedFood = ref<Food>({} as Food)
const showDialog = (title: string, item: Specfood[], food: Food) => {
    dialogShow.value = true
    titleData.value = title
    SpecFoods.value = item
    selectPrice.value = item[0].price
    selectedFood.value = food
}
const handleClose = () => {
    guigeIndex.value = 0
}
//#region加入购物车
const cartData = ref<cartItemType>({} as cartItemType)
const handleAddCart = async (food: Food, index?: number) => {
    const selectedIndex = index ? index : 0
    cartStore.changeCartData(food, selectedIndex)
    findSingleFoodNum(food)
}
//endregion
//#region减少购物车
const removeCart = (food: Food) => {
    cartStore.removeCartData(food)
}
//endregion
//#region跳转到食物详情页
const gotoFoodDetail = (food: Food) => {
    cartData.value = {
        restaurant_id: food.restaurant_id,
        category_id: food.category_id,
        item_id: food.item_id,
        food_id: food.specfoods[0].food_id,
        name: food.name,
        price: food.specfoods[0].price,
        specs: food.specfoods[0].specs,
        count: 1,
    }
    router.push({
        path: '/delivery/food_detail/',
        query: {
            img_path: food.image_path,
            description: food.description,
            name: food.name,
            month_sale: food.month_sales,
            pinglun: food.satisfy_count,
            haoping: food.satisfy_rate,
            cartData: JSON.stringify(cartData.value),
        },
    })
}
//endregion
const guigeIndex = ref(0)
const handlePrice = (item: Specfood, index: number) => {
    selectPrice.value = item.price
    //选中的规格
    guigeIndex.value = index
}
const food_id_active = ref()
const findCategory = (category_id: string | number) => {
    const restaurant = ref()
    //找到餐厅
    Object.keys(cartStore.cartItems).find((item: string) => {
        if (item === String(route.params.shop_id)) {
            restaurant.value = cartStore.cartItems[item]
        }
    })
    //找到分类
    let result = 0
    restaurant.value?.forEach((food: cartItemType) => {
        if (food.category_id === category_id) {
            result += food.count
        }
    })
    return result
}

const handleCartNum = (food: Food) => {
    food_id_active.value = food.specfoods[0].food_id
    return food.specfoods.length == 1 && findSingleFoodNum(food) === undefined
}
const findSingleFoodNum = (food: Food) => {
    //先找到餐厅
    const restaurant = ref()
    Object.keys(cartStore.cartItems).find((item: string) => {
        if (item === String(food.restaurant_id)) {
            restaurant.value = cartStore.cartItems[item]
        }
    })
    // 再找具体的食物
    const length = restaurant.value?.find((foodvalue: cartItemType) => {
        if (foodvalue.food_id === food.specfoods[0].food_id) {
            return foodvalue
        }
    })

    return length?.count
}
onMounted(() => {})
</script>

<template>
    <div class="good_detail">
        <div class="left">
            <ul class="food_cates">
                <li
                    v-for="(item, index) in props.foodMenu"
                    :key="item.id"
                    @click="handleTabChange(index)"
                    :class="{
                        'text1-ellipsis': true,
                        food_cate_item: true,
                        active: index === activeIndexTab,
                    }"
                >
                    <span class="text1-ellipsis">{{ item.name }}</span>
                    <span class="num" v-show="findCategory(item.id)">{{
                        findCategory(item.id)
                    }}</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div v-for="item in props.foodMenu" :key="item.id">
                <header ref="title">
                    <span
                        class="title text1-ellipsis"
                        style="width: 17vw; display: inline-block"
                        >{{ item.name }}</span
                    >
                    <span
                        class="text1-ellipsis"
                        style="width: 17vw; display: inline-block"
                        >{{ item.description }}</span
                    >
                </header>
                <ul>
                    <li v-for="food in item.foods">
                        <div class="img" @click="gotoFoodDetail(food)">
                            <img :src="formate_img(food?.image_path)" alt="" />
                        </div>
                        <div class="good_detail2" @click="gotoFoodDetail(food)">
                            <span class="good_name text1-ellipsis">{{
                                food?.name
                            }}</span>
                            <span>{{ food?.pinyin_name }}</span>
                            <span style="font-size: 2.6vw">{{
                                food?.tips
                            }}</span>
                            <span>￥{{ food?.specfoods[0].price }}</span>
                        </div>
                        <div class="good_number">
                            <span>{{ food.specfoods[0].specs_name }}</span>
                            <span
                                v-if="handleCartNum(food)"
                                @click="handleAddCart(food)"
                            >
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
                            <span
                                v-else-if="findSingleFoodNum(food) >= 1"
                                class="add_and_jian"
                            >
                                <svg
                                    t="1703465549735"
                                    class="icon jian"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1962"
                                    width="20"
                                    height="20"
                                    @click="removeCart(food)"
                                >
                                    <path
                                        d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z"
                                        p-id="1963"
                                    ></path>
                                </svg>
                                <span>{{ findSingleFoodNum(food) }}</span>
                                <svg
                                    t="1703259019839"
                                    class="icon add"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="3340"
                                    width="20"
                                    height="20"
                                    @click="handleAddCart(food)"
                                >
                                    <path
                                        d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                        p-id="3341"
                                    ></path>
                                </svg>
                            </span>
                            <div v-else>
                                <el-button
                                    class="btn"
                                    text
                                    @click="
                                        showDialog(
                                            item.name,
                                            food.specfoods,
                                            food,
                                        )
                                    "
                                >
                                    选规格
                                </el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="height: 15vw"></div>
        </div>
    </div>
    <el-dialog
        v-model="dialogShow"
        :title="titleData"
        width="60%"
        @close="handleClose"
    >
        <div class="guige_detail">
            <span style="margin-bottom: 2vw; color: black; font-size: 3vw"
                >规格</span
            >
            <span class="guige_btn">
                <el-button
                    v-for="(item, index) in SpecFoods"
                    :class="{
                        'btn-1': true,
                        'active-right': index === guigeIndex,
                        'text1-ellipsis': true,
                    }"
                    @click="handlePrice(item, index)"
                >
                    {{ item.specs_name }}
                </el-button>
            </span>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <span style="font-size: 3.8vw; color: #ff692f"
                    >￥{{ selectPrice }}</span
                >
                <el-button
                    class="btn"
                    type="primary"
                    @click="handleAddCart(selectedFood, guigeIndex)"
                >
                    加入购物车
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.good_detail {
    display: flex;
    overflow: hidden;
    .left {
        .food_cates {
            height: 77.4vh;
            background-color: rgba(115, 115, 115, 0.1);
            overflow: auto;
            .food_cate_item {
                display: flex;
                justify-content: space-between;
                width: 25vw;
                padding: 4vw 4vw;
                span {
                    &:first-child {
                        display: inline-block;
                        width: 20vw;
                    }
                }
                .num {
                    border: 1px solid $themeColor;
                    border-radius: 1vw;
                    padding: 0 1vw;
                    background-color: $themeColor;
                    color: whitesmoke;
                }
            }
        }
    }
    .right {
        height: 77.4vh;
        overflow: auto;
        padding: 1vw 0;
        flex: 1;
        header {
            padding-left: 2vw;
            margin-bottom: 3vw;
            margin-top: 2vw;
            span {
                &:first-child {
                    margin-right: 1vw;
                    font-size: 2vw;
                }
                &:last-child {
                    font-size: 2vw;
                    color: #888888;
                }
            }
        }
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
    }
}
.add {
    fill: $themeColor;
    width: 4.3vw;
    height: 4.3vw;
}

//左侧点击激活的样式
.active {
    background-color: white;
    border-left: 1.4vw solid $themeColor;
}
.btn {
    padding: 0vw 2vw;
    height: 6.7vw;
    border: 0;
    border-radius: 1vw;
    outline: none;
    font-size: 2vw;
    background-color: $themeColor;
    color: white;
}
.btn-1 {
    padding: 2vw 1vw;
    width: 15vw;
}
.guige_detail {
    display: flex;
    flex-direction: column;
}
.dialog-footer {
    display: flex;
    justify-content: space-between;
}
.guige_btn {
    display: flex;
    flex-wrap: wrap;
    .el-button {
        width: 25%;
    }
}
.jian {
    fill: $themeColor;
    width: 4vw;
    height: 4vw;
}
.add_and_jian {
    display: flex;
    align-items: center;
}
//动态添加样式
.active-right {
    border: 1px solid $themeColor;
    color: $themeColor;
}
</style>
