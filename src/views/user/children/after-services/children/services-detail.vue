<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user.ts'
import showdown from 'showdown'
import { onMounted, onUnmounted } from 'vue'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const userStore = useUserStore()
const back = () => {
    history.go(-1)
}
const markdownText = () => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(userStore.servicesDetail)
    return html
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
    <header>
        <Header>
            <template #first>
                <el-icon size="25" @click="back"
                    ><ArrowLeftBold></ArrowLeftBold
                ></el-icon>
            </template>
            <template #second>
                <span>{{ userStore.servicesTitle }}</span>
            </template>
        </Header>
    </header>
    <main class="services_detail">
        <div
            v-html="markdownText()"
            style="color: #666666; font-weight: 400"
        ></div>
    </main>
</template>

<style scoped lang="scss">
.services_detail {
    overflow: auto;
    background-color: white;
    height: 90vh;
    font-weight: 200;
    padding: 0 5vw;
}
</style>
