<template>
  <div style="min-height: 100vh; background: #fff;padding-top: 1px">
    <div v-title>登录</div>
    <div class="login-logo">
      <img src="@/assets/login/logo.png" alt="">
    </div>
    <div class="login-submit">
      <div>
        <mt-navbar v-model="loginType">
          <mt-tab-item id="person">个人用户</mt-tab-item>
          <mt-tab-item id="company">企业用户</mt-tab-item>
        </mt-navbar>
        <div class="login-form" v-if="loginType == 'person'">
          <div class="login-form-input">
            <div class="login-form-input-1">
              <img src="@/assets/login/phone.png" alt="" class="login-form-input-icon">
            </div>
            <div class="login-form-input-2">
              <mt-field @blur="outPoint()" placeholder="请输入手机号" v-model="userPhone"></mt-field>
            </div>
          </div>
          <div class="login-form-input">
            <div class="login-form-input-1">
              <img src="@/assets/login/yan.png" alt="" class="login-form-input-icon">
            </div>
            <div class="login-form-input-2" style="width: 4rem">
              <mt-field @blur="outPoint()" placeholder="请输入验证码" v-model="smsCode"></mt-field>
            </div>
            <div class="login-form-input-3">
              <mt-button type="primary" size="small" :disabled="isPortTea" @click="getPortTea()">{{teahuoContent}}</mt-button>
            </div>
          </div>
        </div>
        <div class="login-form" v-if="loginType == 'company'">
          <div class="login-form-input">
            <div class="login-form-input-1">
              <img src="@/assets/login/phone.png" alt="" class="login-form-input-icon">
            </div>
            <div class="login-form-input-2">
              <mt-field placeholder="请输入手机号" v-model="userPhone"></mt-field>
            </div>
          </div>
          <div class="login-form-input">
            <div class="login-form-input-1">
              <img src="@/assets/login/yan.png" alt="" class="login-form-input-icon">
            </div>
            <div class="login-form-input-2" style="width: 4rem">
              <mt-field placeholder="请输入验证码" v-model="smsCode"></mt-field>
            </div>
            <div class="login-form-input-3">
              <mt-button type="primary" size="small" :disabled="isPortTea" @click="getPortTea()">{{teahuoContent}}</mt-button>
            </div>
          </div>
        </div>
        <mt-button type="primary"  @click="login()" style="width: 100%">登录</mt-button>
      </div>
    </div>
    <span class="registration" @click="jumpTo()" :style="{'display': isShow ? 'block':'none'}">注册</span>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      loginType: 'person',
      isPortTea: false,
      teahuoContent: '获取验证码',
      userPhone: '',
      smsCode: '',
      isShow: true,
    }
  },
  created() {
    
  },
  methods: {
    outPoint: function() {
      this.isShow = true
      this.timeout = setTimeout(() => {
        document.body.scrollTop = 0
      }, 500)
    },


    getPortTea() {
      if (!this.userPhone) {
        MessageBox('提示', '您还未输入手机号')
        return false
      } else {
        if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
          MessageBox('提示', '手机号码格式有误，请重填')
          return false;
        } else {
          this.isPortTea = true
          let num = 61
          let daojishi = setInterval(() => {
            num--
            this.teahuoContent = num + 's'
            if (num < 0) {
              clearInterval(daojishi)
              this.isPortTea = false
              this.teahuoContent = '获取验证码'
            }
          }, 1000)
          this.axios({
            method: 'post',
            url: '/api/h5/sendSmsCode',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              smsPhone: this.userPhone
            }
          }).then((res) => {
          }).catch((res) => {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          })
        }
      }
    },
    login() {
      this.axios({
        method: 'post',
        url: '/api/h5/login',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userPhone: this.userPhone,
          smsCode: this.smsCode,
          loginType: this.loginType
        }
      }).then((res) => {
        if (res.data.code == 200 || res.data.code == '200') {
            window.localStorage.setItem('userMsg', JSON.stringify(res.data.data))
            this.$router.push({
              path: '/'
            })
          } else {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    jumpTo() {
      this.$router.push({
        path: '/registertion'
      })
    },
  }
}
</script>
<style>
  .login-logo {
    text-align: center;
    margin-top: 1.3333rem;
    margin-bottom: 1.3333rem;
  }
  .login-logo img {
    width: 2rem;
    height: 2rem;
  }
  .login-submit {
    margin: auto;
    width: 80%
  }
  .login-form {
    margin-top: 50px;
    margin-bottom: 1.3333rem
  }

  .registration {
    width: 100px;
    position: fixed;
    display: inline-block;
    bottom: 20px;
    text-decoration: none;
    color: #e6a03c;
    text-align: center;
    left: calc(50% - 50px);
  }
  
</style>
<style lang="less" scoped>
.login-submit {
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
 
  
  .login-form-input {
    margin-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
    overflow: hidden;
    .login-form-input-1 {
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
    .login-form-input-2 {
      float: left;
    }
    .login-form-input-3 {
      float: right;
      margin-top: 3px;
    }
  }
}
</style>
<style>
 .mint-cell:first-child .mint-cell-wrapper {
    background: none !important;
  }
</style>



