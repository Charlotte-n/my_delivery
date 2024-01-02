<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { getCode, tradeRedPackage } from '@/apis/user.ts'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user.ts'

const userStore = useUserStore()
const back = () => {
    history.go(-1)
}
//获取验证码
const codePath = ref()
const getVerifyCode = async () => {
    codePath.value = (await getCode()).code
}
//兑换红包
const tradePackage = ref()
const verifyCode = ref()
const Params = ref({
    exchange_code: '',
    captcha_code: '',
})
const tradePackageApi = async () => {
    //进行一下校验
    await tradeRedPackage(userStore.userInfo.user_id, Params.value)
}
onMounted(() => {
    getVerifyCode()
})
</script>

<template>
    <header>
        <Header>
            <template #first>
                <el-icon size="25" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second>兑换红包</template>
        </Header>
    </header>
    <main>
        <div class="trade_code">
            <input
                type="text"
                placeholder="请输入兑换码"
                v-model="tradePackage"
            />
        </div>
        <div class="verify_code">
            <input type="text" placeholder="验证码" v-model="verifyCode" />
            <div class="code">
                <span class="img">
                    <img :src="codePath" alt="" />
                </span>
                <span class="change">
                    <span>看不清</span>
                    <span @click="getVerifyCode">换一张</span>
                </span>
            </div>
        </div>
        <button @click="tradePackageApi">兑换</button>
    </main>
</template>

<style scoped lang="scss">
main {
    padding: 3vw;
    display: flex;
    flex-direction: column;
    .trade_code {
        input {
            border-radius: 2vw;
            padding-left: 2vw;
            border: 0;
            outline: none;
            background-color: white;
            width: 100%;
            height: 13vw;
        }
    }
    .verify_code {
        margin-top: 4vw;
        display: flex;
        input {
            padding-left: 2vw;
            border-radius: 2vw;
            border: 0;
            outline: none;
            background-color: white;
            width: 60%;
            height: 13vw;
        }
        .code {
            flex: 1;
            margin-left: 3vw;
            display: flex;
            align-items: center;
            font-size: 2vw;
            background-color: white;
            .img {
                display: inline-block;
                width: 20vw;
                height: 13vw;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .change {
                display: flex;
                flex-direction: column;
                line-height: 1.5;
                span {
                    &:last-child {
                        color: $themeColor;
                    }
                }
            }
        }
    }
    button {
        border: 0;
        border-radius: 2vw;
        margin-top: 5vw;
        font-size: 5vw;
        color: white;
        background-color: #cccccc;
        width: 100%;
        height: 13vw;
    }
}
</style>
