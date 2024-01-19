<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { onMounted, onUnmounted } from 'vue'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const back = () => {
    history.go(-1)
}
const watchReturn = () => {
    console.log('监听到了')
}
onMounted(() => {
    backPhone(watchReturn)
})
onUnmounted(() => {
    cancelBack(watchReturn)
})
</script>

<template>
    <header class="header-v1">
        <Header>
            <template #first>
                <el-icon size="25" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second>
                <span>积分商城</span>
            </template>
        </Header>
    </header>
    <el-empty description="还没有进行开发" />
</template>

<style scoped lang="scss">
.header-v1 {
    position: sticky;
    left: 0;
    top: 0;
}
</style>
