import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/city/:id',
        component: () => import('@/views/search-school/index.vue'),
    },
    {
        path: '/takeaway/:geohash',
        name: 'takeaway',
        component: () => import('@/views/takeaway/index.vue'),
    },
    {
        path: '/detail_food/:id/:title',
        name: 'detail_food',
        component: () => import('@/views/more-restaurants/index.vue'),
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/index.vue'),
    },
    {
        path: '/orderlist',
        name: 'orderlist',
        component: () => import('@/views/orderlist/index.vue'),
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue'),
    },
    //用户页面
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
    },
    //账号详情页面
    {
        path: '/user/profile',
        name: 'profile',
        component: () => import('@/views/user/profile/index.vue'),
    },
    //服务中心
    {
        path: '/user/after_services',
        component: () =>
            import('@/views/user/children/after-services/index.vue'),
    },
    //服务详情
    {
        path: '/user/after_services/detail',
        component: () =>
            import(
                '@/views/user/children/after-services/children/services-detail.vue'
            ),
    },
    //修改用户名
    {
        path: '/user/changeUserName',
        component: () =>
            import('@/views/user/profile/change-username/index.vue'),
    },
    //编辑地址
    {
        path: '/user/edit-address',
        component: () =>
            import('@/views/user/profile/shipping-address/index.vue'),
    },
    //增加地址
    {
        path: '/user/add-address',
        component: () => import('@/views/user/profile/add-address/index.vue'),
    },
    //修改密码
    {
        path: '/user/change_password',
        component: () =>
            import('@/views/user/profile/change-password/index.vue'),
    },
    //我的余额
    {
        path: '/user/my_balance',
        component: () => import('@/views/user/children/my-balance/index.vue'),
    },
    //我的优惠
    {
        path: '/user/my_discount',
        component: () => import('@/views/user/children/my-discount/index.vue'),
    },
    //我的优惠-兑换红包
    {
        path: '/user/my_discount/trade_package',
        component: () =>
            import(
                '@/views/user/children/my-discount/children/children/trade-package.vue'
            ),
    },
    {
        path: '/user/my_discount/shangjia',
        component: () =>
            import('@/views/user/children/my-discount/children/shangjia.vue'),
    },
    //我的积分
    {
        path: '/user/my_integration',
        component: () =>
            import('@/views/user/children/my-integration/index.vue'),
    },
    //积分商城
    {
        path: '/user/integration_shop',
        component: () =>
            import('@/views/user/children/integration-shop/index.vue'),
    },
    //会员中心
    {
        path: '/user/member_card',
        component: () => import('@/views/user/member-card/index.vue'),
    },
    //会员描述
    {
        path: '/user/member_card/card_description',
        component: () =>
            import('@/views/user/member-card/children/card-description.vue'),
    },
    //兑换会员
    {
        path: '/user/member_card/exchange_member',
        component: () =>
            import('@/views/user/member-card/children/exchange-member.vue'),
    },
    {
        path: '/user/member_card/buy_memory',
        component: () =>
            import('@/views/user/member-card/children/buy-memory.vue'),
    },

    {
        path: '/deliveryShopDetail/:shop_id',
        component: () =>
            import('@/views/delivery-shop-detail/delivery-shop-detail.vue'),
    },
    {
        path: '/delivery/food_detail',
        component: () => import('@/views/food-detail/index.vue'),
    },
    {
        path: '/order/detail/:order_id',
        component: () => import('@/views/order-detail/index.vue'),
    },
    //支付页面
    {
        path: '/order/pay/:restaurant_id/:order_id',
        component: () => import('@/views/pay/index.vue'),
    },
    //选择收货地址
    {
        path: '/order/pay/address',
        component: () => import('@/views/pay/children/address.vue'),
    },
    //订单备注
    {
        path: '/order/pay/order_remark',
        component: () => import('@/views/pay/children/order-remark.vue'),
    },
    //开发票
    {
        path: '/order/pay/ticket',
        component: () => import('@/views/pay/children/order-ticket.vue'),
    },
]
