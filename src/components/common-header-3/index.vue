<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    cityName: string
}>()
onMounted(() => {})
</script>

<template>
    <div class="header" ref="header">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <span class="text1-ellipsis text" @click="router.push('/')">
                {{ props.cityName ? props.cityName : '获取位置失败' }}
            </span>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    padding: 10vw 2vw 3vw 2vw;
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
</style>
