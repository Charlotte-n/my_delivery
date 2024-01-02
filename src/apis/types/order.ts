//#region 获取订单列表类型
export type OrderList = OrderListItem[]

export interface OrderListItem {
    _id: string
    restaurant_id: number
    restaurant_image_url: string
    restaurant_name: string
    formatted_created_at: string
    order_time: number
    time_pass: number
    total_amount: number
    total_quantity: number
    unique_id: number
    id: number
    user_id: number
    address_id: number
    __v: number
    top_show: number
    timeline_node: TimelineNode
    status_code: number
    status_bar: StatusBar
    restaurant_type: number
    remind_reply_count: number
    rated_point: number
    pay_remain_seconds: number
    operation_upload_photo: number
    operation_rebuy: number
    operation_rate: number
    operation_pay: number
    operation_confirm: number
    is_pindan: number
    is_new_pay: number
    is_deletable: number
    is_brand: number
    basket: Basket
}

export interface TimelineNode {
    in_processing: number
    actions: any[]
}

export interface StatusBar {
    color: string
    image_type: string
    sub_title: string
    title: string
}

export interface Basket {
    pindan_map: any[]
    packing_fee: PackingFee
    group: Group[][]
    extra: any[]
    deliver_fee: DeliverFee
    abandoned_extra: any[]
}

export interface PackingFee {
    price: number
    quantity: number
    name: string
    category_id: number
}

export interface Group {
    name: string
    price: number
    quantity: number
    _id: string
    specs: string[]
    new_specs: any[]
    attrs: any[]
}

export interface DeliverFee {
    quantity: number
    price: number
    name: string
    category_id: number
}
//

//#region订单详情
export interface OrderDetailType {
    $__: GeneratedType
    isNew: boolean
    _doc: Doc
    $init: boolean
    addressDetail: string
    consignee: string
    deliver_time: string
    pay_method: string
    phone: string
}

export interface GeneratedType {
    strictMode: boolean
    selected: Selected
    getters: Getters
    wasPopulated: boolean
    activePaths: ActivePaths
    pathsToScopes: PathsToScopes
    emitter: Emitter
    $options: boolean
}

export interface Selected {
    _id: number
}

export interface Getters {}

export interface ActivePaths {
    paths: Paths
    states: States
    stateNames: string[]
}

export interface Paths {
    __v: string
    'basket.abandoned_extra': string
    'basket.deliver_fee.category_id': string
    'basket.deliver_fee.name': string
    'basket.deliver_fee.price': string
    'basket.deliver_fee.quantity': string
    'basket.extra': string
    'basket.group': string
    'basket.packing_fee.category_id': string
    'basket.packing_fee.name': string
    'basket.packing_fee.quantity': string
    'basket.packing_fee.price': string
    'basket.pindan_map': string
    is_brand: string
    is_deletable: string
    is_new_pay: string
    is_pindan: string
    operation_confirm: string
    operation_pay: string
    operation_rate: string
    operation_rebuy: string
    operation_upload_photo: string
    pay_remain_seconds: string
    rated_point: string
    remind_reply_count: string
    restaurant_type: string
    'status_bar.title': string
    'status_bar.sub_title': string
    'status_bar.image_type': string
    'status_bar.color': string
    status_code: string
    'timeline_node.actions': string
    'timeline_node.in_processing': string
    top_show: string
    address_id: string
    user_id: string
    id: string
    unique_id: string
    total_quantity: string
    total_amount: string
    time_pass: string
    order_time: string
    formatted_created_at: string
    restaurant_name: string
    restaurant_image_url: string
    restaurant_id: string
}

export interface States {
    ignore: Ignore
    default: Default
    init: Init
    modify: Modify
    require: Require
}

export interface Ignore {}

export interface Default {}

export interface Init {
    __v: boolean
    'basket.abandoned_extra': boolean
    'basket.deliver_fee.category_id': boolean
    'basket.deliver_fee.name': boolean
    'basket.deliver_fee.price': boolean
    'basket.deliver_fee.quantity': boolean
    'basket.extra': boolean
    'basket.group': boolean
    'basket.packing_fee.category_id': boolean
    'basket.packing_fee.name': boolean
    'basket.packing_fee.quantity': boolean
    'basket.packing_fee.price': boolean
    'basket.pindan_map': boolean
    is_brand: boolean
    is_deletable: boolean
    is_new_pay: boolean
    is_pindan: boolean
    operation_confirm: boolean
    operation_pay: boolean
    operation_rate: boolean
    operation_rebuy: boolean
    operation_upload_photo: boolean
    pay_remain_seconds: boolean
    rated_point: boolean
    remind_reply_count: boolean
    restaurant_type: boolean
    'status_bar.title': boolean
    'status_bar.sub_title': boolean
    'status_bar.image_type': boolean
    'status_bar.color': boolean
    status_code: boolean
    'timeline_node.actions': boolean
    'timeline_node.in_processing': boolean
    top_show: boolean
    address_id: boolean
    user_id: boolean
    id: boolean
    unique_id: boolean
    total_quantity: boolean
    total_amount: boolean
    time_pass: boolean
    order_time: boolean
    formatted_created_at: boolean
    restaurant_name: boolean
    restaurant_image_url: boolean
    restaurant_id: boolean
}

export interface Modify {}

export interface Require {}

export interface PathsToScopes {}

export interface Emitter {
    _events: Events
    _eventsCount: number
    _maxListeners: number
}

export interface Events {
    save: any[]
    isNew: any[]
}

export interface Doc {
    __v: number
    basket: Basket
    is_brand: number
    is_deletable: number
    is_new_pay: number
    is_pindan: number
    operation_confirm: number
    operation_pay: number
    operation_rate: number
    operation_rebuy: number
    operation_upload_photo: number
    pay_remain_seconds: number
    rated_point: number
    remind_reply_count: number
    restaurant_type: number
    status_bar: StatusBar
    status_code: number
    timeline_node: TimelineNode
    top_show: number
    address_id: number
    user_id: number
    id: number
    unique_id: number
    total_quantity: number
    total_amount: number
    time_pass: number
    order_time: number
    formatted_created_at: string
    restaurant_name: string
    restaurant_image_url: string
    restaurant_id: number
}

export interface Basket {
    abandoned_extra: any[]
    deliver_fee: DeliverFee
    extra: any[]
    group: Group[][]
    packing_fee: PackingFee
    pindan_map: any[]
}

export interface DeliverFee {
    category_id: number
    name: string
    price: number
    quantity: number
}

export interface Group {
    name: string
    price: number
    quantity: number
    _id: string
    specs: string[]
    new_specs: any[]
    attrs: any[]
}

export interface PackingFee {
    category_id: number
    name: string
    quantity: number
    price: number
}

export interface StatusBar {
    title: string
    sub_title: string
    image_type: string
    color: string
}

export interface TimelineNode {
    actions: any[]
    in_processing: number
}

//endregion

//region 获取订单备注
export interface OrderRemarkType {
    remarks: string[][]
    __v: number
}
//endregion
