<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/user.ts'
const userStore: any = useUserStore()
const back = () => {
    history.go(-1)
}
const form = ref()
const ruleForm = reactive({
    username: '',
})

const rule = reactive<FormRules<typeof ruleForm>>({
    username: [{ min: 5, max: 246, message: '长度为5到246', trigger: 'blur' }],
})
const handleChange = async (form: FormInstance) => {
    if (!form) return
    await form.validate((valid, fields) => {
        if (valid) {
            userStore.changeUserName(ruleForm.username)
        } else {
            console.log('error submit!', fields)
        }
    })
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
            <template #second> 修改用户名 </template>
        </Header>
    </header>
    <main>
        <el-form ref="form" :rules="rule" :model="ruleForm">
            <el-form-item prop="username">
                <el-input
                    placeholder="输入用户名"
                    v-model="ruleForm.username"
                ></el-input>
            </el-form-item>
        </el-form>
        <button @click="handleChange(form)">确认修改</button>
    </main>
</template>

<style scoped lang="scss">
main {
    padding: 3vw;
    height: calc(100vh - 8.7vh);
    background-color: white;
    .el-input {
        height: 8vw;
    }
    p {
        margin: 2vw 0;
        font-size: 2vw;
    }
    button {
        margin-top: 5vw;
        border: 0;
        padding: 2vw 0;
        width: 100%;
        font-size: 3.6vw;
        color: white;
        background-color: $themeColor;
    }
}
</style>
