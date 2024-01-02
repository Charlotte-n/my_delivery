export interface Code {
    status: string
    code: string
}
//用户登录
export interface UserLogin {
    username: string
    user_id: number
    id: number
    point: number
    mobile: string
    is_mobile_valid: boolean
    is_email_valid: boolean
    is_active: number
    gift_amount: number
    email: string
    delivery_card_expire_days: number
    current_invoice_id: number
    current_address_id: number
    brand_member_new: number
    balance: number
    avatar: string
    __v: number
}

//用户信息
export interface UserInfo {
    username: string
    user_id: number
    id: number
    city: string
    registe_time: string
    column_desc: ColumnDesc
    point: number
    mobile: string
    is_mobile_valid: boolean
    is_email_valid: boolean
    is_active: number
    gift_amount: number
    email: string
    delivery_card_expire_days: number
    current_invoice_id: number
    current_address_id: number
    brand_member_new: number
    balance: number
    avatar: string
    __v: number
}

export interface ColumnDesc {
    gift_mall_desc: string
    game_link: string
    game_is_show: number
    game_image_hash: string
    game_desc: string
}

//#region 收货地址列表
export type AddressListType = SingleAddress[]

export interface SingleAddress {
    id: number
    address: string
    phone: string
    phone_bk: string
    name: string
    st_geohash: string
    address_detail: string
    tag_type: number
    user_id: number
    phone_had_bound: boolean
    deliver_amount: number
    agent_fee: number
    is_deliverable: boolean
    is_user_default: boolean
    tag: string
    city_id: number
    sex: number
    poi_type: number
    created_at: string
    is_valid: number
    __v: number
}

//endregion

//#region增加收货地址
export interface addAddressType {
    status: number
    success: string
}
//endregion

//#region 可用红包
export type RedPacketsType = RedPacketType[]

export interface RedPacketType {
    id: number
    sn: string
    user_id: number
    amount: number
    sum_condition: number
    name: string
    phone: string
    begin_date: string
    end_date: string
    status: number
    present_status: number
    share_status: number
    description_map: DescriptionMap
    __v: number
    limit_map?: LimitMap
}
export interface DescriptionMap {
    phone: string
    online_paid_only: string
    validity_delta: string
    validity_periods: string
    sum_condition: string
}
export interface LimitMap {
    restaurant_flavor_ids: string
}
//endregion
