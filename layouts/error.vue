<template>
    <div class="container">
        <h1 v-if="error.statusCode == 404">页面不存在</h1>
        <h2 v-else>应用发生错误异常</h2>
        <nuxt-link to="/">首页</nuxt-link>
    </div>
</template>
<script>
export default {
    layout: 'default',
    props: {
        error: {
            type: Object,
            default: null
        }
    }
}
</script>
