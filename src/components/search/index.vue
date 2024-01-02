<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    searchTitle: string
}>()
const emit = defineEmits<{
    getInputValue: (value: string) => void
}>()
const content = ref()
const handleSubmit = () => {
    if (content.value) {
        emit('getInputValue', content.value)
    }
}
</script>

<template>
    <div class="search">
        <el-input
            v-model="content"
            class="input"
            :placeholder="props.searchTitle"
            clearable
        />
        <el-button type="primary" class="submit" @click="handleSubmit"
            >提交</el-button
        >
    </div>
</template>

<style scoped lang="scss">
.search {
    padding: 0 0 2.3vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    text-align: center;
    box-shadow: 0 0.4vw 0.4vw 0.1vw rgba(0, 0, 0, 0.2);

    .input {
        margin-top: 3vw;
        height: 5.6vh;
        width: 90%;
    }
    .submit {
        margin-top: 3vw;
        width: 90%;
    }
}
</style>
