<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { Code } from '@/apis/types/user.ts'
import { getCode, getLogin } from '@/apis/user.ts'
import type { loginParam } from '@/apis/user.ts'
import { ElMessage } from 'element-plus'
const showPassword = ref(false)
const handlePassword = ref()
//密码的是否显示
const handleChange = () => {
    console.log(showPassword.value)
    if (showPassword.value) {
        handlePassword.value.type = 'text'
        return
    }
    handlePassword.value.type = 'password'
}
//回退
const back = () => {
    history.go(-1)
}
//获取验证码
const codeInfo = ref<Code>({} as Code)
const getCodeApi = async () => {
    const res = await getCode()
    codeInfo.value = res
}
//用户登录校验
const form = ref<loginParam>({
    username: '',
    password: '',
    captcha_code: '',
})
const username_warning_show = ref(false)
const password_warning_show = ref(false)
const code_warning_show = ref(false)
const flag = ref(0)

const verify = () => {
    if (form.value.username === '') {
        username_warning_show.value = true
        flag.value = 1
    }
    if (form.value.password === '') {
        password_warning_show.value = true
        flag.value = 1
    }
    if (form.value.captcha_code === '') {
        code_warning_show.value = true
        flag.value = 1
    }
}
const handleLogin = async () => {
    //校验
    verify()
    if (flag.value === 1) return
    //进行登录
    try {
        const res = await getLogin(form.value)
        if (res.status == 0) {
            //登录成功，就进入上一页面，储存用户信息在pinia中
            console.log(res.data)
        }
        console.log(res.data)
    } catch (e) {
        ElMessage({
            message: '登录失败',
            type: 'error',
        })
    }
}

onMounted(() => {
    getCodeApi()
})
</script>

<template>
    <Header>
        <template #first>
            <el-icon size="20" @click="back"
                ><ArrowLeftBold></ArrowLeftBold
            ></el-icon>
        </template>
        <template #second> 密码登录 </template>
    </Header>
    <form class="form">
        <div class="form-item">
            <input type="text" placeholder="账号" v-model="form.username" />
        </div>
        <div class="username_warning" v-if="username_warning_show">
            请输入账号
        </div>
        <div class="password form-item">
            <input
                type="password"
                placeholder="密码"
                ref="handlePassword"
                v-model="form.password"
            />
            <el-switch
                v-model="showPassword"
                class="ml-2"
                size="large"
                inline-prompt
                style="
                    --el-switch-on-color: #ff692f;
                    --el-switch-off-color: #ccc;
                "
                active-text="隐藏密码"
                inactive-text="显示密码"
                @change="handleChange"
            />
        </div>
        <div class="password_warning" v-if="password_warning_show">
            请输入密码
        </div>
        <div class="verify_code">
            <input
                type="text"
                placeholder="验证码"
                v-model="form.captcha_code"
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
        <div class="code_warning" v-if="code_warning_show">请输入验证码</div>
    </form>
    <div class="login">
        <el-button @click="handleLogin">登录</el-button>
    </div>
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
    padding: 0 3vw;
    height: 10vw;
    outline: none;
}
.login {
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
