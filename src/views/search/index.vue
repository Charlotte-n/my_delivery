<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import Search from '@/components/search/index.vue'
import ShopList from '@/components/search-shoplist/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {
    Search_Restaurants_Param_Type,
    SearchRestaurants,
} from '@/apis/search.ts'
import { ref } from 'vue'
import { usePosition } from '@/store/position.ts'
import { SearchRestaurant } from '@/apis/types/search.ts'

const router = useRouter()
const store: any = usePosition()
const gotoHome = () => {
    router.push({ path: '/takeaway/36.665291,116.994926' })
}
//历史记录
const getInputValue = (value: string) => {
    keyword.value = value
    store.changeHistory(value)
    searchRestaurant()
}
//搜索餐厅
const isShowShangjia = ref(false)
const keyword = ref('')
const ShopListInfo = ref<SearchRestaurant>([] as SearchRestaurant)
const searchRestaurant = async () => {
    const params = ref<Search_Restaurants_Param_Type>({
        keyword: keyword.value,
        geohash: store.geohash,
    })
    const res = await SearchRestaurants(params.value)
    ShopListInfo.value = res
    console.log(ShopListInfo.value)
    isShowShangjia.value = true
}
//根据历史记录搜索
const searchRestaurantByhistory = async (keyword: string) => {
    const params = ref<Search_Restaurants_Param_Type>({
        keyword: keyword,
        geohash: store.geohash,
    })
    const res = await SearchRestaurants(params.value)
    ShopListInfo.value = res
    isShowShangjia.value = true
}
//清空所有
const resethistory = () => {
    store.reset()
}
</script>

<template>
    <Header>
        <template #first>
            <el-icon size="20" @click="gotoHome"><ArrowLeftBold /></el-icon>
        </template>
        <template #second> 搜索 </template>
    </Header>
    <Search
        searchTitle="请输入商家或美食名称"
        @getInputValue="getInputValue"
    ></Search>
    <div class="history" v-if="!isShowShangjia">
        <header>搜索历史</header>
        <section v-if="store.history.length !== 0">
            <div
                class="history_name"
                v-for="item in store.history"
                :key="item"
                @click="searchRestaurantByhistory(item)"
            >
                {{ item }}
            </div>
            <div
                class="clearall"
                v-if="store.history.length !== 0"
                @click="resethistory"
            >
                清空所有
            </div>
        </section>
    </div>
    <div class="shangjia" v-show="isShowShangjia">
        <h4>商家</h4>
        <div class="shop_list_home" v-for="item in ShopListInfo" :key="item.id">
            <ShopList :ShopListItem="item"></ShopList>
        </div>
        <div class="empty" v-if="ShopListInfo.length === 0">
            没有搜索到该商铺...
        </div>
    </div>
</template>

<style scoped lang="scss">
.history {
    margin-top: 3vw;
    color: #666666;
    .history_name {
        margin-top: 3vw;
        font-size: 3.6vw;
        &:first-child {
            margin-top: 0;
        }
    }
    header {
        font-weight: 600;
        padding-left: 3vw;
    }
    section {
        margin-top: 3vw;
        padding: 5vw 3vw 2vw 5vw;
        background-color: white;
        .history_name {
            color: black;
        }
        .clearall {
            text-align: center;
        }
    }
}
.shangjia {
    h4 {
        margin: 2vw 3vw;
        font-size: 4vw;
        color: #666666;
    }
    .empty {
        font-size: 4vw;
        text-align: center;
    }
}
.shop_list_home {
    padding: 3vw;
    background-color: white;
    border-bottom: 1px solid rgba(115, 115, 115, 0.2);
}
</style>
