<template>
  <div>
    <div v-title>商品详情</div>
    <div style="min-height: 100vh; background: #fff;" class="detail-body">
      <div>
        <img :src="shopDetail.saleInfo.sale_image_url" alt class="shopdetail-img">
      </div>
      <div class="shopdetail-content">
        <div class="shopdetail-name">{{this.shopDetail.saleInfo.sale_name}}</div>
        <div class="shopdetail-price">
          <el-row style="margin: 0">
            <el-col
              :span="12"
              style="text-align: left; color: #e6a03c"
            >{{this.shopDetail.saleInfo.sale_need_inte}}积分</el-col>
            <el-col
              :span="12"
              style="text-align: right; color: #323232"
            >库存:{{this.shopDetail.saleInfo.sale_count}}</el-col>
          </el-row>
        </div>
        <div class="shopdetail-price">
          <el-row style="margin: 0">
            <el-col
              :span="12"
              style="text-align: left; "
            >剩余:{{this.shopDetail.saleInfo.inte || 0}}积分</el-col>
            <el-col :span="12" style="text-align: right; color: #323232"></el-col>
          </el-row>
        </div>
        <mt-button type="primary" @click="exchange()" style="width: 100%; margin-top: 1rem">兑换</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopDetail: {},
      test: ""
    };
  },
  created() {
    this.getShopDetail();
  },
  methods: {
    getShopDetail() {
      this.axios({
        method: "post",
        url: "/api/h5/getSaleInfo",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          saleId: window.localStorage.getItem("shopDetail"),
          userId: JSON.parse(window.localStorage.getItem("userMsg")).users.userId
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.shopDetail = res.data.data;
        }
      }).catch(res => {
        MessageBox({
          title: "小提示",
          message: res.data.msg
        })
      })
    },

    exchange() {
      if (this.shopDetail.inte && (this.shopDetail.inte > this.shopDetail.saleInfo.sale_need_inte)) {
        alert('需要确定页面和传递参数的方式')
        this.$router.push({
          path: '/login'
        })
      } else {
        this.$message('您的积分不够~')
      }
    }
  }
};
</script>
<style lang="less" scoped>
.detail-body {
  .mint-navbar .mint-tab-item.is-selected {
    color: #fff;
    border-bottom: none;
    background: #e6a03c;
    
  }
  .mint-button--primary {
    background: #e6a03c;
  }
  .shopdetail-content {
    padding: 0.5rem;
  }
}
.shopdetail-img {
  width: 100%;
}
.shopdetail-name {
  font-size: 0.5rem;
  color: #323232;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
}
.shopdetail-price {
  font-size: 0.4rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
}
</style>


