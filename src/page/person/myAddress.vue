<!-- 我的收货地址 -->
<template>
  <div style="background: #fff;">
    <div v-title>我的收货地址</div>
    <div class="address-list">
      <div class="address-item" v-for="(item,i) in addresses" :key="i">
        <div class="address-item-l" @click="chooseAddress(item)">
          <div class="receiver"><span>周星驰</span><span class="phone-num">18888888888</span></div>
          <div class="address-item-b">
            <div><img class="select-img" :src="i === currentAddress? selectedImg:unselectedImg"></div>
            <div>江省AA市某某花园902江省AA市某某花园02江省AA市某
              某花园9029</div>
          </div>
        </div>
        <div class="edit-btn" @click="editAddress(item)">编辑</div>
      </div>
    </div>
    <div class="btn-group">
      <div class="add" @click="addAddress">添加地址</div>
    </div>
  </div>
</template>
<script>
import unselectedImg from '@/assets/icon/个人中心/unselected.png';
import selectedImg from '@/assets/icon/个人中心/selected.png';

export default {
  name: '',
  data() {
    return {
      unselectedImg,
      selectedImg,
      addresses: [{}, {}, {}],
      currentAddress: 0,
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      //获取我的收货地址
      if (userMsg && userMsg.users.userId) {
        const userId = userMsg.users.userId;
        const { result } = await this.axios.post('/api/h5/getUserAddressList', {
          userId,
        });
        //收货地址列表
        this.addresses = result.data ? result.data : [];
      }
    })
  },
  methods: {
    editAddress(item) {
      //编辑地址
      this.$router.push('/person/shop/addressEdit#edit')
    },
    addAddress() {
      //跳转至新增地址页面
      this.$router.push('/person/shop/addressEdit#add');
    },
    chooseAddress(item) {
      //跳转至订单确认页面
      this.$router.push('/person/shop/orderConfirm');
    }
  },
  computed: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/myAddress.scss';

</style>
