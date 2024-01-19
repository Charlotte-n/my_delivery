<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { getOrderRemark } from '@/apis/order.ts'
import { onMounted, ref } from 'vue'
import useOrderStore from '@/store/order.ts'
const OrderStore = useOrderStore()
const back = () => {
    history.go(-1)
}
//获取备注信息
const orderRemark = ref<any>([])
const getOrderRemarkApi = async () => {
    orderRemark.value = await getOrderRemark(2)
}
const group = ref<any>([])

const saveInstance = (e: any) => {
    if (!group.value.includes(e.target.innerText)) {
        group.value.push(e.target.innerText)
    }
}
//选中状态
const changeActive = (e: any) => {
    e.target.className = 'active'
}
//确定
const confirm = () => {
    if (otherRemark.value !== '') {
        group.value.push(otherRemark.value)
    }
    OrderStore.setOrderRemark(group.value)
    history.go(-1)
}
const otherRemark = ref('')
const loading_v = ref(false)
onMounted(async () => {
    loading_v.value = true
    await getOrderRemarkApi()
    loading_v.value = false
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
            <template #second> 订单备注 </template>
        </Header>
    </header>
    <main>
        <div style="height: 80vh" v-loading="loading_v" v-if="loading_v"></div>
        <div class="quick_remark">
            <h3 class="title">快速备注</h3>
            <div class="remark">
                <ul
                    v-for="item in orderRemark?.remarks"
                    :key="item"
                    @click="saveInstance($event)"
                >
                    <li
                        v-for="singleItem in item"
                        :key="singleItem"
                        @click="changeActive($event)"
                    >
                        {{ singleItem }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="other_remark">
            <h3 class="title">其他备注</h3>
            <div class="self_remark">
                <textarea
                    placeholder="请输入备注内容(可不填)"
                    v-model="otherRemark"
                ></textarea>
            </div>
        </div>
        <div class="btn">
            <button @click="confirm">确定</button>
        </div>
    </main>
</template>

<style scoped lang="scss">
//快速备注
.quick_remark {
    margin-top: 3vw;
    padding: 3vw;
    background-color: white;
    font-size: 3.6vw;
    .title {
        margin: 0;
        font-weight: 400;
    }
    .remark {
        margin-top: 3vw;
        display: flex;
        flex-wrap: wrap;
        ul {
            margin-top: 3vw;
            margin-right: 2vw;
            border-radius: 1vw;
            border: 1px solid $themeColor;
            display: flex;
            font-size: 4vw;
            li {
                border-right: 1px solid $themeColor;
                padding: 1.6vw 3.5vw;
                &:last-child {
                    border-right: 0;
                }
            }
        }
    }
}
//其他备注
.other_remark {
    margin-top: 3vw;
    padding: 2vw;
    background-color: white;
    h3 {
        margin: 0;
        font-size: 4vw;
        font-weight: 400;
    }
    .self_remark {
        margin-top: 3vw;
        width: 100%;
        textarea {
            border: 0;
            background-color: #f9f9f9;
            outline: none;
            width: 100%;
            height: 20vh;
            font-size: 3.4vw;
            &::placeholder {
                padding-left: 2vw;
                padding-top: 2vw;
            }
        }
    }
}
.btn {
    padding: 2vw;
    font-size: 4vw;
    button {
        border-radius: 1vw;
        margin-top: 3vw;
        outline: none;
        border: 0;
        color: white;
        width: 100%;
        height: 10vw;
        background-color: $themeColor;
    }
}

.active {
    background-color: $themeColor;
    color: white;
}
</style>
