<template>
  <mt-header :title="$store.state.app.headContent" fixed v-if="$route.meta.showHead">
    <mt-button icon="back" slot="left"></mt-button>
    <mt-button slot="right">提交</mt-button>
  </mt-header>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        }, components: {
        }
    }
</script>
