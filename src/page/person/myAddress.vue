<!-- 我的收货地址 -->
<template>
  <div style="background: #fff;">
    <div v-title>我的收货地址</div>
    <div class="address-list">
      <div class="address-item" v-for="(item,i) in addresses" :key="i">
        <div class="address-item-l">
          <div class="receiver"><span>周星驰</span><span class="phone-num">18888888888</span></div>
          <div class="address-item-b">
            <div><img class="select-img" :src="item.isDefault? selectedImg:unselectedImg"></div>
            <div>江省AA市某某花园902江省AA市某某花园02江省AA市某
              某花园9029</div>
          </div>
        </div>
        <div class="edit-btn">编辑</div>
      </div>
    </div>
    <div class="btn-group">
      <div class="add">添加地址</div>
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
      addresses: [{}, {}, {}]

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
@import '~@/styles/myAddress.scss';

</style>
