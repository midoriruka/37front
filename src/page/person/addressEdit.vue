<!-- 编辑收货地址 -->
<template>
  <div style="background: #fff;">
    <div v-title>{{(addressEditType==='add' ?'新增':'编辑') + '收货地址'}}</div>
    <div class="address-info">
      <div class="address-item">
        <span class="address-field">收货人</span>
        <div class="input-v"><input type="text" v-model="reciverName"></div>
      </div>
      <div class="address-item">
        <span class="address-field">联系方式</span>
        <div class="input-v"><input type="text" v-model="contactPhone"></div>
      </div>
      <div class="address-item">
        <span class="address-field">所在地区</span>
        <div class="input-v"><input type="text" v-model="addressArea"></div>
      </div>
      <div class="address-item">
        <span class="address-field">详细地址</span>
        <div class="input-v"> <input type="text" v-model="addressDetail"></div>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn" @click="saveAddress">保存</div>
      <div v-if="addressEditType==='edit'" class="btn delete-btn" @click="deleteAddress">删除</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  name: '',
  data() {
    return {
      reciverName: '',
      addressArea: '',
      addressDetail: '',
      contactPhone: '',
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.addressEditType === 'edit') {
        this.reciverName = this.editingAddress.reciverName;
        this.addressArea = this.editingAddress.addressArea;
        this.addressDetail = this.editingAddress.addressDetail;
        this.contactPhone = this.editingAddress.contactPhone;
      }

    })
  },
  methods: {
    async saveAddress() {
      //调接口保存，成功返回订单确认页
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      if (userMsg && userMsg.users.userId) {
        const userId = userMsg.users.userId;
        let addressId;
        if (this.addressEditType === 'edit') {
          addressId = this.editingAddress.addressId;
        }
        const { data } = await this.axios.post('/api/h5/addUserAddress', {
          userId,
          reciverName: this.reciverName,
          addressArea: this.addressArea,
          addressDetail: this.addressDetail,
          contactPhone: this.contactPhone,
          addressId,
        })
        if (data.code === 200) {
          this.$router.push('/person/shop/myAddress');
        }
      }
    },
    deleteAddress() {
      //询问是否要删除
      MessageBox.confirm('确定要删除该收货地址吗?').then(async action => {
        //调接口删除
        const { data } = await this.axios.post('/api/h5/delUserAddressList', {
          addressId: this.editingAddress.addressId,
        })
        //删除成功返回我的地址
        this.$router.push('/person/shop/myAddress');
      });

    }
  },
  computed: {
    ...mapState('person', [
      'addressEditType',
      'editingAddress',
    ])
  }
}

</script>
<style scoped lang='scss'>
@import '~@/styles/address-edit.scss';

</style>
