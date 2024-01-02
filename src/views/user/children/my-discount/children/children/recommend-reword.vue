<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
const back = () => {
    history.go(-1)
}
</script>

<template>
    <Header>
        <template #first>
            <el-icon size="25" @click="back"
                ><ArrowLeftBold></ArrowLeftBold
            ></el-icon>
        </template>
        <template #second>推荐有奖</template>
    </Header>
    <el-empty description="无法使用代金券" />
    <div class="download_update">
        <button>下载或升级客户端</button>
    </div>
</template>

<style scoped lang="scss">
.download_update {
    text-align: center;
}
button {
    padding: 3vw 2vw;
    border-radius: 2vw;
    border: 0;
    outline: none;
    color: white;
    background-color: $themeColor;
}
</style>
