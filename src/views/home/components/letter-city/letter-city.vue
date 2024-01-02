<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getCity } from '@/apis/city.ts'
import { letterCity, SingleCity } from '@/apis/types/city.ts'

const letterCity = ref<letterCity>({} as letterCity)
const getCityApi = async () => {
    const res = await getCity('group')
    const result = sortData(res)
    letterCity.value = result
}
//将获取的数据进行排序
const sortData = (sortObj) => {
    let sortobj = {}
    for (let i = 65; i <= 90; i++) {
        if (sortObj[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = sortObj[String.fromCharCode(i)]
        }
    }
    return sortobj
}
onMounted(() => {
    getCityApi()
})
</script>

<template>
    <div
        class="letter_city"
        v-for="(value, key, index) in letterCity"
        :key="key"
    >
        <div class="letter">{{ key }}</div>
        <div class="cities">
            <router-link
                v-for="item1 in value"
                :key="item1.id"
                class="city text1-ellipsis"
                :to="`/city/${item1.id}`"
                >{{ item1.name }}</router-link
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.letter_city {
    margin-top: 2vh;
    box-shadow: 0 -0.2vw 0.4vw 0.5vw rgba(0, 0, 0, 0.2);
    background-color: white;
    .letter {
        padding: 3vw 2vw;
        border-bottom: 0.5px solid rgba(115, 115, 115, 0.5);
    }
    .cities {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        text-align: center;

        .city {
            padding: 3vw 2vw;
            border-right: 1px solid rgba(115, 115, 115, 0.3);
            border-bottom: 1px solid rgba(115, 115, 115, 0.3);
            &:nth-child(4n) {
                border-right: 0;
            }
        }
    }
}
</style>
