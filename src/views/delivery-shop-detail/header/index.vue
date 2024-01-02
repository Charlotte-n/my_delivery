<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ShopDetailInfo } from '@/apis/types/dekivery-home.ts'
import { formate_img } from '@/utils/formate_img.ts'
const props = defineProps<{
    shopInfo: ShopDetailInfo
}>()
const gotoBack = () => {
    history.go(-1)
}
</script>

<template>
    <div class="header">
        <div class="top">
            <span class="back" @click="gotoBack">
                <el-icon><ArrowLeftBold /></el-icon>
            </span>
            <div class="main">
                <div class="img">
                    <img
                        :src="formate_img(props.shopInfo?.image_path)"
                        alt=""
                    />
                </div>
                <div class="shop_detail">
                    <span class="name"> {{ props.shopInfo?.name }} </span>
                    <span class="delivery_detail">
                        商家配送/分钟送达/{{
                            props.shopInfo?.piecewise_agent_fee.tips
                        }}
                    </span>
                    <span class="inform">
                        公告:欢迎光临,用餐高峰期请提前下单,谢谢
                    </span>
                </div>
            </div>
        </div>
        <div class="activity">
            <div class="act-left">
                {{ props.shopInfo?.activities[0]?.name }}
            </div>
            <div class="act-right">
                <span>{{ props.shopInfo?.activities?.length }}个活动</span>
                <span>&gt;</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    padding: 2vw 1vw;
    display: flex;
    flex-direction: column;
    .top {
        display: flex;
        .back {
            color: whitesmoke;
            font-size: 6vw;
            margin-right: 4vw;
        }
        .main {
            display: flex;
            .img {
                margin-right: 3vw;
                width: 15vw;
                height: 15vw;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .shop_detail {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                line-height: 1.5;
                color: white;
                font-size: 3.2vw;
                .name {
                    font-size: 4vw;
                }
                .delivery_detail {
                }
                .inform {
                }
            }
        }
    }
    .activity {
        display: flex;
        margin-top: 2vw;
        font-size: 3vw;
        .act-left {
            flex: 1;
        }
        .act-right {
            padding: 0 2vw;
        }
    }
}
.header::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 18vw;
    top: 0;
    left: 0;
    background: url(https://images.pexels.com/photos/2174974/pexels-photo-2174974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)
        center / cover no-repeat;
    filter: blur(3vw);
    z-index: -1;
}
</style>
