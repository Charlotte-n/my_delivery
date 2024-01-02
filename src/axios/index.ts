import HyRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const services = new HyRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestSuccessFn: (config) => {
            console.log('爱彼迎的请求成功的拦截')
            return config
        },
        requestFailureFn: (err) => {
            console.log('爱彼迎的请求失败的拦截')
            return err
        },
        responseSuccessFn: (res) => {
            console.log('爱彼迎的响应成功的拦截')
            return res
        },
        responseFailureFn: (err) => {
            console.log('爱彼迎的响应失败的拦截')
            return err
        },
    },
})

export default services
