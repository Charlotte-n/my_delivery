<script setup lang="ts"></script>

<template>
    <header>
        <div class="first">
            <slot name="first"></slot>
        </div>
        <div class="second">
            <slot name="second"></slot>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    left: 0;
    top: 0;
    padding: 3vw 2vw;
    display: flex;
    background-color: $themeColor;
    color: white;
    .first {
        width: 10rpx;
    }
    .second {
        flex: 1;
        text-align: center;
        font-size: 4.8vw;
    }
}
</style>
