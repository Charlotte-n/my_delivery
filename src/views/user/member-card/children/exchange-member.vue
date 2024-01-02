<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue'
import Header from '@/components/common-header-2/index.vue'
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
            <template #second> <span>兑换会员</span> </template>
        </Header>
    </header>
    <main>
        <el-empty description="没有开发"></el-empty>
    </main>
</template>

<style scoped lang="scss"></style>
