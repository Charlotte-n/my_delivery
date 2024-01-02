<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import {
    ArrowLeftBold,
    ArrowRightBold,
    ShoppingBag,
    Sunny,
    ElemeFilled,
    Avatar,
    WarningFilled,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { usePosition } from '@/store/position.ts'
import { Tickets } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import { UserInfo } from '@/apis/types/user.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { ref } from 'vue'

const router = useRouter()
const store = usePosition()
const userStore: any = useUserStore()
const userInfo: UserInfo = userStore.userInfo.detail_userinfo
const gotoHome = () => {
    router.push({ path: '/takeaway/' + store.geohash })
}
//账号详情信息页面
const gotoProfileDetail = () => {
    router.push('/user/profile')
}
//去我的订单
const gotoOrder = () => {
    router.push('/orderlist')
}

const dialogVisible = ref(false)
const downloadApp = () => {
    dialogVisible.value = true
}
</script>

<template>
    <Header>
        <template #first>
            <el-icon size="25" @click="gotoHome"
                ><ArrowLeftBold></ArrowLeftBold
            ></el-icon>
        </template>
        <template #second>我的</template>
    </Header>
    <div class="user" @click="gotoProfileDetail">
        <div class="image">
            <img :src="formate_img(userInfo.avatar)" alt="" />
        </div>
        <div class="userinfo">
            <span>{{ userInfo.username }}</span>
            <span>{{
                userInfo.is_mobile_valid ? '绑定了手机号' : '暂无绑定的手机号'
            }}</span>
        </div>
        <span class="right">
            <el-icon size="20"><ArrowRightBold></ArrowRightBold></el-icon>
        </span>
    </div>
    <div class="discount">
        <ul>
            <li class="money" @click="router.push('/user/my_balance')">
                <div class="money_number">
                    {{ userInfo.balance.toFixed(2) }} <span> 元 </span>
                </div>
                <div>我的余额</div>
            </li>
            <li class="discount_card" @click="router.push('/user/my_discount')">
                <div class="card_num">
                    {{ userInfo.gift_amount }}
                    <span>个</span>
                </div>
                <div>我的优惠</div>
            </li>
            <li class="integral" @click="router.push('/user/my_integration')">
                <div class="integral_num">
                    {{ userInfo.is_active }} <span>分</span>
                </div>
                <div>我的积分</div>
            </li>
        </ul>
    </div>
    <div class="list_one">
        <ul>
            <li @click="gotoOrder">
                <div class="left">
                    <span
                        ><el-icon size="25"><Tickets /></el-icon
                    ></span>
                    <span>我的订单</span>
                </div>
                <span class="icon">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                </span>
            </li>
            <li @click="router.push('/user/integration_shop')">
                <div class="left">
                    <span
                        ><el-icon size="25" color="#FC7B53"
                            ><ShoppingBag /></el-icon
                    ></span>
                    <span>积分商城</span>
                </div>
                <span class="icon">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                </span>
            </li>
            <li @click="router.push('/user/member_card')">
                <div class="left">
                    <span
                        ><el-icon size="25" color="#FFC636"><Sunny /></el-icon
                    ></span>
                    <span>饿了么会员卡</span>
                </div>
                <span class="icon">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                </span>
            </li>
        </ul>
    </div>
    <div class="list_one">
        <ul>
            <li @click="router.push('/user/after_services')">
                <div class="left">
                    <span>
                        <el-icon size="25" color="#3CABFF">
                            <Avatar></Avatar>
                        </el-icon>
                    </span>
                    <span>服务中心</span>
                </div>
                <span class="icon">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                </span>
            </li>
            <li @click="downloadApp">
                <div class="left">
                    <span>
                        <el-icon size="25" color="#3CABFF"
                            ><ElemeFilled /></el-icon
                    ></span>
                    <span>下载饿了么App</span>
                </div>
                <span class="icon">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                </span>
            </li>
        </ul>
    </div>
    <el-dialog v-model="dialogVisible" width="80%">
        <div class="dialog">
            <el-icon size="50" color="red"><WarningFilled /></el-icon>
            <span>请在手机端进行使用</span>
        </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.user {
    padding: 5vw 3vw;
    display: flex;
    align-items: center;
    color: whitesmoke;
    background-color: $themeColor;
    .image {
        margin-right: 2vw;
        width: 15vw;
        height: 15vw;
        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
    }
    .userinfo {
        display: flex;
        flex-direction: column;
        flex: 1;
        span {
            &:first-child {
                font-size: 5vw;
            }
            &:last-child {
                margin-top: 3vw;
                font-size: 3.5vw;
            }
        }
    }
}
.discount {
    ul {
        padding: 0;
        margin: 0;
        display: flex;
        background-color: white;
        li {
            padding: 8vw 0 3vw 0;
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(115, 115, 115, 0.2);
            .money_number {
                color: $themeColor;
            }
            .card_num {
                color: red;
            }
            .integral_num {
                color: #6ac20b;
            }
            div {
                &:first-child {
                    margin-bottom: 2vw;
                    font-size: 6vw;
                    span {
                        font-size: 3vw;
                        color: black;
                    }
                }
                &:last-child {
                    color: rgba(115, 115, 115, 1);
                    font-size: 3.6vw;
                }
            }
        }
    }
}
.list_one {
    margin-top: 3vw;
    ul {
        padding: 0;
        margin: 0;
        background-color: white;
        li {
            padding: 3vw;
            display: flex;
            align-items: center;
            font-size: 4vw;
            border-bottom: 1px solid rgba(115, 115, 115, 0.3);
            span {
                &:first-child {
                    margin-right: 2vw;
                }
            }
            .left {
                display: flex;
                align-items: center;
            }
            .icon {
                display: inline-block;
                flex: 1;
                text-align: right;
            }
        }
    }
}
//弹窗
.dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-icon {
        margin-bottom: 5vw;
    }
    span {
        font-size: 5vw;
    }
}
</style>
