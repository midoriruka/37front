<!-- 确认订单 -->
<template>
  <div>
    <div v-title>{{goodsName}}</div>
    <!-- 收件地址栏 -->
    <div class="address-bar">
      <div class="address-bar-l">
        <img class="locate-icon" src="@/assets/icon/个人中心/收货地址.png">
      </div>
      <div class="address-bar-m">
        <p class="address-bar-m-t">
          <span class="address-receiver">收货人：周星驰</span>
          <span>18888888888</span>
        </p>
        <p class="address-bar-m-b">收货地址：江省AA市某某花园902江省AA市某某花园
          902江省AA市某某花园902</p>
      </div>
      <div class="address-detail-btn">
        <span>&gt</span>
      </div>
    </div>
    <div class="rampbar"></div>
    <!-- 商品栏 -->
    <div class="middle">
      <div class="goods-bar">
        <img class="goods-img" src="">
        <div class="godds-detail">
          <p class="goods-name">{{goodsName}}</p>
          <p class="yellow">8888积分+1元</p>
        </div>
        <div class="goods-count">数量×1</div>
      </div>
      <div class="middle-b">剩余商品积分:900积分</div>
    </div>
    <div class="confirm-btn-bar">
      <div class="total">合计:<span class="yellow">8888积分</span></div>
      <div class="confirm-btn">确定兑换</div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      goodsName: '商品名称'
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
@import '~@/styles/orderConfirm.scss';

</style>
