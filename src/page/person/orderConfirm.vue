<!-- 确认订单 -->
<template>
  <div style="background:#fff;">
    <div v-title>{{'商品名称'}}</div>
    <!-- 收件地址栏 -->
    <div class="address-bar" @click="editAddress">
      <div class="address-bar-l">
        <img class="locate-icon" v-if="addresses.length>0" src="@/assets/icon/个人中心/收货地址.png">
      </div>
      <div class="address-bar-m" v-if="addresses.length>0">
        <p class="address-bar-m-t">
          <span class="address-receiver">收货人：{{addresses[0].reciverName}}</span>
          <span>{{addresses[0].contactPhone}}</span>
        </p>
        <p class="address-bar-m-b">收货地址：{{addresses[0].addressArea}}{{addresses[0].addressDetail}}</p>
      </div>
      <div v-else class="no-address">
        <p><span class="no-address-add">+</span>点击选择收货地址</p>
      </div>
      <div class="address-detail-btn">
        <span v-if="addresses.length>0">&gt</span>
      </div>
    </div>
    <div class="rampbar"></div>
    <!-- 商品栏 -->
    <div class="middle">
      <div class="goods-bar">
        <!-- <img class="goods-img" :src="require(saleInfo.sale_image_url)"> -->
        <div class="godds-detail">
          <p class="goods-name">{{saleInfo.sale_name}}</p>
          <p class="yellow">{{saleInfo.sale_need_inte}}积分</p>
        </div>
        <div class="goods-count">数量×{{saleInfo.sale_count}}</div>
      </div>
      <div class="middle-b">剩余商品积分:{{inte}}积分</div>
    </div>
    <div class="confirm-btn-bar">
      <div class="total">合计:<span class="yellow">{{saleInfo.sale_need_inte}}积分</span></div>
      <div class="confirm-btn" @click="submitOrder">确定兑换</div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      goodsName: '商品名称',
      addresses: [],
      saleInfo: {},
      inte: 0
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      //获取当前用户的收货地址
      if (userMsg && userMsg.users.userId) {
        const userId = userMsg.users.userId;
        const { data } = await this.axios.post('/api/h5/getUserAddressList', {
          userId,
        });

        //收货地址列表
        //this.addresses = data.data ? data.data : [];
        //根据商品ID获取商品详情
        const saleId = '';
        //this.getGoodsInfo(saleId, userId);
      }
    })
  },
  methods: {
    //编辑我的地址
    editAddress() {
      this.$router.push('/person/shop/myAddress');
    },
    submitOrder() {
      //提交订单
      this.$router.push('/person/shop/orderSubmit#' + true);
    },
    async getGoodsInfo(saleId, userId) {
      const { data } = await this.axios.post('/api/h5/getSaleInfo', {
        saleId,
        userId,
      });
      if(data.data.saleInfo){
        this.saleInfo =data.data.saleInfo;
      }
      if( data.data.inte){
        this.inte = data.data.inte;
      }
      
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
@import '~@/styles/orderConfirm.scss';

</style>
