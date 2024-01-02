<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold, SuccessFilled } from '@element-plus/icons-vue'
import { getAddressList } from '@/apis/user.ts'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user.ts'
import { AddressListType, SingleAddress } from '@/apis/types/user.ts'
const userStore: any = useUserStore()
const back = () => {
    history.go(-1)
}
//收货地址列表
const select = ref<number>(0)
const addressList = ref<AddressListType>([] as AddressListType)
const getAddressListApi = async () => {
    addressList.value = await getAddressList(userStore.userInfo.user_id)
}
const changeActiveSelect = (id: number, address: SingleAddress) => {
    select.value = id
    userStore.setAddress(address)
    history.go(-1)
}

onMounted(() => {
    getAddressListApi()
})
</script>

<template>
    <header>
        <Header>
            <template #first>
                <el-icon size="20" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second> 选择地址 </template>
        </Header>
    </header>
    <main>
        <ul>
            <li
                v-for="(item, index) in addressList"
                :key="item.id"
                @click="changeActiveSelect(index, item)"
            >
                <el-icon size="20" v-if="index === select"
                    ><SuccessFilled
                /></el-icon>
                <div v-else style="width: 8.3vw"></div>
                <div>
                    <div class="address_top">
                        <span>{{ item.name }}</span>
                        <span>{{ item.sex == 1 ? '女' : '男' }}</span>
                        <span>{{ item.phone }}</span>
                    </div>
                    <div class="address_bottom">
                        <span>{{ item.tag }}</span>
                        <span>{{ item.address }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>

<style scoped lang="scss">
main {
    height: 93vh;
    overflow: auto;
    background-color: white;
    ul {
        padding: 4vw 8vw;
        li {
            display: flex;
            align-items: center;
            margin-top: 10vw;
            font-size: 4.4vw;
            .el-icon {
                margin-right: 2vw;
                color: #1dc779;
            }
            &:first-child {
                margin-top: 0;
            }
            .address_top {
                span {
                    &:first-child {
                        margin-right: 2vw;
                        font-size: 5vw;
                        font-weight: 600;
                    }
                    &:nth-child(2) {
                        margin-right: 2vw;
                    }
                }
            }
            .address_bottom {
                span {
                    font-size: 3.5vw;
                    color: #666666;
                    &:first-child {
                        padding: 0 1vw;
                        border-radius: 1vw;
                        margin-right: 2vw;
                        background-color: $themeColor;
                        color: white;
                    }
                }
            }
        }
    }
}
</style>
