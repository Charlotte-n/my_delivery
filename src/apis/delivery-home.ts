import services from '@/axios'
import { ResponseType } from '@/apis/types/common.ts'
import {
    AssessRatingType,
    DeliveryData,
    FoodMenu,
    foods,
    RateCateType,
    RateInfoType,
    ResCate,
    Shop,
    ShopDetailInfo,
} from '@/apis/types/dekivery-home.ts'
import { RouteParamValue } from 'vue-router'
enum DeliveryHome {
    FOOD_CATEGORY = '/v2/index_entry',
    SHOPPING_RESTAURANT = '/shopping/restaurants',
    OTHER_RESTAURANT = '/shopping/v2/restaurant/category',
    DELIVERY_MODE = '/shopping/v1/restaurants/delivery_modes',
    SHOP_DETAIL_INFO = '/shopping/restaurant',
    FOOD_MENU = '/shopping/v2/menu',
    ADD_CART = '/v1/carts/checkout',
}

/**
 * 食物分类列表
 */
export const getFoodCategory = () => {
    return services
        .get<ResponseType<foods>>({
            url: DeliveryHome.FOOD_CATEGORY,
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取商铺列表
 * @param position
 */
interface paramType {
    offset: number
    latitude: string
    limit: number
    restaurant_category_id?: string | RouteParamValue[]
    longitude: string
    order_by?: number
    delivery_mode?: number[] | string[]
    support_ids?: (string | number)[]
    restaurant_category_ids?: (string | number)[] | number
}
export const getShopRestaurant = (position: paramType) => {
    return services
        .get<ResponseType<Shop>>({
            url: DeliveryHome.SHOPPING_RESTAURANT,
            params: position,
        })
        .then((res) => {
            return res.data
        })
}

export interface OtherRestaurantParams {
    latitude: string
    longitude: string
}

/**
 * 获取商铺所有的分类列表
 * @param params
 */
export const getOtherRestaurant = (params: OtherRestaurantParams) => {
    return services
        .get<ResponseType<ResCate>>({
            url: DeliveryHome.OTHER_RESTAURANT,
            params,
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取配送方式
 * @param params
 */
export const getDeliveryMode = (params: OtherRestaurantParams) => {
    return services
        .get<ResponseType<DeliveryData>>({
            url: DeliveryHome.DELIVERY_MODE,
            params,
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取商铺详情信息
 * @param id
 */
export const getShopDetailInfo = (id: string | number) => {
    return services
        .get<ResponseType<ShopDetailInfo>>({
            url: DeliveryHome.SHOP_DETAIL_INFO + '/' + id,
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取食物列表
 * @param restaurant_id
 */
export const getFoodCate = (restaurant_id: string | number) => {
    return services
        .get<ResponseType<FoodMenu>>({
            url: DeliveryHome.FOOD_MENU,
            params: {
                restaurant_id,
            },
        })
        .then((res) => {
            return res.data
        })
}

type cartData = {
    attrs: []
    extra: {} | null
    id: string | number
    name: string
    price: string | number
    packing_fee: number
    quantity: number
    sku_id: string | number
    specs: {}
    stock: string | number
}
export interface addCartParamType {
    restaurant_id: string | number
    geohash: string | number
    entities: cartData[]
}

/**
 * 加入购物车操作
 * @param addCartParma
 */
export const addCart = (addCartParma: addCartParamType) => {
    return services
        .post<ResponseType<any>>({
            url: DeliveryHome.ADD_CART,
            params: {
                ...addCartParma,
            },
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取评论分数
 * @param id
 * @constructor
 */
export const GetAssessRating = (id: string | number) => {
    return services
        .get<ResponseType<AssessRatingType>>({
            url: `/ugc/v2/restaurants/${id}/ratings/scores`,
        })
        .then((res) => {
            return res.data
        })
}
/**
 * 获取评价分类
 * @param id
 * @constructor
 */
export const GetAssessCate = (id: string | number) => {
    return services
        .get<ResponseType<RateCateType>>({
            url: `/ugc/v2/restaurants/${id}/ratings/tags`,
        })
        .then((res) => res.data)
}

export interface AssessInfoParam {
    tag_name?: string
    offset?: number
    limit?: number
}
/**
 * 获取评价信息
 * @param restaurant_id
 * @param assessInfoParam
 */
export const getAssessInfo = (
    restaurant_id: string | number,
    assessInfoParam?: AssessInfoParam,
) => {
    return services
        .get<ResponseType<RateInfoType>>({
            url: `/ugc/v2/restaurants/${restaurant_id}/ratings`,
            params: assessInfoParam,
        })
        .then((res) => res.data)
}
