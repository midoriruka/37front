<template>
  <div>
    <div v-title>积分商城</div>
    <div class="shop-body">
      <div v-for="(item, index) in shopList" :key="index" class="shop-item" @click="showDetail(item)">
        <el-row style="margin: 0; text-align: center">
          <el-col :span="6">
            <img :src="item.saleImageUrl" alt="" v-if="item.saleImageUrl">
            <img src="@/assets/person/shopcar.png" alt="" v-else>
          </el-col>
          <el-col :span="12" style="text-align: left;padding-left: 20px;">
            <div style="font-size: 0.5rem">
              {{item.saleName}}
            </div>
            <div style="margin-top: 20px; font-size: 0.3rem; color: #e6a03c">
              {{item.saleNeedInte}}
            </div>
          </el-col>
          <el-col :span="6">
            <span class="shop-duihuan" @click="exchangeShop(item)">
              兑换
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopList: []
    }
  },
  created() {
    window.localStorage.removeItem('shopDetail')
    this.getShopList()
  },
  methods: {
    getShopList() {
      this.axios({
        method: 'post',
        url: '/api/h5/getSaleList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.shopList = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    exchangeShop(data) {
      console.log('af')
      event.stopPropagation()
    },
    showDetail(data) {
      console.log('fas')
      window.localStorage.getItem('shopDetail', data.saleId)
      this.$router.push({
        path: '/person/shop/detail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.shop-item {
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .shop-duihuan {
    color: #e6a03c;
    display: inline-block;
    padding: 5px 10px;
    font-size: 0.4rem;
    border: 1px solid #e6a03c;
    border-radius: 5px;
  }
}
.shop-body {
  min-height: 100vh;
  background: #fff;
}
</style>


