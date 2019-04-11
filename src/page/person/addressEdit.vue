<!-- 编辑收货地址 -->
<template>
  <div style="background: #fff;">
    <div v-title>{{(isNew ?'新增':'编辑') + '收货地址'}}</div>
    <div class="address-info">
      <div class="address-item">
        <span class="address-field">收货人</span>
        <div class="input-v"><input type="text" value=""></div>
      </div>
      <div class="address-item">
        <span class="address-field">联系方式</span>
        <div class="input-v"><input type="text" value=""></div>
      </div>
      <div class="address-item">
        <span class="address-field">所在地区</span>
        <div class="input-v"><input type="text" value=""></div>
      </div>
      <div class="address-item">
        <span class="address-field">详细地址</span>
        <div class="input-v"> <input type="text" value=""></div>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn" @click="saveAddress">保存并使用</div>
      <div v-if="!isNew" class="btn delete-btn" @click="deleteAddress">删除</div>
    </div>
  </div>
</template>
<script>

export default {
  name: '',
  data() {
    return {
      isNew: false
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      const operation = window.location.hash;
      console.log(operation);
      if(operation === '#add'){
        this.isNew = true;
      }else if(operation === '#edit'){
        this.isNew = false;
      }
    })
  },
  methods: {
    saveAddress(){
      //调接口保存，成功返回订单确认页
      this.$router.push('/person/shop/orderConfirm');
    },
    deleteAddress(){
      //询问是否要删除
      //调接口删除
      //删除成功返回我的地址
      this.$router.push('/person/shop/myAddress');
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
@import '~@/styles/address-edit.scss';

</style>
