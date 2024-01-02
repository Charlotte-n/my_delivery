<script setup lang="ts">
//@ts-ignore
import { shopList } from '@/apis/types/dekivery-home.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    shopListInfo: shopList
}>()
const gotoShopDetail = () => {
    router.push('/deliveryShopDetail/' + props.shopListInfo.id)
}
</script>

<template>
    <div class="business" @click="gotoShopDetail">
        <div class="image">
            <img
                :src="
                    'https://elm.cangdu.org/img/' +
                    props.shopListInfo.image_path
                "
                alt=""
            />
        </div>
        <div class="desc">
            <div class="top">
                <div class="left">
                    <span>品牌</span>
                    <span class="text1-ellipsis">{{
                        props.shopListInfo.name
                    }}</span>
                </div>
                <div class="right">保准票</div>
            </div>
            <div class="middle">
                <section class="left">
                    <span>星星代替</span>
                    <span>月售{{ props.shopListInfo.recent_order_num }}单</span>
                </section>
                <section class="right">
                    <span>蜂鸟专送</span>
                    <span>准时送</span>
                </section>
            </div>
            <div class="bottom">
                <div class="left">
                    <span>
                        ￥{{
                            props.shopListInfo.float_minimum_order_amount
                        }}起送 / 配送费约￥{{
                            props.shopListInfo.float_delivery_fee
                        }}
                    </span>
                </div>
                <div>
                    <span>{{ props.shopListInfo.distance }} / </span>
                    <span>{{ props.shopListInfo.order_lead_time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.business {
    padding: 2vw 3vw;
    border-bottom: 1px solid rgba(115, 115, 115, 0.1);
    background-color: white;
    display: flex;
    .image {
        width: 15vw;
        height: 15vw;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .desc {
        flex: 1;
        margin-left: 3vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
            display: flex;
            width: 100%;
            justify-content: space-between;
            .left {
                display: flex;
                align-items: flex-end;
                span {
                    &:first-child {
                        margin-right: 1vw;
                        padding: 0.1vw 0.8vw;
                        font-size: 3vw;
                        color: whitesmoke;
                        background-color: $themeColor;
                    }
                    &:last-child {
                        display: inline-block;
                        font-size: 4vw;
                        width: 40vw;
                    }
                }
            }
            .right {
                font-size: 1vw;
                color: #666666;
            }
        }
        .middle {
            display: flex;
            justify-content: space-between;
            .left {
                span {
                    display: inline-block;
                    font-size: 3vw;
                    transform: scale(0.95);
                }
            }
            .right {
                span {
                    display: inline-block;
                    font-size: 1vw;
                    transform: scale(0.9);
                    &:first-child {
                        padding: 0.1vw 0.5vw;
                        border-radius: 1vw;
                        color: white;
                        background-color: $themeColor;
                    }
                }
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            > .left {
                span {
                    color: black !important;
                }
            }

            span {
                display: inline-block;
                font-size: 3vw;
                transform: scale(0.95);
                &:first-child {
                    color: #666666;
                }
                &:last-child {
                    color: $themeColor;
                }
            }
        }
    }
}
</style>
