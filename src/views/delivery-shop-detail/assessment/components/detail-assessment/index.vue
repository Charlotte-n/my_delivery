<script setup lang="ts">
import { RateCateType, RateInfoType } from '@/apis/types/dekivery-home.ts'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formate_img_2 } from '@/utils/formate_img.ts'
const route = useRoute()
const props = defineProps<{
    AccessCate: RateCateType
    handleAssess: (name: string) => void
}>()
const AssessInfo: RateInfoType = inject('AssessInfo')
//处理评价切换
const active_name = ref('全部')
const handleChange = (name: string) => {
    active_name.value = name
    props.handleAssess(name)
}
onMounted(async () => {})
onUnmounted(() => {})
</script>

<template>
    <div class="detail_assessment" ref="detail_assessment">
        <div class="assess_cate">
            <button
                :class="{ btn: true, active_btn: active_name === item.name }"
                v-for="item in props.AccessCate"
                :key="item._id"
                @click="handleChange(item.name)"
            >
                {{ item.name }}({{ item.count }})
            </button>
        </div>
        <div class="users_assessment">
            <div
                class="single_assessment"
                v-for="item in AssessInfo"
                :key="item._id"
            >
                <div class="img">
                    <img :src="formate_img_2(item.avatar)" alt="" />
                </div>
                <div class="back_content">
                    <span class="user_nickname">{{ item.username }}</span>
                    <span class="user_rating">星星替代</span>
                    <span class="user_back_text_img">
                        <span
                            v-for="img in item.item_ratings"
                            :key="img._id"
                            class="user_back_img"
                        >
                            <img
                                :src="formate_img_2(img.image_hash)"
                                alt=""
                                v-if="img.image_hash"
                            />
                        </span>
                    </span>
                    <span class="tag">
                        <el-tag
                            class="ml-2 text1-ellipsis"
                            type="warning"
                            v-for="tag in item.item_ratings"
                            >{{ tag.food_name }}</el-tag
                        >
                    </span>
                </div>
                <div class="assess_time">{{ item.rated_at }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.detail_assessment {
    margin-top: 2vw;
    padding: 2vw;
    background-color: white;
    //评价分类
    .assess_cate {
        margin-bottom: 2.6vw;
        display: flex;
        flex-wrap: wrap;
        .btn {
            padding: 1.7vw 2vw;
            margin-right: 2vw;
            margin-bottom: 1vw;
            border-radius: 1.8vw;
            outline: none;
            border: none;
            font-size: 3.5vw;
            background-color: rgba(254, 144, 58, 0.2);
        }
    }
    //用户评价
    .users_assessment {
        display: flex;
        flex-direction: column;
        .single_assessment {
            border-top: 1px solid rgba(115, 115, 115, 0.1);
            padding: 3vw 0;
            display: flex;
            .img {
                margin-right: 2vw;
                width: 10vw;
                height: 10vw;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .back_content {
                flex: 1;
                display: flex;
                flex-direction: column;
                font-size: 2vw;
                .user_back_text_img {
                    display: flex;
                    .user_back_img {
                        margin-top: 2vw;

                        img {
                            width: 20vw;
                            height: 20vw;
                        }
                    }
                }
                .tag {
                    margin-top: 2vw;
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    .el-tag {
                        margin-right: 2vw;

                        width: 15vw;
                    }
                }
            }
            .assess_time {
                font-size: 2vw;
                color: #666666;
            }
        }
    }
}

.active_btn {
    background-color: $themeColor !important;
    color: white;
}
</style>
