<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const router = useRouter()
const userStore: any = useUserStore()
const userInfo = userStore.userInfo.detail_userinfo

const back = () => {
    history.go(-1)
}
const watchReturn = () => {
    console.log('监听到了')
}
onMounted(() => {
    backPhone(watchReturn)
})
onUnmounted(() => {
    cancelBack(watchReturn)
})
</script>

<template>
    <header class="header-v1">
        <Header>
            <template #first>
                <el-icon size="25" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second> <span>会员中心</span> </template>
        </Header>
    </header>
    <main>
        <!--        账户-->
        <h3>
            为账户<span>{{ userInfo.username }}</span
            >购买会员
        </h3>
        <!--        会员特权-->
        <div class="privileges">
            <header
                class="header_privileges"
                @click="router.push('/user/member_card/card_description')"
            >
                <span>会员特权</span>
                <span>会员说明</span>
                <el-icon size="15" color="#666666"
                    ><ArrowRightBold></ArrowRightBold
                ></el-icon>
            </header>
            <section>
                <ul>
                    <li>
                        <div class="privileges_left">
                            <svg
                                t="1703893664714"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2013"
                                width="200"
                                height="200"
                            >
                                <path
                                    d="M956.8 334.08c-8.96 0-16 7.04-16 16L940.8 723.2c0 17.28-8.96 33.28-24.32 41.6L544 977.92c-14.72 8.32-32.64 8.32-47.36 0L123.52 764.8c-14.72-8.32-24.32-24.32-24.32-41.6l0-424.96c0-17.28 8.96-33.28 24.32-41.6l372.48-213.12c14.72-8.32 32.64-8.32 47.36 0l334.72 191.36c7.68 4.48 17.28 1.92 21.76-5.76 4.48-7.68 1.92-17.28-5.76-21.76l-334.72-191.36c-24.32-14.08-55.04-14.08-79.36 0L107.52 228.48c-24.96 14.08-40.32 40.96-40.32 69.76L67.2 723.2c0 28.8 15.36 55.04 40.32 69.76L480 1005.44c12.16 7.04 26.24 10.24 39.68 10.24 13.44 0 27.52-3.2 39.68-10.24l373.12-213.12c24.96-14.08 40.32-40.96 40.32-69.76l0-372.48C972.8 341.76 965.76 334.08 956.8 334.08z"
                                    p-id="2014"
                                ></path>
                                <path
                                    d="M692.48 317.44 627.2 317.44c7.68 26.24 16.64 52.48 26.88 76.8l67.2 0C710.4 369.28 700.8 343.68 692.48 317.44z"
                                    p-id="2015"
                                ></path>
                                <path
                                    d="M727.68 403.84c-63.36 19.2-115.84 33.28-166.4 44.8l0-148.48-69.76 0L491.52 461.44c-54.4 8.96-111.36 14.72-181.76 19.2l0 33.92c22.4-0.64 44.8-2.56 65.28-3.84-10.24 5.12-17.28 15.36-17.28 26.88l0 166.4c0 17.28 14.08 30.08 30.72 30.08l292.48 0c17.28 0 30.72-13.44 30.72-30.08l0-166.4c0-17.28-14.08-30.72-30.72-30.72l-266.88 0c129.28-12.16 222.08-33.28 313.6-64L727.68 403.84zM427.52 551.04c0-9.6 8.32-17.28 17.28-17.28l179.84 0c9.6 0 17.28 7.68 17.28 17.28L641.92 576l-215.04 0L426.88 551.04zM427.52 601.6l215.04 0 0 38.4-215.04 0L427.52 601.6zM427.52 666.24l215.04 0L642.56 691.2c0 9.6-7.68 17.28-17.28 17.28l-179.84 0c-8.96 0-17.28-7.68-17.28-17.28L428.16 666.24z"
                                    p-id="2016"
                                ></path>
                                <path
                                    d="M369.28 317.44c-13.44 41.6-29.44 81.92-48 120.96l67.2 0c19.84-39.04 34.56-79.36 46.72-120.96L369.28 317.44z"
                                    p-id="2017"
                                ></path>
                            </svg>
                        </div>
                        <div class="privileges_right">
                            <div class="title">减免配送费</div>
                            <div class="detail_content">
                                每月减免30单,每日可减免3单,每单最高减4元
                            </div>
                            <div class="delivery">蜂鸟专送专享</div>
                        </div>
                    </li>
                    <li>
                        <div class="privileges_left">
                            <svg
                                t="1703893664714"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2013"
                                width="200"
                                height="200"
                            >
                                <path
                                    d="M956.8 334.08c-8.96 0-16 7.04-16 16L940.8 723.2c0 17.28-8.96 33.28-24.32 41.6L544 977.92c-14.72 8.32-32.64 8.32-47.36 0L123.52 764.8c-14.72-8.32-24.32-24.32-24.32-41.6l0-424.96c0-17.28 8.96-33.28 24.32-41.6l372.48-213.12c14.72-8.32 32.64-8.32 47.36 0l334.72 191.36c7.68 4.48 17.28 1.92 21.76-5.76 4.48-7.68 1.92-17.28-5.76-21.76l-334.72-191.36c-24.32-14.08-55.04-14.08-79.36 0L107.52 228.48c-24.96 14.08-40.32 40.96-40.32 69.76L67.2 723.2c0 28.8 15.36 55.04 40.32 69.76L480 1005.44c12.16 7.04 26.24 10.24 39.68 10.24 13.44 0 27.52-3.2 39.68-10.24l373.12-213.12c24.96-14.08 40.32-40.96 40.32-69.76l0-372.48C972.8 341.76 965.76 334.08 956.8 334.08z"
                                    p-id="2014"
                                ></path>
                                <path
                                    d="M692.48 317.44 627.2 317.44c7.68 26.24 16.64 52.48 26.88 76.8l67.2 0C710.4 369.28 700.8 343.68 692.48 317.44z"
                                    p-id="2015"
                                ></path>
                                <path
                                    d="M727.68 403.84c-63.36 19.2-115.84 33.28-166.4 44.8l0-148.48-69.76 0L491.52 461.44c-54.4 8.96-111.36 14.72-181.76 19.2l0 33.92c22.4-0.64 44.8-2.56 65.28-3.84-10.24 5.12-17.28 15.36-17.28 26.88l0 166.4c0 17.28 14.08 30.08 30.72 30.08l292.48 0c17.28 0 30.72-13.44 30.72-30.08l0-166.4c0-17.28-14.08-30.72-30.72-30.72l-266.88 0c129.28-12.16 222.08-33.28 313.6-64L727.68 403.84zM427.52 551.04c0-9.6 8.32-17.28 17.28-17.28l179.84 0c9.6 0 17.28 7.68 17.28 17.28L641.92 576l-215.04 0L426.88 551.04zM427.52 601.6l215.04 0 0 38.4-215.04 0L427.52 601.6zM427.52 666.24l215.04 0L642.56 691.2c0 9.6-7.68 17.28-17.28 17.28l-179.84 0c-8.96 0-17.28-7.68-17.28-17.28L428.16 666.24z"
                                    p-id="2016"
                                ></path>
                                <path
                                    d="M369.28 317.44c-13.44 41.6-29.44 81.92-48 120.96l67.2 0c19.84-39.04 34.56-79.36 46.72-120.96L369.28 317.44z"
                                    p-id="2017"
                                ></path>
                            </svg>
                        </div>
                        <div class="privileges_right">
                            <div class="title">减免配送费</div>
                            <div class="detail_content">
                                每月减免30单,每日可减免3单,每单最高减4元
                            </div>
                            <div class="delivery">蜂鸟专送专享</div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
        <!--        开通会员-->
        <div class="become_member">
            <header>开通会员</header>
            <section>
                <div class="left">
                    <span>一个月</span>
                    <span>￥20</span>
                </div>
                <div class="right">
                    <button>购买</button>
                </div>
            </section>
        </div>
        <!--        兑换会员-->
        <div
            class="exchange_member"
            @click="router.push('/user/member_card/exchange_member')"
        >
            <span>兑换会员</span>
            <span>使用卡号卡密</span>
            <span
                ><el-icon size="15"><ArrowRightBold></ArrowRightBold></el-icon
            ></span>
        </div>
        <!--        购买记录-->
        <div
            class="buy_memory"
            @click="router.push('/user/member_card/buy_memory')"
        >
            <span>购买记录</span>
            <span>开发票</span>
            <span
                ><el-icon size="15"><ArrowRightBold></ArrowRightBold></el-icon
            ></span>
        </div>
    </main>
