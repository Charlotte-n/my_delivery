<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { reactive, ref, toRaw } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { addAddressApi } from '@/apis/user.ts'
import { usePosition } from '@/store/position.ts'
import { useUserStore } from '@/store/user.ts'
const posiStore = usePosition()
const userStore = useUserStore()

const back = () => {
    history.go(-1)
}
const formValue = reactive({
    name: '',
    address: '',
    address_detail: '',
    phone: '',
    phone_bk: '',
})
const extra = reactive({
    geohash: posiStore.geohash,
    user_id: userStore.userInfo.user_id,
    tag: '家',
    sex: 2,
    tag: 2,
})
const formRef = ref()
//检验是否为手机号的格式
const checkPhone = (rule: any, value: any, callback: any) => {
    const reg = /^1[3456789]\d{9}$/
    if (!reg.test(value)) {
        callback(new Error('请输入正确的手机格式'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<formRef>>({
    name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
    address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
    address_detail: [
        { required: true, message: '请输入详细地址', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' },
    ],
    phone_bk: [
        { required: true, message: '请输入备用手机号码', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' },
    ],
})
//新增地址
const dialogVisible = ref(false)
const errorInfo = ref('')
const addAddress = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const res = await addAddressApi(Object.assign(extra, formValue))
            if (res.status === 0) {
                dialogVisible.value = true
                errorInfo.value = res.message
            }
            console.log(res)
        } else {
            console.log('error submit!')
            return false
        }
    })
}
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
                <span>新增地址</span>
            </template>
        </Header>
    </header>
    <main>
        <div class="form">
            <el-form ref="formRef" :rules="rules" :model="formValue">
                <el-form-item prop="name">
                    <el-input
                        type="text"
                        placeholder="请填写你的姓名"
                        v-model="formValue.name"
                    />
                </el-form-item>
                <el-form-item prop="address">
                    <el-input
                        type="text"
                        placeholder="小区/写字楼/学校等"
                        v-model="formValue.address"
                    />
                </el-form-item>
                <el-form-item prop="address_detail">
                    <el-input
                        type="text"
                        placeholder="请填写详细的送餐地址"
                        v-model="formValue.address_detail"
                    />
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input
                        type="text"
                        placeholder="请填写能够联系到您的手机"
                        v-model="formValue.phone"
                    />
                </el-form-item>
                <el-form-item prop="phone_bk">
                    <el-input
                        type="text"
                        placeholder="备用联系电话(选填)"
                        v-model="formValue.phone_bk"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="btn">
            <button class="add_address" @click="addAddress(formRef)">
                新增地址
            </button>
        </div>
    </main>
    <el-dialog v-model="dialogVisible" title="Tips" width="80%">
        <span>{{ errorInfo }}</span>
    </el-dialog>
</template>

<style scoped lang="scss">
main {
    .form {
        padding: 2vw;
        display: flex;
        flex-direction: column;
        background-color: white;
        .el-input {
            border: 1px solid rgba(115, 115, 115, 0.1);
            outline: none;
            height: 10vw;
            width: 100%;
            font-size: 3.5vw;
        }
    }
    .btn {
        padding: 0 3vw;
    }
    .add_address {
        margin-top: 5vw;
        border: 0;
        border-radius: 1vw;
        height: 10vw;
        width: 100%;
        color: white;
        background-color: $themeColor;
    }
}
</style>
