<template>
    <div class="logo">
        <img src="../../../public/ecut.jpg" alt="">
        <p>ECUT运营平台</p>
    </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
    name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
    display: flex;
    width: 100%;
    // 不换行
    white-space: nowrap;
    margin-left: 10px;
    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    p {
        font-size: 20px;
        font-weight: bold;
        margin-left: 10px;
        color: #fff;
        text-align: center;
        line-height: 60px;
    }
}
</style>