<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import RedPacket from '@/views/user/children/my-discount/children/red-packet.vue'
import { ref } from 'vue'
import Shangjia from '@/views/user/children/my-discount/children/shangjia.vue'
const back = () => {
    history.go(-1)
}
const activeIndex = ref(1)
const changeTab = (index: number) => {
    activeIndex.value = index
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
            <template #second>我的优惠</template>
        </Header>
    </header>

    <main>
        <div class="menu">
            <el-menu
                default-active="1"
                class="el-menu-demo"
                mode="horizontal"
                @select="changeTab"
            >
                <el-menu-item index="1" class="hongbao">红包</el-menu-item>
                <el-menu-item index="2" class="shangjia"
                    >商家代金券</el-menu-item
                >
            </el-menu>
        </div>
        <section class="red" v-show="activeIndex == 1">
            <RedPacket></RedPacket>
            <footer>
                <div
                    class="trade"
                    @click="router.push('/user/my_discount/trade_package')"
                >
                    兑换红包
                </div>
                <div
                    class="recommend"
                    @click="router.push({ path: '/user/my_discount/shangjia' })"
                >
                    推荐有奖
                </div>
            </footer>
        </section>
        <section class="recommend_reword" v-show="activeIndex == 2">
            <shangjia></shangjia>
        </section>
    </main>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    top: 0;
    z-index: 99;
}
.menu {
    text-align: center;
    position: sticky;
    top: 14vw;
    .el-menu {
        text-align: center;
        margin: auto;
        width: 100vw;
        justify-content: space-evenly;
    }
}
footer {
    position: sticky;
    bottom: 0;
    left: 0;
    display: flex;
    text-align: center;
    background-color: white;
    box-shadow: 1vw 1vw 1vw 1vw rgba(115, 115, 115, 0.3);
    .trade {
        padding: 4vw;
        border-right: 1px solid rgba(115, 115, 115, 0.2);
        flex: 1;
    }
    .recommend {
        padding: 4vw;
        flex: 1;
    }
}
</style>
