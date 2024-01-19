import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore: any = defineStore(
    'orderStore',
    () => {
        const orderRemark = ref({})

        const setOrderRemark = (remark: any) => {
            orderRemark.value = remark
        }
        return {
            orderRemark,
            setOrderRemark,
        }
    },
    {
        persist: true,
    },
)

export default useOrderStore
