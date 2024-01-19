<script setup lang="ts">
import LocalPosition from '@/views/home/components/local-position/local-position.vue'
import HotCity from '@/views/home/components/hot-city/hot-city.vue'
import LetterCity from '@/views/home/components/letter-city/letter-city.vue'
import Header from '@/layout/header/index.vue'
</script>

<template>
    <div class="home_container">
        <header class="home-header">
            <Header></Header>
        </header>

        <!--    当前定位-->
        <div class="local">
            <LocalPosition></LocalPosition>
        </div>
        <!--    热门城市-->
        <div class="home_hot_city">
            <HotCity></HotCity>
        </div>
        <!--    根据字母排序展示城市-->
        <div>
            <LetterCity class="home_letter_city"></LetterCity>
        </div>
    </div>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    z-index: 99;
}
.home_hot_city {
    margin-top: 2vh;
}
.home_letter_city {
    margin-top: 2vh;
}
</style>
