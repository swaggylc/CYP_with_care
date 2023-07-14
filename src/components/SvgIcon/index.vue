<template>
    <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
    <svg :style="{ width, height }">
        <!-- xlink：href执行哪一个图标，属性值务必# icon-图标名字 -->
        <!-- use标签fill属性可以设置图标颜色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
// 接收父组件传递的参数
defineProps({
    // xlink:href属性值的前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    // 图标名字
    name: {
        type: String,
        required: true
    },
    // 图标颜色
    color: {
        type: String,
        default: ''
    },
    // 图标大小
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }

})
</script>

<style scoped></style>