import { defineStore } from 'pinia'

const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orderRemark: {},
    }),
    getter: {},
    actions: {
        setOrderRemark(remark) {
            this.orderRemark = remark
        },
    },
})

export default useOrderStore
