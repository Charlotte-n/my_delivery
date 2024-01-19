import { defineStore } from 'pinia'
import { ref } from 'vue'

// 在Vue组件中使用Pinia存储时，重置存储可能导致组件不会更新。这是因为Vue在重置时无法检测到存储的更改。
// 要解决这个问题，可以在Pinia存储中添加一个状态，每次重置存储时更改该状态。这将触发Vue重新渲染组件并更新存储的值。
export const usePosition = defineStore(
    'position',
    () => {
        const longitude = ref('')
        const latitude = ref('')
        const geohash = ref('')
        const history = ref<string[]>([])

        //改变历史记录加上去重
        const changeHistory = (value: string) => {
            history.value.push(value as string)
            history.value = Array.from(new Set(history.value))
        }
        const reset = () => {
            history.value = []
        }
        return {
            longitude,
            latitude,
            geohash,
            history,
            changeHistory,
            reset,
        }
    },
    {
        persist: true,
    },
)
