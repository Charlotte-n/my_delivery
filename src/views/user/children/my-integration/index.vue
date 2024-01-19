<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold, QuestionFilled } from '@element-plus/icons-vue'
import { onMounted, onUnmounted } from 'vue'
import { backPhone, cancelBack } from '@/utils/pullDown.ts'
const back = () => {
    history.go(-1)
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
                <span>我的积分</span>
            </template>
        </Header>
    </header>
    <main class="integration_content">
        <div class="exchange">
            <div class="current_integration">
                <header>
                    <span>当前积分</span>
                    <el-icon size="17"><QuestionFilled /></el-icon>
                    <span>积分说明</span>
                </header>
                <section class="integration_money">
                    <span>0</span>
                    <span>分</span>
                </section>
                <section class="btn">
                    <button>积分兑换商品</button>
                </section>
            </div>
        </div>
        <div class="integration_detail">
            <header>最近30天积分记录</header>
            <main>
                <el-empty description="最近30天无积分记录" />
            </main>
        </div>
    </main>
</template>

<style scoped lang="scss">
.integration_content {
    .exchange {
        padding: 3vw;
        background-color: $themeColor;
        .current_integration {
            padding: 2vw;
            border-radius: 1vw;
            background-color: white;
            font-size: 3.5vw;
            header {
                display: flex;
                align-items: center;
                span {
                    &:first-child {
                        flex: 1;
                    }
                    &:last-child {
                        color: $themeColor;
                    }
                }
                .el-icon {
                    margin-right: 1.8vw;
                    color: $themeColor;
                }
            }
        }
        .integration_money {
            margin-top: 2vw;
            font-size: 10vw;
            span {
                &:last-child {
                    font-size: 5vw;
                }
            }
        }
        .btn {
            margin-top: 5vw;
            font-size: 4vw;
            button {
                border: 0;
                outline: none;
                height: 12vw;
                width: 100%;
            }
        }
    }
    .integration_detail {
        padding: 4vw 2vw;
        color: #666666;
        header {
            font-size: 3.8vw;
        }
    }
}
</style>
