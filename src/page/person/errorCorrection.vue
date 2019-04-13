<template>
  <div class="error-correnction">
    <div v-title>发表评论</div>
    <div class="commit-submit">
      <mt-field placeholder="输入发现的问题" type="textarea" rows="7" 
      v-model="introduction"></mt-field>
      <div style="width: 4.5rem;margin:0.53rem auto">
        <mt-button type="primary" @click="getVerifying()" style="width: 100%;">提交</mt-button>
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
      officeId: '',
      userId: ''
    };
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      var info = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userId = info.users.userId
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
        MessageBox("提示", "您还未输入发现的问题");
        return false;
      } else {
        this.commit();
      }
    },
    commit() {
      this.axios({
        method: "post",
        url: "/api/h5/changeError",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          feedContext: this.introduction,
          userId: this.userId,
          officeId: this.officeId
        }
      })
        .then(res => {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          }).then(action => {
            if (res.data.code == 200 || res.data.code == "200") {
              this.$router.go(-1);
            }
          });
          
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
.error-correnction {
  padding-top: 1px;
  .commit-submit {
    width: 9rem;
    margin: 0.28rem auto;
    border-radius: 5px;
    .mint-navbar .mint-tab-item.is-selected {
      color: #fff;
      border-bottom: none;
      background: #e6a03c;
    }
    .mint-button--primary {
      background: #e6a03c;
    }
    .mint-cell-value {
      font-size: 0.32rem;
      height: 4.14rem;
    }
    .anonymous-info {
      color: #e3e3ee;
      font-size: 0.28rem;
      display: block;
      float: right;
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



