<template>
  <div class="add-bank-card">
    <div v-title>添加银行卡</div>
    <div class="commit-submit">
      <mt-field label="持卡人" @blur="outPoint()" placeholder="请输入姓名" v-model="userName"></mt-field>
      <mt-field label="手机号" @blur="outPoint()" placeholder="请输入手机号" v-model="userName"></mt-field>
      <mt-field label="身份证" @blur="outPoint()" placeholder="请输入身份证" v-model="userName"></mt-field>
      <mt-field label="卡号" @blur="outPoint()" placeholder="请输入卡号" v-model="userName"></mt-field>
      <mt-field label="开户行" @blur="outPoint()"  v-model="userName"></mt-field>
      <div style="width: 4.5rem;margin:0 auto;">
        <mt-button type="primary" @click="getVerifying()" style="width: 100%;">绑定</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      userPhone: "",
      userName: ""
    };
  },
  created() {},
  methods: {
    outPoint: function() {
      this.isShow = true;
      this.timeout = setTimeout(() => {
        document.body.scrollTop = 0;
      }, 500);
    },

    getVerifying() {
      if (!this.userPhone) {
        MessageBox("提示", "您还未输入手机号");
        return false;
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
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
        url: "/api/h5/commit",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          userPhone: this.userPhone,
          smsCode: this.smsCode,
          commitType: this.commitType
        }
      })
        .then(res => {
          if (res.data.code == 200 || res.data.code == "200") {
            window.localStorage.setItem(
              "userMsg",
              JSON.stringify(res.data.data)
            );
            this.$router.push({
              path: "/"
            });
          } else {
            MessageBox({
              title: "小提示",
              message: res.data.msg
            });
          }
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
.add-bank-card {
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
    .mint-cell-title {
      width: 1.58rem;
      margin-left: -0.2rem;
      color: #969696;
      font-size: 0.32rem;
    }
    .mint-cell-value {
      border-bottom: 1px solid #d9d9d9;
      font-size: 0.32rem;
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