</template>

<style scoped lang="scss">
.header-v1 {
    position: sticky;
    left: 0;
    top: 0;
}
main {
    //账户
    h3 {
        margin: 0;
        padding: 3vw 2vw;
        font-size: 3.6vw;
        font-weight: 400;
        color: #666666;
        span {
            padding: 0 1vw;
            font-weight: 600;
            color: black;
        }
    }
    //会员特权
    .privileges {
        padding: 3vw;
        background-color: white;
        .header_privileges {
            padding-bottom: 3vw;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(115, 115, 115, 0.1);
            span {
                &:first-child {
                    flex: 1;
                    font-size: 4vw;
                }
                &:nth-child(2) {
                    font-size: 3.8vw;
                    color: #666666;
                }
            }
        }
        section {
            ul {
                li {
                    padding: 3vw 0;
                    border-bottom: 1px solid rgba(115, 115, 115, 0.1);
                    display: flex;
                    font-size: 3.5vw;
                    line-height: 1.4;
                    &:last-child {
                        border-bottom: 0;
                    }
                }
            }
            .privileges_left {
                margin-right: 3vw;
                svg {
                    width: 10vw;
                    height: 10vw;
                    fill: $themeColor;
                }
            }
            .privileges_right {
                color: #666666;
                .title {
                    font-size: 4vw;
                    color: black;
                }
            }
        }
    }
    //开通会员
    .become_member {
        margin-top: 3vw;
        padding: 3vw;
        background-color: white;
        header {
            padding-bottom: 3vw;
            border-bottom: 1px solid rgba(115, 115, 115, 0.1);
        }
        section {
            margin-top: 4vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                span {
                    &:last-child {
                        color: $themeColor;
                    }
                }
            }
            .right {
                button {
                    border: 1px solid $themeColor;
                    border-radius: 1vw;
                    padding: 2vw 3.7vw;
                    font-size: 3.6vw;
                    color: $themeColor;
                    background-color: white;
                    outline: none;
                }
            }
        }
    }
    //兑换会员和购买记录
    .exchange_member,
    .buy_memory {
        margin-top: 3vw;
        padding: 3vw;
        display: flex;
        align-items: center;
        font-size: 4vw;
        background-color: white;
        span {
            &:first-child {
                flex: 1;
            }
            &:nth-child(2) {
                font-size: 3.6vw;
                color: #666666;
            }
            &:last-child {
                margin-left: 2vw;
                color: #666666;
            }
        }
    }
}
</style>
