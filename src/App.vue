<script setup lang="ts">
import Footer from '@/layout/footer/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const whitelist = ['orderlist', 'search', 'takeaway', 'user']
</script>

<template>
    <router-view></router-view>
    <div v-if="whitelist.includes(route?.name as string)">
        <Footer></Footer>
    </div>
</template>

<style scoped></style>
