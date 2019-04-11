<!-- 订单提交 -->
<template>
  <div style="background: #fff;">
    <div v-title>订单提交</div>
    <div class="main">
      <img class="main-img" :src="success?successImg:failImg">
      <div>
        <p class="main-text">订单提交{{success?'成功':'失败'}}</p>
        <p>{{success?'我们已经收到来自你的订单，将尽快安排发货':'抱歉您的订单提交失败，请返回仔细检查'}}</p>
        <div class="btn-group">
          <div class="btn">商城首页</div>
          <div class="btn">{{success?'查看订单':'返回'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import successImg from '@/assets/icon/个人中心/submit-success.png';
import failImg from '@/assets/icon/个人中心/submit-fail.png';
export default {
  name: '',
  data() {
    return {
      success: true,
      successImg,
      failImg,
    }
  },
  mounted() {
    this.$nextTick().then(() => {

    })
  },
  methods: {

  },
  computed: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/orderSubmit.scss';
</style>
