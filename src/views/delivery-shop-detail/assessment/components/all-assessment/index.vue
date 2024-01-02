<script setup lang="ts">
import { AssessRatingType } from '@/apis/types/dekivery-home.ts'

const props = defineProps<{
    assessRating: AssessRatingType
}>()
</script>

<template>
    <div class="all-assess">
        <div class="left">
            <span>{{ props.assessRating.overall_score?.toFixed(2) }}</span>
            <span>综合评价</span>
            <span
                >高于周围商店{{
                    props.assessRating.compare_rating?.toFixed(2)
                }}%</span
            >
        </div>
        <div class="right">
            <div class="fuwu_assess">
                <span>服务态度</span>
                <span>星星代替</span>
                <span class="rate">{{
                    props.assessRating.service_score?.toFixed(2)
                }}</span>
            </div>
            <div class="menu_assess">
                <span>菜单评价</span>
                <span>星星代替</span>
                <span class="rate">{{
                    props.assessRating.food_score?.toFixed(2)
                }}</span>
            </div>
            <div class="arrive_time">
                <span> 送达时间 </span>
                <span class="rate">分钟</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.all-assess {
    padding: 3vw 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    .left {
        margin-right: 5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.2;
        span {
            &:first-child {
                display: inline-block;
                font-size: 7vw;
                color: $themeColor;
            }
            &:nth-child(2) {
                font-size: 4.5vw;
            }
            &:nth-child(3) {
                font-size: 0.3vw;
                scale: 0.9;
                color: #666666;
            }
        }
    }
    .right {
        font-size: 3.5vw;
        line-height: 1.5;
        div {
            span {
                margin-right: 2vw;
            }
            .rate {
                color: $themeColor;
            }
        }
    }
}
</style>
