import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HYRequestConfig } from './types.ts'
/*
* 封装axios
* 1. 拦截器
*  > 全局拦截器
   > 实例拦截器
   > 单次请求拦截器
* 2. 请求封装
* */

class HyRequest {
    instance: AxiosInstance
    constructor(config: AxiosRequestConfig) {
        //创建新的axios实例
        this.instance = axios.create(config)

        //拦截器
        this.instance.interceptors.request.use(
            (config) => {
                console.log('全局拦截请求成功')
                return config
            },
            (err) => {
                console.log('全局拦截请求失败')
                return err
            },
        )
        this.instance.interceptors.response.use(
            (config) => {
                console.log('全局拦截响应成功')
                return config
            },
            (err) => {
                console.log('全局拦截响应失败')
                return err
            },
        )
    }

    //封装网络请求方法
    request<T = any>(config: HYRequestConfig<T>) {
        // 封装网络请求的方法
        // T => IHomeData
        // 单次请求的成功拦截处理
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors.requestSuccessFn(config)
        }

        // 返回Promise
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res: any) => {
                    // 单词响应的成功拦截处理
                    if (config.interceptors?.responseSuccessFn) {
                        res = config.interceptors.responseSuccessFn(res)
                    }
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: HYRequestConfig<T>) {
        return this.request({ ...config, method: 'GET' }).then((res: T) => {
            return res
        })
    }
    async post<T = any>(config: HYRequestConfig<T>) {
        const res: T = await this.request({ ...config, method: 'POST' })
        return res
    }
    delete<T = any>(config: HYRequestConfig<T>) {
        return this.request({ ...config, method: 'DELETE' })
    }
    patch<T = any>(config: HYRequestConfig<T>) {
        return this.request({ ...config, method: 'PATCH' })
    }
}

export default HyRequest
