<!-- 订单详情 -->
<template>
  <div style="background:#fff;">
    <div v-title>订单详情</div>
    <div>
      <img class="bg" src="@/assets/icon/个人中心/order-detail-bg.png">
      <div class="address-bar">
        <div class="address-bar-l">
          <img class="locate-icon" src="@/assets/icon/个人中心/收货地址.png">
        </div>
        <div class="address-bar-m">
          <p class="address-bar-m-t">
            <span class="address-receiver">收货人：周星驰</span>
            <span class="gray">18888888888</span>
          </p>
          <p class="address-bar-m-b">收货地址：江省AA市某某花园902江省AA市某某花园902江省AA市某某花园902</p>
          <div class="address-bar-footer">
            <span>配送时间</span>
            <span class="gray">承诺02月16日送达</span>
          </div>
        </div>
      </div>
      <div class="goods-detail">
        <img class="goods-img">
        <div class="detail-item">
          <p>啤酒</p>
          <p class="count">数量×1</p>
        </div>
      </div>
      <div class="total"><span>订单总价</span><span class="yellow">8888积分</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {

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
  watch: {

  },
  components: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/orderDetail.scss';

</style>
