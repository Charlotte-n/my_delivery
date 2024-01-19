<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold, SuccessFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isActive = ref(false)
const confirm = () => {
    history.go(-1)
}
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
            <template #second>选择发票抬头 </template>
        </Header>
    </header>
    <main>
        <ul>
            <li>
                <span>不需要开发票</span>
                <span
                    ><el-icon
                        size="25"
                        :class="{ active: isActive }"
                        @click="isActive = !isActive"
                        ><SuccessFilled></SuccessFilled></el-icon
                ></span>
            </li>
        </ul>
        <div class="btn">
            <button @click="confirm">确定</button>
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    ul {
        margin-top: 2vw;
        background-color: white;
        font-size: 4vw;
        li {
            padding: 3vw;
            display: flex;
            justify-content: space-between;
            .el-icon {
                color: #666666;
            }
        }
    }
}
.btn {
    font-size: 4vw;
    padding: 2vw;
    button {
        margin-top: 2vw;
        border-radius: 1vw;
        border: 0;
        outline: none;
        background-color: $themeColor;
        width: 100%;
        height: 10vw;
        color: white;
    }
}

.active {
    color: #1dc779 !important;
}
</style>
