<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFoodCategory } from '@/apis/delivery-home.ts'
import { foods } from '@/apis/types/dekivery-home.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const BannerData = ref<foods[]>()
const getBannerApi = async () => {
    const res = await getFoodCategory()
    const result = groupBy(res, 8)
    BannerData.value = result
}
//将数据进行分组
const groupBy = (arr: [], num: number) => {
    const result = []
    const group = Math.floor(arr.length / num)
    for (let i = 0; i < group; i++) {
        result.push(arr.slice(i * num, (i + 1) * num))
    }
    return result
}
const gotoDetail = (id: string, title: string) => {
    id = decode(id)
    router.push({ name: 'detail_food', params: { id, title } })
}
const decode = (url: string) => {
    let urlData = decodeURIComponent(
        url.split('=')[1].replace('&target_name', ''),
    )
    if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
    } else {
        return ''
    }
}
onMounted(() => {
    getBannerApi()
})
</script>

<template>
    <div class="banner">
        <el-carousel :autoplay="false" arrow="never" height="50vw">
            <el-carousel-item
                v-for="item in BannerData"
                :key="item as any"
                class="category"
            >
                <div
                    v-for="cate in item"
                    :key="cate.id"
                    class="food_cate"
                    @click="gotoDetail(cate.link, cate.title)"
                >
                    <img
                        :src="'https://fuss10.elemecdn.com' + cate.image_url"
                        alt=""
                    />
                    <div class="category_title">
                        {{ cate.title }}
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
.banner {
    background-color: white;
    border-bottom: 1px solid rgba(115, 115, 115, 0.3);
    height: 50vw;
}
:deep(.el-carousel__indicator.is-active button) {
    background-color: $themeColor;
    border-radius: 100%;
    height: 2vw;
    width: 2vw;
}
:deep(.el-carousel__button) {
    background-color: $themeColor;
    border-radius: 100%;
    height: 2vw;
    width: 2vw;
}
.banner {
    padding: 2vw 3vw;
    .category {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-content: center;
        .food_cate {
            text-align: center;
            img {
                width: 10vw;
                height: 10vw;
            }
            .category_title {
                margin-top: 2vw;
                width: 100%;
                font-size: 3.5vw;
            }
        }
    }
}
</style>
