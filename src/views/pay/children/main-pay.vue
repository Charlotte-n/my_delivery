<script setup lang="ts">
import { ArrowLeftBold, SuccessFilled, Warning } from '@element-plus/icons-vue'
import Header from '@/components/common-header-2/index.vue'
import { onMounted, ref } from 'vue'
const back = () => {
    history.go(-1)
}

let totalTime = ref<number>(15 * 60)
let count_down = ref('00:15:00')
//规范格式
const timeFormat = (param: number) => {
    return param < 10 ? '0' + param : param
}
const restTime = () => {
    const interval = setInterval(() => {
        totalTime.value--
        if (totalTime.value === 0) {
            //清除定时器
            clearInterval(interval)
            return
        }
        //计算时间
        const minus = Math.floor(totalTime.value / 60)
        const second = Math.floor(totalTime.value % 60)
        const obj = {
            min: timeFormat(minus),
            seconds: timeFormat(second),
        }
        //拼接字符串
        count_down.value = '00:' + obj.min + ':' + obj.seconds
    }, 1000)
}
const select = ref('zfb')
const changePayMethod = (value: string) => {
    select.value = value
}
//弹窗是否显示
const dialogVisible = ref(false)

const submit = () => {
    dialogVisible.value = true
}
onMounted(() => {
    restTime()
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
            <template #second>在线支付 </template>
        </Header>
    </header>
    <main>
        <div class="count_down">
            <span> 支付剩余时间 </span>
            <span>
                {{ count_down }}
            </span>
        </div>
        <div class="select_method">
            <div :class="{ zfb: true }" @click="changePayMethod('zfb')">
                <svg
                    t="1704198477688"
                    :class="{ icon: true }"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1978"
                    width="30"
                    height="30"
                >
                    <path
                        d="M230.404 576.536c-12.087 9.728-25.043 23.93-28.805 41.984-5.12 24.666-1.069 55.541 22.728 79.761 28.828 29.362 72.637 37.398 91.56 38.779 51.4 3.717 106.184-21.772 147.477-50.844 16.184-11.42 43.899-34.349 70.39-69.721-59.37-30.653-133.477-64.557-212.703-61.24-40.47 1.692-69.454 10.084-90.647 21.281z m752.859 135.545C1009.463 650.574 1024 582.968 1024 512 1024 229.688 794.335 0 512 0 229.665 0 0 229.688 0 512c0 282.335 229.665 512 512 512 170.385 0 321.491-83.723 414.631-212.124-87.997-43.742-233.027-115.734-322.36-159.299-42.63 48.596-105.65 97.303-176.84 118.495-44.722 13.29-85.037 18.365-127.199 9.75-41.739-8.548-72.481-28.093-90.401-47.683-9.127-9.995-19.612-22.706-27.203-37.82a71.25 71.25 0 0 0 1.202 3.049s-4.363-7.524-7.702-19.5a85.994 85.994 0 0 1-3.34-18.143 93.517 93.517 0 0 1-0.2-13.045c-0.378-7.702-0.066-15.783 1.67-24.064 4.185-20.235 12.822-43.81 35.172-65.692 49.063-48.039 114.777-50.621 148.814-50.42 50.421 0.289 138.04 22.35 211.812 48.439 20.436-43.52 33.547-90.068 42.007-121.1H305.308v-33.168h157.518v-66.337H272.139v-33.169h190.687v-66.315c0-9.105 1.803-16.584 16.584-16.584h74.619v82.899h207.293v33.169H554.029v66.337h165.82s-16.65 92.828-68.719 184.32c115.557 41.272 278.128 104.849 332.133 126.086z"
                        fill="#1296DB"
                        p-id="1979"
                    ></path>
                </svg>
                <span>支付宝</span>
                <el-icon size="25" :class="{ active: select === 'zfb' }"
                    ><SuccessFilled></SuccessFilled
                ></el-icon>
            </div>
            <div class="wx" @click="changePayMethod('wx')">
                <svg
                    t="1704198790201"
                    :class="{ icon: true }"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3809"
                    width="35"
                    height="35"
                >
                    <path
                        d="M404.511405 600.865957c-4.042059 2.043542-8.602935 3.223415-13.447267 3.223415-11.197016 0-20.934798-6.169513-26.045189-15.278985l-1.959631-4.296863-81.56569-178.973184c-0.880043-1.954515-1.430582-4.14746-1.430582-6.285147 0-8.251941 6.686283-14.944364 14.938224-14.944364 3.351328 0 6.441713 1.108241 8.94165 2.966565l96.242971 68.521606c7.037277 4.609994 15.433504 7.305383 24.464181 7.305383 5.40101 0 10.533914-1.00284 15.328104-2.75167l452.645171-201.459315C811.496653 163.274644 677.866167 100.777241 526.648117 100.777241c-247.448742 0-448.035176 167.158091-448.035176 373.361453 0 112.511493 60.353576 213.775828 154.808832 282.214547 7.582699 5.405103 12.537548 14.292518 12.537548 24.325012 0 3.312442-0.712221 6.358825-1.569752 9.515724-7.544837 28.15013-19.62599 73.202209-20.188808 75.314313-0.940418 3.529383-2.416026 7.220449-2.416026 10.917654 0 8.245801 6.692423 14.933107 14.944364 14.933107 3.251044 0 5.89015-1.202385 8.629541-2.7793l98.085946-56.621579c7.377014-4.266164 15.188934-6.89913 23.790846-6.89913 4.577249 0 9.003048 0.703011 13.174044 1.978051 45.75509 13.159718 95.123474 20.476357 146.239666 20.476357 247.438509 0 448.042339-167.162184 448.042339-373.372709 0-62.451354-18.502399-121.275087-51.033303-173.009356L407.778822 598.977957 404.511405 600.865957z"
                        fill="#00C800"
                        p-id="3810"
                    ></path>
                </svg>
                <span>微信</span>
                <el-icon size="25" :class="{ active: select === 'wx' }"
                    ><SuccessFilled></SuccessFilled
                ></el-icon>
            </div>
        </div>
        <div class="btn">
            <button @click="submit">确认支付</button>
        </div>
    </main>
    <div class="mask">
        <el-dialog v-model="dialogVisible" width="70%" class="dialog">
            <div class="warning">
                <el-icon size="80"><Warning /></el-icon>
                <span>暂不开放支付功能</span>
            </div>
            <button @click="back">确认</button>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.count_down {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    span {
        &:first-child {
            color: #666666;
            font-size: 4vw;
        }
        &:last-child {
            font-size: 10vw;
            margin-top: 2vw;
        }
    }
}
.select_method {
    padding: 3vw;
    margin-top: 3vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    .zfb {
        padding: 2vw;
        display: flex;
        align-items: center;
        span {
            font-size: 4vw;
            margin-left: 2vw;
            flex: 1;
        }
    }
    .wx {
        padding: 2vw;
        display: flex;
        align-items: center;
        span {
            margin-left: 2vw;
            flex: 1;
            font-size: 4vw;
        }
    }
    .el-icon {
        color: #666666;
    }
}
.btn {
    padding: 2vw;
    button {
        outline: none;
        border: 0;
        border-radius: 1vw;
        height: 11vw;
        width: 100%;
        color: white;
        font-size: 4.5vw;
        background-color: $themeColor;
    }
}
.active {
    color: #1dc779 !important;
}
.mask {
    .dialog {
        display: flex;
        flex-direction: column;
        .warning {
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-icon {
                margin-bottom: 2vw;
                color: $themeColor;
            }
        }
    }
    button {
        margin-top: 3vw;
        border: 0;
        border-radius: 1vw;
        outline: none;
        background-color: $themeColor;
        color: white;
        font-size: 4.3vw;
        height: 10vw;
        width: 100%;
    }
}
</style>
