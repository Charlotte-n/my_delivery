<script setup lang="ts">
import Header from '@/components/common-header-3/index.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import { deleteAddress, getAddressList } from '@/apis/user.ts'
import { onMounted, ref } from 'vue'
import { AddressListType } from '@/apis/types/user.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore: any = useUserStore()
const back = () => {
    history.go(-1)
}
const isShowDelete = ref(false)
const handleEdit = () => {
    isShowDelete.value = !isShowDelete.value
}
const deleteAddressApi = async (address_id: string | number) => {
    try {
        await deleteAddress(userStore.userInfo.user_id, address_id)
        await getAddressListApi()
    } catch (error) {
        console.log(error)
    }
}
//获取收货地址
const addressList = ref([] as AddressListType)
const getAddressListApi = async () => {
    addressList.value = await getAddressList(userStore.userInfo.user_id)
}
const gotoAddAddress = () => {
    router.push({ path: '/user/add-address' })
}
onMounted(() => {
    getAddressListApi()
})
</script>

<template>
    <header>
        <div class="header">
            <div class="left" @click="back">
                <el-icon size="20"><ArrowLeftBold></ArrowLeftBold></el-icon>
            </div>
            <div class="middle">
                <span class="text1-ellipsis text"> 编辑地址 </span>
            </div>
            <div class="right">
                <span v-show="!isShowDelete" @click="handleEdit">编辑</span>
                <span v-show="isShowDelete" @click="handleEdit">完成</span>
            </div>
        </div>
    </header>
    <main>
        <!--        地址列表-->
        <div class="address_list">
            <ul>
                <li v-for="item in addressList" :key="item.id">
                    <div class="left">
                        <span>{{ item.name }}</span>
                        <span>{{ item.phone }}</span>
                    </div>
                    <div
                        class="right"
                        v-show="isShowDelete"
                        @click="deleteAddressApi(item.id)"
                    >
                        X
                    </div>
                </li>
            </ul>
        </div>
        <div class="add_address" @click="gotoAddAddress">
            <span> 新增地址 </span>
            <span
                ><el-icon size="20"><ArrowRightBold></ArrowRightBold></el-icon
            ></span>
        </div>
    </main>
</template>

<style scoped lang="scss">
.header {
    padding: 3vw 2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $themeColor;
    color: whitesmoke;
    .text {
        font-size: 4.6vw;
    }
    a {
        color: whitesmoke;
    }
    .middle {
        flex: 1;
        text-align: center;
        span {
            display: inline-block;
            width: 40vw;
        }
    }
}
main {
    margin-top: 2vw;
    .address_list {
        ul {
            margin-bottom: 5vw;
            li {
                padding: 2vw;
                border: 1px solid rgba(115, 115, 115, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 1.5;
                background-color: white;
                .left {
                    display: flex;
                    flex-direction: column;
                }
                .right {
                    color: #888888;
                }
            }
        }
    }
    .add_address {
        padding: 2vw;
        display: flex;
        justify-content: space-between;
        background-color: white;
        .el-icon {
            color: #666666;
        }
    }
}
</style>
