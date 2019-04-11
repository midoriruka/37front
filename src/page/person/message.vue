<template>
  <div class="person-message">
    <div v-title>我的消息</div>
    <div>
      <div v-for="(item, index) in shopList" :key="index" @click="showDetail(item)">
        <span class="message-time">{{item.creatTime | time}}</span>
        <div class="message-item">
          <div :class="{'item-title':true,'no-read':info}">
            <span class="no-read-icon" v-if="info"></span>
            <span>欢迎成为本站会员</span>
          </div>
          <div :class="{'text-cil':info}">
            工资待遇高，工作环境不错，节假日发放福利工资待遇高， 工作环境不错，节假日发放福利
            工资待遇高，工作环境不错，节假日发放福利工资待遇高， 工作环境不错，节假日发放福利
            工资待遇高，工作环境不错，节假日发放福利工资待遇高， 工作环境不错，节假日发放福利
            工资待遇高，工作环境不错，节假日发放福利工资待遇高， 工作环境不错，节假日发放福利
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { MessageBox, Badge } from "mint-ui";
export default {
  data() {
    return {
      shopList: [1,2],
      info: true
    };
  },
  filters: {
    time: value => {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  created() {
    // this.getShopList();
  },
  methods: {
    getShopList() {
      this.axios({
        method: "post",
        url: "/api/h5/myMsg",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data:{
          userId:''
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.shopList = res.data.data;
          }
        })
        .catch(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          });
        });
    },
    changeRead(param) {
      this.axios({
        method: "post",
        url: "/api/h5/changeRead",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          sendId: param.sendId
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.getShopList();
          }
        })
        .catch(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          });
        });
    },
    showDetail(data) {
      this.info = !this.info;
    }
  }
};
</script>
<style lang="less" scoped>
.person-message {
  background-color: #e3e3e3;
  height: 100vh;
  padding-top: 0.4rem;
  font-size: 0.32rem;
  color: #969696;
  .message-time {
    display: block;
    margin: 0.13rem 0.96rem;
  }
  .message-item {
    background-color: #fff;
    border-radius: 4px;
    width: 90%;
    margin: 0 auto 0.4rem auto;
    padding: 0.48rem;

    .item-title {
      font-size: 0.4rem;
      margin-bottom: 0.37rem;
    }
    .no-read {
      color: black;
    }
    .no-read-icon {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      margin-top: -0.2rem;
      margin-left: -0.2rem;
      background: red;
      border-radius: 50%;
    }
    .text-cil {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


