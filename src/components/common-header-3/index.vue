<script setup lang="ts">
const props = defineProps<{
    cityName: string
}>()
</script>

<template>
    <div class="header">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <span class="text1-ellipsis text">
                {{ props.cityName }}
            </span>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    padding: 3vw 2vw;
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
