<!-- 确认订单 -->
<template>
  <div style="background:#fff;min-height: 100vh;">
    <div v-title>{{'商品名称'}}</div>
    <!-- 收件地址栏 -->
    <div class="address-bar" @click="editAddress">
      <div class="address-bar-l">
        <img class="locate-icon" v-if="addresses.length>0" src="@/assets/icon/个人中心/收货地址.png">
      </div>
      <div class="address-bar-m" v-if="addresses.length>0">
        <p class="address-bar-m-t">
          <span class="address-receiver">收货人：{{address.reciverName}}</span>
          <span>{{addresses[0].contactPhone}}</span>
        </p>
        <p class="address-bar-m-b">收货地址：{{address.addressArea}}{{address.addressDetail}}</p>
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
        <img class="goods-img" :src="saleInfo.sale_image_url">
        <div class="godds-detail">
          <p class="goods-name">{{saleInfo.sale_name}}</p>
          <p class="yellow">{{saleInfo.sale_need_inte}}积分</p>
        </div>
        <div class="goods-count">数量×1</div>
      </div>
      <div class="middle-b">剩余商品积分:{{inte}}积分</div>
    </div>
    <div class="confirm-btn-bar">
      <div class="total">合计:<span class="yellow">{{saleInfo.sale_need_inte}}积分</span></div>
      <div class="confirm-btn" @click="submitOrder" :class="{unable:this.address === null && inte>=saleInfo.sale_need_inte}">确定兑换</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  name: '',
  data() {
    return {
      goodsName: '商品名称',
      addresses: [],
      saleInfo: {},
      inte: 0,
      address: null,
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      const { data: saleList } = await this.axios.post('/api/h5/getSaleList');
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      //获取当前用户的收货地址
      if (userMsg && userMsg.users) {
        const userId = userMsg.users.loginType === 'person' ? userMsg.users.userId: userMsg.users.company_user_id;
        this.userId = userId;
        const { data } = await this.axios.post('/api/h5/getUserAddressList', {
          userId,
        });
        //收货地址列表
        this.addresses = data.data ? data.data : [];
        if (this.addresses.length > 0) {
          this.address = this.addresses[0];
          if (this.chosenAddress) {
            this.address = this.chosenAddress;
          }
        }
        //根据商品ID获取商品详情
        const saleId = JSON.parse(window.localStorage.getItem('saleId'));
        this.saleId = saleId;
        this.getGoodsInfo(saleId, userId);
      }
    })
  },
  methods: {
    ...mapMutations('person', [
      'setSubmitSuccess',
      'setExId',
    ]),
    //编辑我的地址
    editAddress() {
      this.$router.push('/person/shop/myAddress');
    },
    async submitOrder() {
      //提交订单
      if (!this.address) {
        MessageBox.alert('请选择收货地址', '提示');
        return;
      }
      if (this.inte < this.saleInfo.sale_need_inte) {
        MessageBox.alert('积分不足，无法兑换', '提示');
        return;
      }
      const { data } = await this.axios.post('/api/h5/exchangeSale', {
        saleId: this.saleId,
        userId: this.userId,
        addressId: this.address.addressId,
      });
      this.setSubmitSuccess(data.code === 200);
      this.setExId(data.data);
      this.$router.push('/person/shop/orderSubmit');


    },
    /**
     * 获取商品信息
     * @param  {[type]} saleId [description]
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    async getGoodsInfo(saleId, userId) {
      const { data } = await this.axios.post('/api/h5/getSaleInfo', {
        saleId,
        userId,
      });
      if (data.data.saleInfo) {
        this.saleInfo = data.data.saleInfo;
      }
      if (data.data.inte) {
        this.inte = data.data.inte;
      }

    }
  },
  computed: {
    ...mapState('person', [
      'chosenAddress'
    ])
  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/orderConfirm.scss';

</style>
