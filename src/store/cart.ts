import { defineStore } from 'pinia'
import { Food, Spec } from '@/apis/types/dekivery-home.ts'
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
export const useCart = defineStore('CartStore', {
    state: () => ({
        //加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
        cartItems: {},
    }),
    actions: {
        //加入购物车
        changeCartData(food: Food | cartItemType, selectedIndex: number) {
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

            const cartItem: any = this.cartItems
            //根据餐厅的id来进行加入购物车
            const res = Object.keys(cartItem).find((item: string) => {
                //找到餐厅的id
                let flag = 0
                if (item === String(cartData.restaurant_id)) {
                    //找到相应的食物id
                    cartItem[item].find((food: cartItemType) => {
                        if (
                            food.food_id === (cartData as cartItemType).food_id
                        ) {
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
        },
        //减少购物车物品
        removeCartData(values: Food | cartItemType) {
            const cartItem: any = this.cartItems
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
        },
        //清空购物车,清空相应的商店的购物车
        clearCart(shopId: string | number) {
            const cartItem: any = this.cartItems
            cartItem[String(shopId)] = []
        },
        //查找购物清单上的列表
        CartList(restaurant_id: number | string) {
            const cartItem: any = this.cartItems
            return cartItem[restaurant_id]
        },
    },
    persist: {
        enabled: true,
    },
})
