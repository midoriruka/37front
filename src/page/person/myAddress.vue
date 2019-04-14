<!-- 我的收货地址 -->
<template>
  <div style="background: #fff;min-height: 100vh;overflow: auto;">
    <div v-title>我的收货地址</div>
    <div class="address-list" :class="addresses.length === 0 ?'higher':''">
      <div class="address-item"  v-for="(item,i) in addresses" :key="i">
        <div class="address-item-l" @click="chooseAddress(item)">
          <div class="receiver"><span>{{item.reciverName}}</span><span class="phone-num">{{item.contactPhone}}</span></div>
          <div class="address-item-b">
            <div><img class="select-img" :src="item.addressId === currentAddressId? selectedImg:unselectedImg"></div>
            <div>{{item.addressArea}}{{item.addressDetail}}</div>
          </div>
        </div>
        <div class="edit-btn" @click="editAddress(item)">编辑</div>
      </div>
    </div>
    <div class="btn-group ">
      <div class="add" @click="addAddress">添加地址</div>
    </div>
  </div>
</template>
<script>
import unselectedImg from '@/assets/icon/个人中心/unselected.png';
import selectedImg from '@/assets/icon/个人中心/selected.png';
import { mapState, mapMutations } from 'vuex';
export default {
  name: '',
  data() {
    return {
      unselectedImg,
      selectedImg,
      addresses: [],
      currentAddressId: null,
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      //获取我的收货地址
      if (userMsg && userMsg.users.userId) {
        const userId = userMsg.users.userId;
        const { data } = await this.axios.post('/api/h5/getUserAddressList', {
          userId,
        });
        //收货地址列表
        this.addresses = data.data;
        if (this.chosenAddress) {
          this.currentAddressId = this.chosenAddress.addressId;
        }
      }
    })
  },
  methods: {
    ...mapMutations('person', [
      'setAddressEditType',
      'setEditingAddress',
      'setChosenAddress'
    ]),
    editAddress(item) {
      //编辑地址
      this.setAddressEditType('edit');
      this.setEditingAddress(item);
      this.$router.push('/person/shop/addressEdit');
    },
    addAddress() {
      //跳转至新增地址页面
      this.setAddressEditType('add');
      this.$router.push('/person/shop/addressEdit');
    },
    chooseAddress(item) {
      //跳转至订单确认页面
      this.setChosenAddress(item);
      this.$router.push('/person/shop/orderConfirm');
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
@import '~@/styles/myAddress.scss';

</style>
