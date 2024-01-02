<script setup lang="ts"></script>

<template>
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
