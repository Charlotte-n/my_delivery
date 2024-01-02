<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
const back = () => {
    history.go(-1)
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
                <span>积分商城</span>
            </template>
        </Header>
    </header>
    <el-empty description="还没有进行开发" />
</template>

<style scoped lang="scss"></style>
