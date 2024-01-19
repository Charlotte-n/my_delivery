import services from '@/axios'
import { CityResponse, DetailPosi, SingleCity } from '@/apis/types/city.ts'
import { ResponseType } from '@/apis/types/common.ts'
import { RouteParamValue } from 'vue-router'
enum BaseRequestUrl {
    GET_CITY = '/v1/cities',
    GET_SELECTED_CITY_INFO = '/v1/cities',
    SEARCH_ADDRESS = '/v1/pois',
    GET_DETAIL_POSI = '/v2/pois',
}

/**
 * 获取城市信息
 * @param type
 */
export const getCity = (type: string) => {
    return services
        .get<CityResponse>({
            url: BaseRequestUrl.GET_CITY + `?type=${type}`,
        })
        .then((res) => {
            return res.data
        })
}
/**
 * 获取所选城市的信息
 * @param id
 */
export const getSelectedCityInfo = (id: string | RouteParamValue[]) => {
    return services
        .get<ResponseType<SingleCity>>({
            url: BaseRequestUrl.GET_SELECTED_CITY_INFO + '/' + id,
        })
        .then((res) => {
            return res.data
        })
}
/**
 * 搜索地址
 * @param city_id
 * @param keyword
 */
export const searchAddress = (city_id: number, keyword: string) => {
    return services
        .get<ResponseType<SingleCity[]>>({
            url: BaseRequestUrl.SEARCH_ADDRESS,
            params: {
                city_id,
                keyword,
            },
        })
        .then((res) => {
            return res.data
        })
}

/**
 * 获取具体
 * @param geohash
 */
export const getdetailPosi = (geohash: string) => {
    return services
        .get<ResponseType<DetailPosi>>({
            url: BaseRequestUrl.GET_DETAIL_POSI + '/' + geohash,
        })
        .then((res) => {
            return res.data
        })
}
