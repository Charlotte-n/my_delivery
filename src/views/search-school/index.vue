<script setup lang="ts">
import Header from '@/components/common-header-3/index.vue'
import Search from '@/components/search/index.vue'
import { getSelectedCityInfo, searchAddress } from '@/apis/city.ts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { SingleCity } from '@/apis/types/city.ts'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { usePosition } from '@/store/position.ts'

const route = useRoute()
const router = useRouter()
const store = usePosition()
//#region头部
const goBack = () => {
    router.back()
}
//endregion

const historyTitle = ref(true)
//获取当前城市信息
const currentCity = ref<SingleCity>()
const getSelectedCityApi = async () => {
    const res = await getSelectedCityInfo(route.params.id)
    currentCity.value = res
}
// 搜索地址
const searchAddressInfo = ref<SingleCity[]>([] as SingleCity[])
const inputValue = ref('')
const getAddressApi = async () => {
    const res = await searchAddress(
        Number(route.params.id as string),
        inputValue.value,
    )
    searchAddressInfo.value = res
    historyTitle.value = false
}
const getInputValue = (value: string) => {
    inputValue.value = value
    getAddressApi()
}
//去往另一个页面
const gotoDetail = () => {
    router.push({
        name: 'takeaway',
        params: { geohash: '36.558363,116.811332' },
    })
    store.$state.geohash = '36.558363,116.811332'
}
onMounted(() => {
    getSelectedCityApi()
})
</script>

<template>
    <header class="header-1">
        <Header :cityName="currentCity?.name as string">
            <template v-slot:left>
                <el-icon color="white" size="5vw"
                    ><ArrowLeftBold @click="goBack"
                /></el-icon>
            </template>
            <template v-slot:right>
                <router-link
                    class="change_city"
                    to="/"
                    :style="{ color: 'whitesmoke' }"
                    >切换城市</router-link
                >
            </template>
        </Header>
    </header>
    <Search
        searchTitle="输入学校、商务楼、地址"
        @getInputValue="getInputValue"
    ></Search>
    <div class="content">
        <div class="search_history" v-if="historyTitle">
            <div class="history">搜索历史</div>
            <ul class="history_item">
                <li @click="gotoDetail">
                    <h4>齐鲁工业大学</h4>
                    <p>山东省济南市长清区大学路3501号</p>
                </li>
                <li v-if="historyTitle">
                    <div>清空所有</div>
                </li>
            </ul>
        </div>
        <div v-else class="search_content">
            <ul>
                <li
                    v-for="(item, index) in searchAddressInfo"
                    :key="index"
                    @click="gotoDetail"
                >
                    <h4>齐鲁工业大学</h4>
                    <p>{{ item }}</p>
                    <p>山东省济南市长清区大学路3501号</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header-1 {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
}
.search_history {
    margin-top: 1vh;
    font-size: 2vw;
    .history {
        padding: 0 3vw 1vw 3vw;
        border-bottom: 1px solid rgba(115, 115, 115, 0.5);
    }
    ul {
        margin: 0;
        padding: 3vw 0;
        background-color: white;
        li {
            border-bottom: 1px solid rgba(115, 115, 115, 0.5);
            padding: 0 3vw;
            h4 {
                padding: 0;
                margin: 0;
                font-size: 4vw;
                font-weight: 400;
            }
            p {
                font-size: 2vw;
                color: #888888;
            }
            &:last-child {
                cursor: pointer;
                margin-top: 3vw;
                border: 0;
                font-size: 5vw;
                text-align: center;
            }
        }
    }
}
.search_content {
    ul {
        margin: 0;
        padding: 3vw 0;
        background-color: white;
        li {
            border-bottom: 1px solid rgba(115, 115, 115, 0.5);
            padding: 2vw 3vw;
            h4 {
                padding: 0;
                margin: 0;
                font-size: 4vw;
                font-weight: 400;
            }
            p {
                font-size: 2vw;
                color: #888888;
            }
            &:last-child {
                border: 0;
            }
        }
    }
}
</style>
