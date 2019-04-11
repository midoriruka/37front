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
      <div class="btn">保存并使用</div>
      <div v-if="!isNew" class="btn delete-btn">删除</div>
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
@import '~@/styles/address-edit.scss';

</style>
