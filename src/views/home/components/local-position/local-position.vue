<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue'
import { getCity } from '@/apis/city.ts'
import { onMounted, ref } from 'vue'

const cityname = ref()
const id = ref<number>()
const getCityApi = async () => {
    const res: any = await getCity('guess')
    cityname.value = res?.name
    id.value = res?.id
}
onMounted(() => {
    getCityApi()
})
</script>

<template>
    <div class="local_city">
        <div class="top">
            <span>当前定位城市:</span>
            <span>定位不准确,请在城市列表中选择</span>
        </div>
        <router-link class="bottom" router-link :to="`/city/${id}`">
            <span>{{ cityname }}</span>
            <span>
                <el-icon><ArrowRightBold /></el-icon>
            </span>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.local_city {
    background-color: white;
    box-shadow: 0 0.4vw 0.4vw 0.1vw rgba(0, 0, 0, 0.2);
    .top {
        display: flex;
        justify-content: space-between;
        padding: 3vw 2vw;
        border-bottom: 0.5px solid rgba(115, 115, 115, 0.5);
        font-size: 3.4vw;
        a {
            &:last-child {
                font-size: 2.1vw;
                font-weight: 600;
                color: #666666;
            }
        }
    }
    .bottom {
        padding: 2vw 2vw;
        display: flex;
        justify-content: space-between;
        span {
            &:first-child {
                color: #ff692f;
            }
        }
    }
}
</style>
