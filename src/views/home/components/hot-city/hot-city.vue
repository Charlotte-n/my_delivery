<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCity } from '@/apis/city.ts'
import { hotCity } from '@/apis/types/city.ts'

const hotCity = ref<hotCity>([])
const getCityApi = async () => {
    const res = await getCity('hot')
    hotCity.value = res
}
onMounted(() => {
    getCityApi()
})
</script>

<template>
    <div class="hot_city">
        <div class="title">热门城市</div>
        <div class="hot_cities">
            <router-link
                v-for="item in hotCity"
                class="city"
                :key="item.id"
                :to="`/city/${item.id}`"
            >
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hot_city {
    background-color: white;
    box-shadow: 0 -0.2vw 0.4vw 0.5vw rgba(0, 0, 0, 0.2);

    .title {
        padding: 3vw 2vw;
        border-bottom: 0.5px solid rgba(115, 115, 115, 0.5);
        font-size: 3.4vw;
    }
    .hot_cities {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        a {
            color: $themeColor;
        }
        .city {
            padding: 3vw 2.45vw;
            width: 20%;
            border-right: 0.2px solid rgba(115, 115, 115, 0.3);
            border-bottom: 0.2px solid rgba(115, 115, 115, 0.3);
            text-align: center;
            &:nth-child(4) {
                border-right: 0;
            }
            &:nth-child(8) {
                border-right: 0;
            }
        }
    }
}
</style>
