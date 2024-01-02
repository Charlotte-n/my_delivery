export interface CityResponse {
    config: any
    data: hotCity | letterCity | SingleCity
    headers: any
    request: any
    status: number
    statusText: string
}
export type hotCity = SingleCity[]
export interface letterCity {
    E: SingleCity[]
    A: SingleCity[]
    R: SingleCity[]
    M: SingleCity[]
    K: SingleCity[]
    D: SingleCity[]
    B: SingleCity[]
    Z: SingleCity[]
    L: SingleCity[]
    J: SingleCity[]
    P: SingleCity[]
    Y: SingleCity[]
    F: SingleCity[]
    C: SingleCity[]
    W: SingleCity[]
    Q: SingleCity[]
    T: SingleCity[]
    X: SingleCity[]
    G: SingleCity[]
    N: SingleCity[]
    H: SingleCity[]
    S: SingleCity[]
}

export interface SingleCity {
    pinyin: string
    is_map: boolean
    longitude: number
    latitude: number
    sort: number
    area_code: string
    abbr: string
    name: string
    id: number
}

//获取所选城市的详细定位
export interface DetailPosi {
    address: string
    city: string
    geohash: string
    latitude: string
    longitude: string
    name: string
}
