<script setup lang="ts">
import AllAssessment from './components/all-assessment/index.vue'
import DetailAssessment from './components/detail-assessment/index.vue'
import { GetAssessCate, GetAssessRating } from '@/apis/delivery-home.ts'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { AssessRatingType, RateCateType } from '@/apis/types/dekivery-home.ts'
const route = useRoute()
const props = defineProps<{
    handleAssess: (name: string) => void
}>()
//#region获取评论分数
const assessRating = ref<AssessRatingType>({} as AssessRatingType)
const GetAssessRatingApi = async () => {
    assessRating.value = await GetAssessRating(route.params.shop_id as string)
}
//endregion
//#region 获取评价分类
const AccessCate = ref<RateCateType>([] as RateCateType)
const GetAssessCateApi = async () => {
    AccessCate.value = await GetAssessCate(route.params.shop_id as string)
}
//endregion
const detailAssessment = ref()

onMounted(() => {
    GetAssessRatingApi()
    GetAssessCateApi()
})
</script>

<template>
    <AllAssessment :assessRating="assessRating"></AllAssessment>
    <DetailAssessment
        :AccessCate="AccessCate"
        ref="detailAssessment"
        :handleAssess="props.handleAssess"
    ></DetailAssessment>
</template>

<style scoped lang="scss"></style>
