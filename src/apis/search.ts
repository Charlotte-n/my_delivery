import services from '@/axios'
import { SearchRestaurant } from '@/apis/types/search.ts'
import { ResponseType } from '@/apis/types/common.ts'

enum SearchUrl {
    SEARCH_RESTRAUNT = `/v4/restaurants`,
}

export interface Search_Restaurants_Param_Type {
    geohash: string
    keyword: string
}

/**
 * 搜索餐厅
 * @param params
 * @constructor
 */
export const SearchRestaurants = (params: Search_Restaurants_Param_Type) => {
    return services
        .get<ResponseType<SearchRestaurant>>({
            url: SearchUrl.SEARCH_RESTRAUNT,
            params: {
                keyword: params.keyword,
                geohash: params.geohash,
            },
        })
        .then((res) => {
            return res.data
        })
}
