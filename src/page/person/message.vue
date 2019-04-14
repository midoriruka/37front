<template>
  <div class="person-message">
    <div v-title>消息中心</div>
    <div>
      <div v-for="(item, index) in shopList"  v-if="!shopList.length"
      :key="index" @click="showDetail(item,index)">
        <span class="message-time">{{item.creatTime | time}}</span>
        <div class="message-item">
          <div :class="{'item-title':true,'no-read':item.isRead == 0}">
            <span class="no-read-icon" v-if="item.isRead == 0"></span>
            <span>{{item.msgTitle}}</span>
          </div>
          <div v-if="!item.isExpand">{{item.msgSimple}}</div>
          <div v-if="item.isExpand">{{item.msgContext}}</div>
        </div>
      </div>
      <div v-else class="message-item">暂时无提示信息</div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { MessageBox, Badge } from "mint-ui";
export default {
  data() {
    return {
      shopList: [],
      userId: ''
    };
  },
  filters: {
    time: value => {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      var info = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userId = info.users.userId
      this.getShopList();
    }
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
          userId:this.userId
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.shopList = [];
            res.data.data.forEach(item => {
              const len = item.msgContext;
              const simple = len.substring(0,20)
              this.shopList.push({
                ...item, 
                msgSimple:simple+'（点击查看）',
                isExpand:false
                })
            });;
          } else {
            MessageBox({
              title: "提示",
              message: res.data.msg || '获取消息列表失败'
            });
          }
        })
        .catch(res => {
          MessageBox({
            title: "提示",
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
          MessageBox({
            title: "小提示",
            message: res.data.msg
          });
          
        })
        .catch(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          });
        });
    },
    showDetail(item,index) {
      if(item.isRead == 0){
        this.changeRead(item)
      }
      this.shopList[index].isExpand = !item.isExpand
      this.$emit('shopList', this.shopList)
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


