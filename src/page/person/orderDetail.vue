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
            <span class="address-receiver">收货人：{{orderDetail.reciver_name}}</span>
            <span class="gray">{{orderDetail.contact_phone}}</span>
          </p>
          <p class="address-bar-m-b">收货地址：{{orderDetail.address_area}}{{orderDetail.address_detail}}</p>
          <div class="address-bar-footer">
            <span>配送时间</span>
            <span class="gray">承诺3日内送达</span>
          </div>
        </div>
      </div>
      <div class="goods-detail">
        <img class="goods-img" :src="require(orderDetail.sale_image_url)">
        <div class="detail-item">
          <p>{{orderDetail.sale_name}}</p>
          <p class="count">数量×1</p>
        </div>
      </div>
      <div class="total"><span>订单总价</span><span class="yellow">{{orderDetail.sale_need_inte}}积分</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      orderDetail: {

      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      //获取订单ID
      //const exId = window.location.hash
      //getOrderDetail(exId);
    })
  },
  methods: {
    async getOrderDetail(exId) {
      const { data } = await this.axios.post('/api/h5/exchangeInfo', {
        exId,
      });
      this.orderDetail = data.data;
      
    }
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
