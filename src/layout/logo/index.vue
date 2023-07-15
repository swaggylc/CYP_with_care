<template>
    <div class="logo">
        <img src="../../../public/ecut.jpg" alt="">
        <p>ECUT运营平台</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.logo {
    display: flex;
    justify-content: center;
    width: 100%;

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