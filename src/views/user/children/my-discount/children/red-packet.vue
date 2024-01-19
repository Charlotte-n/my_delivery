<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCanUseRedPacket } from '@/apis/user.ts'
import { useUserStore } from '@/store/user.ts'
import { RedPacketsType } from '@/apis/types/user.ts'
import { useRouter } from 'vue-router'

const userStore: any = useUserStore()
const redPackages = ref<RedPacketsType>([] as RedPacketsType)
const router = useRouter()
const getCanUseRedPacketApi = async () => {
    redPackages.value = await getCanUseRedPacket(
        userStore.userInfo.user_id,
        20,
        0,
    )
}
onMounted(() => {
    getCanUseRedPacketApi()
})
</script>

<template>
    <div class="header">
        <span>有3个红包即将到期</span>
        <span></span>
        <span>红包说明</span>
    </div>
    <main>
        <ul class="red_packages">
            <li class="red_package" v-for="item in redPackages">
                <div class="top">
                    <div class="left">
                        <span>
                            <span>￥</span>
                            <span>{{ item.amount.toFixed(1) }}</span>
                        </span>
                        <span> {{ item.description_map.sum_condition }} </span>
                    </div>
                    <div class="middle">
                        <span class="share_package">分享红包</span>
                        <span>{{ item.end_date }}到期</span>
                        <span>
                            <span>
                                {{ item.description_map.phone }}
                            </span>
                        </span>
                    </div>
                    <div class="right">
                        {{ item.description_map.validity_delta }}
                    </div>
                </div>
                <div
                    class="bottom"
                    v-if="item.limit_map?.restaurant_flavor_ids"
                >
                    <span> {{ item.limit_map?.restaurant_flavor_ids }} </span>
                </div>
            </li>
        </ul>
        <div class="history">查看历史红包 ></div>
    </main>
    <footer>
        <div
            class="trade"
            @click="router.push('/user/my_discount/trade_package')"
        >
            兑换红包
        </div>
        <div
            class="recommend"
            @click="router.push({ path: '/user/my_discount/shangjia' })"
        >
            推荐有奖
        </div>
    </footer>
</template>

<style scoped lang="scss">
main {
    padding: 4vw;
    //红包
    .red_packages {
        .red_package {
            margin-bottom: 4vw;
            .top {
                border-radius: 2vw;
                padding: 5vw;
                border-top: 1.4vw solid $themeColor;
                display: flex;
                font-size: 2vw;
                background-color: white;
                line-height: 1.5;
            }
            .left {
                display: flex;
                padding-right: 2vw;
                flex-direction: column;
                border-right: 1px solid rgba(115, 115, 115, 0.2);
                span {
                    &:first-child {
                        span {
                            color: #ff5340;
                            &:first-child {
                                font-size: 3.8vw;
                                font-weight: 600;
                            }
                            &:nth-child(2) {
                                font-size: 4.8vw;
                                font-weight: 600;
                                display: inline-block;
                                &::first-letter {
                                    font-size: 8vw;
                                    font-weight: 400;
                                }
                            }
                        }
                    }
                    &:last-child {
                        color: #666666;
                    }
                }
            }
            .middle {
                flex: 7;
                padding: 0 5vw;
                display: flex;
                flex-direction: column;
                span {
                    color: #666666;
                    &:last-child {
                        display: flex;
                        font-size: 2vw;
                        flex-wrap: nowrap;
                    }
                }
                .share_package {
                    font-size: 5vw;
                }
            }
            .right {
                font-size: 5vw;
                color: $themeColor;
            }
        }
        .bottom {
            padding: 3vw;
            font-size: 2vw;
            color: #666666;
            background-color: #f9f9f9;
        }
    }
    .history {
        text-align: center;
        color: #666666;
        font-size: 3.5vw;
    }
}
.header {
    padding: 4vw;
    display: flex;
    font-size: 2.6vw;
    span {
        &:first-child {
            flex: 1;
        }
        &:nth-child(2) {
        }
        &:last-child {
            color: $themeColor;
        }
    }
}
footer {
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
    text-align: center;
    background-color: white;
    box-shadow: 1vw 1vw 1vw 1vw rgba(115, 115, 115, 0.3);
    .trade {
        padding: 4vw;
        border-right: 1px solid rgba(115, 115, 115, 0.2);
        flex: 1;
    }
    .recommend {
        padding: 4vw;
        flex: 1;
    }
}
</style>
