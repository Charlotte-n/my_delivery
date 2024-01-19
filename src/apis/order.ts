import services from '@/axios'
import {
    OrderDetailType,
    OrderList,
    OrderRemarkType,
} from '@/apis/types/order.ts'
import { ResponseType } from '@/apis/types/common.ts'
enum OrderUrl {
    ORDERLIST = '/bos/orders',
}

/**
 * 获取订单列表
 * @param params
 */
export const getOrderList = (params: { limit: number; offset: number }) => {
    return services
        .get<ResponseType<OrderList>>({
            url: OrderUrl.ORDERLIST,
            params: params,
        })
        .then((res) => res.data)
}

/**
 * 获取订单详情
 * @param user_id
 * @param order_id
 */
export const getOrderDetail = (
    user_id: string | number,
    order_id: string | number,
) => {
    return services
        .get<ResponseType<OrderDetailType>>({
            url: `/bos/v1/users/${user_id}/orders/${order_id}/snapshot`,
        })
        .then((res) => res.data)
}

/**
 * 获取订单备注
 * @param cart_id
 */
export const getOrderRemark = (cart_id: string | number) => {
    return services
        .get<ResponseType<OrderRemarkType>>({
            url: `/v1/carts/${cart_id}/remarks`,
        })
        .then((res) => res.data)
}
