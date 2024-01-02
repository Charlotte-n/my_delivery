//食品分类列表

export type foods = food[]

export interface food {
    id: number
    is_in_serving: boolean
    description: string
    title: string
    link: string
    image_url: string
    icon_url: string
    title_color: string
    __v: number
}

//#region 获取商铺
export type Shop = shopList[]

export interface shopList {
    name: string
    address: string
    id: number
    latitude: number
    longitude: number
    location: number[]
    phone: string
    category: string
    supports: Support[]
    status: number
    recent_order_num: number
    rating_count: number
    rating: number
    promotion_info: string
    piecewise_agent_fee: PiecewiseAgentFee
    opening_hours: string[]
    license: License
    is_new: boolean
    is_premium: boolean
    image_path: string
    identification: Identification
    float_minimum_order_amount: number
    float_delivery_fee: number
    distance: string
    order_lead_time: string
    description: string
    delivery_mode: DeliveryMode
    activities: Activity[]
    __v: number
}

export interface Support {
    description: string
    icon_color: string
    icon_name: string
    id: number
    name: string
    _id: string
}

export interface PiecewiseAgentFee {
    tips: string
}

export interface License {
    catering_service_license_image: string
    business_license_image: string
}

export interface Identification {
    registered_number: string
    registered_address: string
    operation_period: string
    licenses_scope: string
    licenses_number: string
    licenses_date: string
    legal_person: string
    identificate_date: any
    identificate_agency: string
    company_name: string
}

export interface DeliveryMode {
    color: string
    id: number
    is_solid: boolean
    text: string
}

export interface Activity {
    icon_name: string
    name: string
    description: string
    icon_color: string
    id: number
    _id: string
}
//endregion

//#region 商铺分类列表
export type ResCate = SingleRes[]

export interface SingleRes {
    count: number
    id?: number
    image_url: string
    level: number
    name: string
    sub_categories: SubCategory[]
    ids: number[]
    __v: number
}

export interface SubCategory {
    count: number
    id: number
    image_url: string
    level: number
    name: string
    _id: string
}

//endregion

//#region配送方式

export type DeliveryData = deliveryModeType[]
export interface deliveryModeType {
    color: string
    id: number
    is_solid: boolean
    text: string
    __v: number
}
//endregion

//#region商品详情信息
export interface ShopDetailInfo {
    name: string
    address: string
    id: number
    latitude: number
    longitude: number
    location: number[]
    phone: string
    category: string
    supports: Support[]
    status: number
    recent_order_num: number
    rating_count: number
    rating: number
    promotion_info: string
    piecewise_agent_fee: PiecewiseAgentFee
    opening_hours: string[]
    license: License
    is_new: boolean
    is_premium: boolean
    image_path: string
    identification: Identification
    float_minimum_order_amount: number
    float_delivery_fee: number
    distance: string
    order_lead_time: string
    description: string
    delivery_mode: DeliveryMode
    activities: any[]
    __v: number
}

export interface Support {
    description: string
    icon_color: string
    icon_name: string
    id: number
    name: string
    _id: string
}

export interface PiecewiseAgentFee {
    tips: string
}

export interface License {
    catering_service_license_image: string
    business_license_image: string
}

export interface Identification {
    registered_number: string
    registered_address: string
    operation_period: string
    licenses_scope: string
    licenses_number: string
    licenses_date: string
    legal_person: string
    identificate_date: any
    identificate_agency: string
    company_name: string
}

export interface DeliveryMode {
    color: string
    id: number
    is_solid: boolean
    text: string
}

//endregion

//#region 获取食物列表
export type FoodMenu = Food_item[]

export interface Food_item {
    name: string
    description: string
    restaurant_id: number
    id: number
    foods: Food[]
    type: number
    icon_url: string
    is_selected: boolean
    __v: number
}

export interface Food {
    _id: string
    tips: string
    item_id: number
    category_id: number
    restaurant_id: number
    activity?: Activity
    image_path: string
    name: string
    __v: number
    specfoods: Specfood[]
    satisfy_rate: number
    satisfy_count: number
    attributes: Attribute | undefined[]
    is_essential: boolean
    server_utc: string
    specifications: Specification[]
    rating_count: number
    month_sales: number
    description: string
    attrs: any[]
    display_times: any[]
    pinyin_name: string
    is_featured: number
    rating: number
}

export interface Activity {
    image_text: string
    icon_color: string
    image_text_color: string
}

export interface Specfood {
    specs_name?: string
    name: string
    item_id: number
    sku_id: number
    food_id: number
    restaurant_id?: number
    _id: string
    specs: Spec[]
    stock: number
    checkout_mode: number
    is_essential: boolean
    recent_popularity: number
    sold_out: boolean
    price: number
    promotion_stock: number
    recent_rating: number
    packing_fee: number
    pinyin_name: string
    original_price: number
}

export interface Spec {
    name: string
    value?: string
    _id: string
}

export interface Attribute {
    icon_color: string
    icon_name: string
}

export interface Specification {
    values: any[]
    name: string
}
//endregion

//#region 获取评论分数
export interface AssessRatingType {
    compare_rating: number
    deliver_time: number
    food_score: number
    order_rating_amount: number
    overall_score: number
    service_score: number
}

//endregion

//#region 获取评价分类
export type RateCateType = RateCate[]

export interface RateCate {
    name: string
    _id: string
    unsatisfied: boolean
    count: number
}

//endregion

//#region 获取评价信息
export type RateInfoType = RateInfo[]

export interface RateInfo {
    rated_at: string
    rating_star: number
    rating_text: string
    time_spent_desc: string
    _id: string
    username: string
    tags: any[]
    item_ratings: ItemRating[]
    highlights: any[]
    avatar: string
}

export interface ItemRating {
    food_id: number
    food_name: string
    _id: string
    is_valid: number
    image_hash: string
}

//endregion
