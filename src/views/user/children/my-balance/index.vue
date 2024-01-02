<script setup lang="ts">
import Header from '@/components/common-header-2/index.vue'
import { ArrowLeftBold, QuestionFilled } from '@element-plus/icons-vue'
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
            <template #second>
                <span>我的余额</span>
            </template>
        </Header>
    </header>
    <main class="balance_content">
        <div class="withdraw">
            <div class="current_balance">
                <header>
                    <span>当前余额</span>
                    <el-icon size="17"><QuestionFilled /></el-icon>
                    <span>余额说明</span>
                </header>
                <section class="balance_money">
                    <span>0.00</span>
                    <span>元</span>
                </section>
                <section class="btn">
                    <button>提现</button>
                </section>
            </div>
        </div>
        <div class="trade_detail">
            <header>交易明细</header>
            <main>
                <el-empty description="暂无明细记录" />
            </main>
        </div>
    </main>
</template>

<style scoped lang="scss">
.balance_content {
    .withdraw {
        padding: 3vw;
        background-color: $themeColor;
        .current_balance {
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
        .balance_money {
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
    .trade_detail {
        padding: 4vw 2vw;
        color: #666666;
        header {
            font-size: 3.8vw;
        }
    }
}
</style>
