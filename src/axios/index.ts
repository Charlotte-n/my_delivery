import HyRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const services = new HyRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export default services
