<template>
  <div class="review-detail">
    <div v-title>发表评论</div>
    <div class="commit-submit">
      <mt-field placeholder="亲，分享环境，人员素质，餐厅等方面的体验" type="textarea" rows="4" v-model="introduction"></mt-field>
      <div class="anonymous-review" @click="changeImg()">
        <img :src="isAnonymous ? icon : iconActive" alt class="anonymous-icon" >
        <span style="font-size:0.32rem;color:#323232;">匿名</span>
        <span class="anonymous-info">您的评论将以匿名的形式展示</span>
      </div>
      <div style="width: 4.5rem;margin:auto">
        <mt-button type="primary" @click="getVerifying()" style="width: 100%;">发表评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      introduction: "",
      isAnonymous: true,
      icon: require("@/assets/recommend/anonymous.png"),
      iconActive: require("@/assets/recommend/anonymous_s.png"),
      officeId: 8,
      userId: ''
    };
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      var info = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userId = info.users.userId
    } else {
      //跳转到登录页
      this.$router.push('/login')
    }
    if (window.localStorage.getItem('officeId')){
      this.officeId = window.localStorage.getItem('officeId')
    }
  },
  methods: {
    changeImg: function() {
      this.isAnonymous = !this.isAnonymous;
    },

    outPoint: function() {
      this.isShow = true;
      this.timeout = setTimeout(() => {
        document.body.scrollTop = 0;
      }, 500);
    },

    getVerifying() {
      if (!this.introduction) {
        MessageBox("提示", "您还未输入评论信息");
        return false;
      } else {
        this.commit();
      }
    },
    commit() {
      this.axios({
        method: "post",
        url: "/api/h5/commentOffice",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          feedContext: this.introduction,
          feedType: this.isAnonymous ? 1 : 0,
          userId: this.userId,
          officeId: this.officeId,
          isHead: this.isAnonymous ? 1 : 0
        }
      })
        .then(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          }).then(action => {
            if (res.data.code == 200 || res.data.code == "200") {
              this.$router.go(-1)
            }
          })
          
        })
        .catch(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          });
        });
    }
  }
};
</script>

<style lang="less">
.review-detail {
  min-height: 100vh;
  background: #fff;
  padding-top: 1px;

  .commit-form {
    margin-top: 50px;
    margin-bottom: 1.3333rem;
  }
  .commit-submit {
    width: 100%;
    padding: 0 0.46rem;
    .mint-navbar .mint-tab-item.is-selected {
      color: #fff;
      border-bottom: none;
      background: #e6a03c;
    }
    .mint-button--primary {
      background: #e6a03c;
    }
    .mint-cell-value {
      border-bottom: 1px solid #d9d9d9;
      font-size: 0.32rem;
      padding: 0.48rem 0;
      height: 4.14rem;
      margin-bottom: 0.27rem;
    }
    .anonymous-info {
      color: #e3e3ee;
      font-size: 0.28rem;
      display: block;
      float: right;
    }

    .anonymous-icon {
      width: 0.6667rem;
      height: 0.6667rem;
      vertical-align: middle;
    }

    .commit-form-input {
      margin-bottom: 20px;
      border-bottom: 1px solid #d9d9d9;
      overflow: hidden;
      .commit-form-input-2 {
        float: left;
      }
    }
  }
}
</style>
<style>
.mint-cell:first-child .mint-cell-wrapper {
  background: none !important;
}
</style>



