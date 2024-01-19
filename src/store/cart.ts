import { defineStore } from 'pinia'
import { Food, Spec } from '@/apis/types/dekivery-home.ts'
import { ref } from 'vue'
export interface cartItemType {
    restaurant_id: string | number
    category_id: string | number
    item_id: string | number
    food_id: string | number
    name: string
    price: number
    specs: Spec[]
    count: number
}
export const useCart = defineStore('CartStore', () => {
    const cartItems = ref({})

    //加入购物车
    const changeCartData = (
        food: Food | cartItemType,
        selectedIndex: number,
    ) => {
        let cartData: cartItemType = {} as cartItemType
        if ((food as Food).specfoods) {
            cartData = {
                restaurant_id: food.restaurant_id,
                category_id: food.category_id,
                item_id: food.item_id,
                food_id: (food as Food).specfoods[selectedIndex].food_id,
                name: food.name,
                price: (food as Food).specfoods[selectedIndex].price,
                specs: (food as Food).specfoods[selectedIndex].specs,
                count: 1,
            }
        } else {
            cartData = {
                restaurant_id: food.restaurant_id,
                category_id: food.category_id,
                item_id: food.item_id,
                food_id: (food as cartItemType).food_id,
                name: food.name,
                price: (food as cartItemType).price,
                specs: (food as cartItemType).specs,
                count: 1,
            }
        }

        const cartItem: any = cartItems.value
        //根据餐厅的id来进行加入购物车
        const res = Object.keys(cartItem).find((item: string) => {
            //找到餐厅的id
            let flag = 0
            if (item === String(cartData.restaurant_id)) {
                //找到相应的食物id
                cartItem[item].find((food: cartItemType) => {
                    if (food.food_id === (cartData as cartItemType).food_id) {
                        flag = 1
                        food.count++
                        return true
                    }
                })
            }
            return flag != 0
        })
        if (!res) {
            if (cartItem[String(cartData.restaurant_id)]) {
                cartItem[String(cartData.restaurant_id)] = [
                    cartData,
                    ...cartItem[String(cartData.restaurant_id)],
                ]
            } else {
                cartItem[String(cartData.restaurant_id)] = [cartData]
            }
        }
    }
    //减少购物车物品
    const removeCartData = (values: Food | cartItemType) => {
        const cartItem: any = cartItems.value
        Object.keys(cartItem).find((item) => {
            if (item === String(values.restaurant_id)) {
                //找到相应的食物进行相减
                cartItem[item].find((food: cartItemType, index: number) => {
                    console.log(values)
                    if (
                        ((values as Food).specfoods &&
                            food.food_id ===
                                (values as Food)?.specfoods[0].food_id) ||
                        food.food_id === (values as cartItemType)?.food_id
                    ) {
                    }
                    {
                        //进行相减
                        if (food.count == 1) {
                            //进行移除
                            cartItem[item].splice(index, 1)
                            return true
                        } else {
                            food.count--
                            return true
                        }
                    }
                })
            }
        })
    }
    //清空购物车,清空相应的商店的购物车
    const clearCart = (shopId: string | number) => {
        const cartItem: any = cartItems.value
        cartItem[String(shopId)] = []
    }
    //查找购物清单上的列表
    const CartList = (restaurant_id: number | string) => {
        const cartItem: any = cartItems.value
        return cartItem[restaurant_id]
    }
    return {
        cartItems,
        CartList,
        clearCart,
        removeCartData,
        changeCartData,
    }
})
