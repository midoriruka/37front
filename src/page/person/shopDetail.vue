<template>
  <div>
    <div v-title>商品详情</div>
    <div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopDetail: {},
      test: ''
    }
  },
  created() {
    this.getShopDetail()
    
  },
  methods: {
    getShopDetail() {
      this.axios({
        method: 'post',
        url: '/api/h5/getSaleInfo',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          saleId: window.localStorage.getItem('shopDetail'),
          userId: JSON.parse(window.localStorage.getItem('userMsg')).users.userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.shopDetail = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>


