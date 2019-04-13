<template>
  <div class="recommend">
    <div v-title>好友推荐</div>
    <div class="commit-submit">
      <div class="commit-form">
        <div class="commit-form-input">
          <div class="commit-form-input-1">
            <img src="@/assets/recommend/user.png" alt class="commit-form-input-icon">
          </div>
          <div class="commit-form-input-2">
            <mt-field @blur="outPoint()" placeholder="请输入好友姓名" v-model="pushName"></mt-field>
          </div>
        </div>
        <div class="commit-form-input">
          <div class="commit-form-input-1">
            <img src="@/assets/recommend/phone.png" alt class="commit-form-input-icon">
          </div>
          <div class="commit-form-input-2">
            <mt-field @blur="outPoint()" placeholder="请输入好友手机号" v-model="pushMobile"></mt-field>
          </div>
        </div>
      </div>
      <div style="width: 4.5rem;margin:0 auto;">
        <mt-button type="primary" @click="getVerifying()" style="width: 100%;">确认推荐</mt-button>
      </div>
    </div>
    <div class="index-foot">
      <div>站点地图</div>
      <div style="margin-bottom: 10px;">37打工网-转为打工者服务的招工招聘信息平台</div>
      <div>37打工网 37HR.COM ©2012-2017</div>
      <div>苏州叁柒汇信息技术服务有限公司版权所有</div>
      <div>苏ICP备17027824号-</div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      pushMobile: "",
      pushName: "",
      userId: '',
      success:require('@/assets/recommend/success.png'),
      error:require('@/assets/recommend/error.png')
    };
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      var info = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userId = info.users.userId
    }
  },
  methods: {
    outPoint: function() {
      this.isShow = true;
      this.timeout = setTimeout(() => {
        document.body.scrollTop = 0;
      }, 500);
    },

    getVerifying() {
      if (!this.pushMobile) {
        MessageBox("提示", "您还未输入手机号");
        return false;
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.pushMobile)) {
          MessageBox("提示", "手机号码格式有误，请重填");
          return false;
        } else {
          this.commit();
        }
      }
    },
    commit() {
      this.axios({
        method: "post",
        url: "/api/h5/pushFriend",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          pushMobile: this.pushMobile,
          pushName: this.pushName,
          userId: this.userId
        }
      })
        .then(res => {
          if(res.data.code == 200 ){
            MessageBox({
              title: "推荐成功",
              message: '<img src="' + this.success + '" />',
              confirmButtonText:'继续推荐'
            });
            this.pushMobile = '';
            this.pushName = '';
          } else{
            MessageBox({
              title: "推荐失败",
              message: '<img src="' + this.error + '" />',
              confirmButtonText:'继续推荐'
            });
          }
        })
        .catch(res => {
          MessageBox({
            title: "提示",
            message: res.data.msg
          });
        });
    }
  }
};
</script>

<style lang="less">
.recommend {
  min-height: 100vh;
  background: #fff;
  padding-top: 1px;

  .commit-form {
    margin-top: 50px;
    margin-bottom: 1.3333rem;
  }

  .index-foot {
    color: #969696;
    line-height: 20px;
    text-align: center;
    margin-top: 30px;
  }
  .commit-submit {
    margin: auto;
    width: 80%;
    height: calc(100vh - 76px - 142px);
    .mint-navbar .mint-tab-item.is-selected {
      color: #fff;
      border-bottom: none;
      background: #e6a03c;
    }
    .mint-button--primary {
      background: #e6a03c;
    }
    .mint-cell:last-child {
      background: none;
    }
    .mint-cell-wrapper {
      background: none !important;
    }

    .commit-form-input {
      margin-bottom: 20px;
      border-bottom: 1px solid #d9d9d9;
      overflow: hidden;
      .commit-form-input-1 {
        float: left;
        width: 0.6667rem;
        height: 0.6667rem;
        margin: 5px;
        margin-top: 13px;
        img {
          width: 0.6667rem;
          height: 0.6667rem;
        }
      }
      .commit-form-input-2 {
        float: left;
      }
      .commit-form-input-3 {
        float: right;
        margin-top: 3px;
      }
    }
  }
}
.mint-msgbox-message{
  width: 80%;
  img{
    width: 70%
  }
}
</style>
<style>
.mint-cell:first-child .mint-cell-wrapper {
  background: none !important;
}
</style>



