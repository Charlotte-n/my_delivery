import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orderRemark: null,
    }),
    actions: {
        setOrderRemark(remark) {
            this.orderRemark = remark
        },
    },
})

export default useOrderStore
