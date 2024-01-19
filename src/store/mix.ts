import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMixStore = defineStore('MixStore', () => {
    //设置全局的下滑刷新
    const pullUpRefresh = ref(false)
    const getMore = ref(false)

    //修改全局下滑的状态
    const changePullRefresh = () => {
        pullUpRefresh.value = true
    }
    const changePullRefreshFalse = () => {
        pullUpRefresh.value = false
    }
    const changeGetMore = () => {
        getMore.value = true
    }
    const changeGetMoreFalse = () => {
        getMore.value = false
    }
    return {
        pullUpRefresh,
        getMore,
        changePullRefresh,
        changePullRefreshFalse,
        changeGetMore,
        changeGetMoreFalse,
    }
})
