<template>
  <div>
    <div v-title>积分商城</div>
    <div class="shop-body">
      <div v-for="(item, index) in shopList" :key="index" class="shop-item" @click="showDetail(item)">
        <el-row style="margin: 0; text-align: center">
          <el-col :span="6">
            <img :src="item.saleImageUrl" alt="" v-if="item.saleImageUrl" style="width: 100%; border-radius: 4px;">
            <img src="@/assets/person/shopcar.png" alt="" v-else style="width: 100%; border-radius: 4px;">
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
      shopList: [],
      personUserInfo: {}
    }
  },
  created() {
    window.localStorage.removeItem('shopDetail')
    window.localStorage.removeItem('saleId')
    this.getShopList()
    this.getUserMsg()
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
    getUserMsg() {
      
      this.axios({
        method: 'post',
        url: '/api/h5/getMyCenter',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: JSON.parse(window.localStorage.getItem('userMsg')).users.userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.personUserInfo = res.data.data.userInte
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    exchangeShop(data) {
      event.stopPropagation()
      if (this.personUserInfo && (this.personUserInfo > data.saleNeedInte)) {
        window.localStorage.setItem('saleId', data.saleId)
        this.$router.push({
          path: '/person/shop/orderConfirm'
        })
      } else {
        this.$message('您的积分不够~')
      }
    },
    showDetail(data) {
      window.localStorage.setItem('shopDetail', data.saleId)
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


