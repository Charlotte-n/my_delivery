import services from '@/axios'
import {
    addAddressType,
    AddressListType,
    Code,
    RedPacketsType,
    UserInfo,
    UserLogin,
} from '@/apis/types/user.ts'
import { ResponseType } from '@/apis/types/common.ts'

enum UserUrl {
    CODE = '/v1/captchas',
    USER_LOGIN = '/v2/login',
    USER_INFO = '/v1/user',
    SERVICES = '/v3/profile/explain',
}

/**
 * 获取验证码
 */
export const getCode = () => {
    return services
        .post<ResponseType<Code>>({
            url: UserUrl.CODE,
        })
        .then((res) => {
            return res.data
        })
}

export interface loginParam {
    username: string
    password: string
    captcha_code: string
}

/**
 * 用户登录
 * @param loginParam
 */
export const getLogin = (loginParam: loginParam) => {
    return services.post<ResponseType<UserLogin>>({
        url: UserUrl.USER_LOGIN,
        data: {
            loginParam,
        },
    })
}

/**
 * 获取用户信息
 * @param user_id
 */
export const getUserInfo = (user_id: string | number) => {
    return services
        .get<ResponseType<UserInfo>>({
            url: UserUrl.USER_INFO,
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
            params: {
                user_id,
            },
        })
        .then((res) => res.data)
}

/**
 * 获取收货地址列表
 * @param user_id
 */
export const getAddressList = (user_id: string | number) => {
    return services
        .get<ResponseType<AddressListType>>({
            url: `/v1/users/${user_id}/addresses`,
        })
        .then((res) => res.data)
}

interface addAddressParamType {
    user_id: string | number
    address: string
    address_detail: string
    geohash: string
    name: string
    phone: number
    tag: string
    sex: number
    phone_bk: string
    tag_type: number
}

/**
 * 增加收货地址
 * @param addAddressParam
 */
export const addAddressApi = (addAddressParam: addAddressParamType) => {
    return services
        .post<ResponseType<addAddressType>>({
            url: `/v1/users/${addAddressParam.user_id}/addresses`,
            params: addAddressParam,
        })
        .then((res) => res.data)
}

/**
 * 删除收货地址
 * @param user_id
 * @param address_id
 */
export const deleteAddress = (
    user_id: string | number,
    address_id: string | number,
) => {
    return services
        .delete<ResponseType<addAddressType>>({
            url: `/v1/users/${user_id}/addresses/${address_id}`,
        })
        .then((res) => res.data)
}

/**
 * 获取服务中心信息
 */
export const getServices = () => {
    return services
        .get<ResponseType<any>>({
            url: UserUrl.SERVICES,
        })
        .then((res) => res.data)
}

/**
 * 获取可用红包
 * @param user_id
 * @param limit
 * @param offset
 */
export const getCanUseRedPacket = (
    user_id: string | number,
    limit: number,
    offset: number,
) => {
    return services
        .get<ResponseType<RedPacketsType>>({
            url: `/promotion/v2/users/${user_id}/hongbaos`,
            params: {
                limit,
                offset,
            },
        })
        .then((res) => res.data)
}
export interface tradePackageParamType {
    exchange_code: number
    captcha_code: number
}

/**
 * 获取红包
 * @param user_id
 * @param Param
 */
export const tradeRedPackage = (
    user_id: string | number,
    Param: tradePackageParamType,
) => {
    return services
        .post<ResponseType<any>>({
            url: `/v1/users/${user_id}/hongbao/exchange`,
            params: Param,
        })
        .then((res) => res.data)
}
