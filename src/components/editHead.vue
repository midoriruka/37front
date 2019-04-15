<template>
  <mt-header :title="$store.state.app.headContent" fixed style="background: #ffffff;color: #323232;border-bottom: 1px solid #f5f5f9;font-size: 16px;" v-if="$route.meta.showHead">
    <mt-button icon="back" slot="left"></mt-button>
    <mt-button slot="right" @click.native="submit">提交</mt-button>
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
        },
        methods:{
          submit(){
            this.$emit('submit')
          }
        }
    }
</script>
