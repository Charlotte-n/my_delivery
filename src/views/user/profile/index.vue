<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import {
    ArrowLeftBold,
    ArrowRightBold,
    Iphone,
    WarningFilled,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import { UserInfo } from '@/apis/types/user.ts'
import { formate_img } from '@/utils/formate_img.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const userStore: any = useUserStore()
const userInfo: UserInfo = userStore.userInfo.detail_userinfo
const router = useRouter()
const back = () => {
    history.go(-1)
}
//跳转到改变用户名
const ChangeUsername = () => {
    router.push({ path: '/user/changeUserName' })
}
//跳转到收货地址
const EditAddress = () => {
    router.push({ path: '/user/edit-address' })
}
//手机
const dialogVisible = ref(false)
const showApp = () => {
    dialogVisible.value = true
}
</script>

<template>
    <header>
        <Header>
            <template #first>
                <el-icon size="20" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second>
                <span>账号信息</span>
            </template>
        </Header>
    </header>
    <main>
        <div class="detail_info">
            <ul>
                <li>
                    <span>头像</span>
                    <span class="img">
                        <img :src="formate_img(userInfo.avatar)" alt="" />
                    </span>
                    <span>
                        <el-icon size="20" color="#666666"
                            ><ArrowRightBold></ArrowRightBold
                        ></el-icon>
                    </span>
                </li>
                <li>
                    <span @click="ChangeUsername">用户名</span>
                    <span class="username">{{ userInfo.username }}</span>
                    <span>
                        <el-icon size="20" color="#666666"
                            ><ArrowRightBold></ArrowRightBold
                        ></el-icon>
                    </span>
                </li>
                <li @click="EditAddress">
                    <span>收货地址</span>
                    <span
                        ><el-icon size="20" color="#666666"
                            ><ArrowRightBold></ArrowRightBold></el-icon
                    ></span>
                </li>
            </ul>
        </div>
        <div class="account_bind">
            <p>账号绑定</p>
            <ul>
                <li @click="showApp">
                    <span
                        ><el-icon size="20"><Iphone /></el-icon
                    ></span>
                    <span>手机</span>
                    <span>
                        <el-icon size="20" color="#666666"
                            ><ArrowRightBold></ArrowRightBold
                        ></el-icon>
                    </span>
                </li>
            </ul>
        </div>
        <div class="safe">
            <p>安全设置</p>
            <ul>
                <li @click="router.push('/user/change_password')">
                    <span class="login_password">登录密码</span>
                    <span class="change">修改</span>
                    <span>
                        <el-icon size="20" color="#666666"
                            ><ArrowRightBold></ArrowRightBold
                        ></el-icon>
                    </span>
                </li>
            </ul>
        </div>
        <div class="logout">
            <button>退出登录</button>
        </div>
    </main>
    <el-dialog v-model="dialogVisible" width="80%">
        <div class="dialog">
            <el-icon size="50" color="red"><WarningFilled /></el-icon>
            <span>请在手机端进行使用</span>
        </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.detail_info {
    margin-top: 3vw;
    background-color: white;
    ul {
        border-top: 1px solid rgba(115, 115, 115, 0.3);
        border-bottom: 1px solid rgba(115, 115, 115, 0.3);
        li {
            padding: 3vw;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(115, 115, 115, 0.3);
            font-size: 3.6vw;
            span {
                &:first-child {
                    flex: 1;

                    font-weight: 580;
                }
            }
            &:first-child {
                .img {
                    width: 10vw;
                    height: 10vw;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            &:nth-child(2) {
                span {
                    &:nth-child(2) {
                        font-size: 3.8vw;
                        color: #666666;
                    }
                }
            }
            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
.account_bind,
.safe {
    font-size: 2vw;
    p {
        padding: 1.7vw;
    }
    ul {
        li {
            padding: 2vw;
            display: flex;
            align-items: center;
            background-color: white;
            font-size: 3.6vw;
        }
    }
}
.account_bind {
    ul {
        li {
            span {
                &:first-child {
                    .el-icon {
                        color: $themeColor;
                    }
                }
                &:nth-child(2) {
                    flex: 1;
                    font-weight: 580;
                }
            }
        }
    }
}
.safe {
    .login_password {
        flex: 1;
        font-weight: 580;
    }
    .change {
        color: #888888;
    }
}
.logout {
    margin-top: 8vw;
    width: 100%;
    text-align: center;
    font-size: 4vw;
    button {
        padding: 2vw 0;
        border-radius: 1.3vw;
        border: 0;
        background-color: $themeColor;
        color: white;
        width: 95%;
    }
}
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
