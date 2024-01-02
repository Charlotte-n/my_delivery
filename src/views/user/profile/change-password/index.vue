<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { getCode } from '@/apis/user.ts'
import { Code } from '@/apis/types/user.ts'
const back = () => {
    history.go(-1)
}
//获取验证码
//获取验证码
const codeInfo = ref<Code>({} as Code)
const getCodeApi = async () => {
    const res = await getCode()
    codeInfo.value = res
}
const form = reactive({
    username: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
    verify_code: '',
})
onMounted(() => {
    getCodeApi()
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
            <template #second>
                <span>重置密码</span>
            </template>
        </Header>
    </header>
    <main>
        <form class="form">
            <div class="form-item">
                <input type="text" placeholder="账号" v-model="form.username" />
            </div>
            <!--            <div class="username_warning" v-if="username_warning_show">-->
            <!--                请输入账号-->
            <!--            </div>-->
            <div class="password form-item">
                <input
                    type="password"
                    placeholder="旧密码"
                    ref="handlePassword"
                    v-model="form.oldpassword"
                />
            </div>
            <!--            <div class="password_warning" v-if="password_warning_show">-->
            <!--                请输入密码-->
            <!--            </div>-->
            <div class="password form-item">
                <input
                    type="password"
                    placeholder="请输入新密码"
                    ref="handlePassword"
                    v-model="form.new_password"
                />
            </div>
            <!--            <div class="password_warning" v-if="password_warning_show">-->
            <!--                请输入密码-->
            <!--            </div>-->
            <div class="password form-item">
                <input
                    type="password"
                    placeholder="请确认密码"
                    ref="handlePassword"
                    v-model="form.confirm_password"
                />
            </div>
            <!--            <div class="password_warning" v-if="password_warning_show">-->
            <!--                请输入密码-->
            <!--            </div>-->
            <div class="verify_code">
                <input
                    type="text"
                    placeholder="验证码"
                    v-model="form.varify_code"
                    maxlength="4"
                />
                <div class="code">
                    <div class="code_img">
                        <img :src="codeInfo.code" alt="" />
                    </div>
                    <div class="change_code">
                        <span>看不清</span>
                        <span @click="getCodeApi">换一张</span>
                    </div>
                </div>
            </div>
            <!--            <div class="code_warning" v-if="code_warning_show">请输入验证码</div>-->
        </form>
        <div class="change">
            <el-button>确定修改</el-button>
        </div>
    </main>
</template>

<style scoped lang="scss">
.form {
    background-color: white;
    margin-top: 3vw;
    .form-item {
        border-bottom: 1px solid #ccc;
    }
    .password {
        padding: 0 1vw 0 0;
        display: flex;
        align-items: center;
    }
    .verify_code {
        display: flex;
        align-items: center;
        input {
            width: 60%;
        }
        .code {
            display: flex;
            align-items: center;
            flex: 1;
            .code_img {
                margin-right: 2vw;
                width: 20vw;
                height: 10vw;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .change_code {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 2vw;
                span {
                    &:last-child {
                        margin-top: 1vw;
                        color: $themeColor;
                    }
                }
            }
        }
    }
}
input {
    width: 100%;
    border: 0;
    padding: 2vw 3vw;
    height: 10vw;
    outline: none;
}
.change {
    padding: 3vw;
    button {
        border: 0;
        color: white;
        width: 100%;
        height: 12vw;
        font-size: 4vw;
        background-color: $themeColor;
    }
}
.username_warning {
    padding: 0 3vw;
    color: red;
}
.password_warning {
    padding: 1vw 3vw;
    color: red;
}
.code_warning {
    padding: 0 3vw;
    color: red;
}
</style>
