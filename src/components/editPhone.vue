<template>
  <div>
    <mt-field :readonly="companyContactPhone?true:false" :label="label" v-model="phone">
      <div style="border:1px solid #e6a03c;text-align: center;border-radius: 3px;padding: 8px 12px;" @click="select">修改</div>
    </mt-field>
    <mt-popup
      style="width: 90%;background: #ffffff;padding: 0 20px;"
      v-model="popupVisible">
      <div class="pop">
        <div style="text-align: center;font-size: 19px;color: #000;">修改手机号</div>
        <div class="login-form-input">
          <div class="login-form-input-1">
            <img src="@/assets/login/phone.png" alt="" class="login-form-input-icon">
          </div>
          <div class="login-form-input-2">
            <mt-field @blur="outPoint('old')" placeholder="请输入原手机号" v-model="userPhoneOld"></mt-field>
          </div>
        </div>
        <div class="login-form-input">
          <div class="login-form-input-1">
            <img src="@/assets/login/phone.png" alt="" class="login-form-input-icon">
          </div>
          <div class="login-form-input-2">
            <mt-field @blur="outPoint('new')" placeholder="请输入新手机号" v-model="userPhoneNew"></mt-field>
          </div>
        </div>
        <div class="login-form-input">
          <div class="login-form-input-1">
            <img src="@/assets/login/yan.png" alt="" class="login-form-input-icon">
          </div>
          <div class="login-form-input-2">
            <mt-field @blur="outPoint()" placeholder="请输入验证码"  v-model="smsCode">
              <div style="background: #e6a03c;padding: 7px 11px;color: #ffffff;border-radius: 3px;" class="font14" @click="sendSmsCode">{{teahuoContent}}</div>
            </mt-field>
          </div>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 20px;font-size: 12px;">
          <mt-button type="primary" style="background: rgb(230, 160, 60);width: 96px;" class="font14" @click.native="confirm">确认修改</mt-button>
          <mt-button type="default" style="width: 96px;" class="font14" @click.native="popupVisible=false">取消</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default{
    props:{
      label:'',
      companyContactPhone:'',
    },
    data(){
      return {
        phone:'',
        popupVisible:false,
        teahuoContent:'获取验证码',
        userPhoneOld:'',
        userPhoneNew:'',
        smsCode:'',
        userId:'',
        isPortTea:false,
      }
    },
    methods:{
      select(){
        this.popupVisible = true
      },
      sendSmsCode(){
        if(this.isPortTea){
          return;
        }
        this.isPortTea = true
        this.axios({
          method: 'post',
          url: '/api/h5/sendSmsCode',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            smsPhone: this.userPhoneOld,
          }
        }).then((res) => {
          if (res.data.code == 200) {
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
          } else {
            this.isPortTea = false;
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res.data.msg || '请求出错',
            duration: 1000,
          });
        })
      },
      changeMyPhone(){
        this.axios({
          method: 'post',
          url: '/api/h5/changeMyPhone',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            newPhone: this.userPhoneNew,
            smsCode:this.smsCode,
            userId:this.userId,
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.popupVisible = false;
            this.$emit('callBack',this.userPhoneNew)
          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res.data.msg || '请求出错',
            duration: 1000,
          });
        })
      },
      confirm(){
        if(!this.userPhoneNew || !this.userPhoneOld){
          this.$store.commit('showToast','请填写号码');
          return
        }else if(!(/^1[3456789]\d{9}$/.test(this.userPhoneNew)) || !(/^1[3456789]\d{9}$/.test(this.userPhoneOld))){
          this.$store.commit('showToast','手机格式不正确');
          return
        }
        if(!this.smsCode){
          this.$store.commit('showToast','请填写验证码');
          return;
        }
        this.changeMyPhone();
      },
    },
    created(){
      this.phone = this.companyContactPhone;
      let user = JSON.parse(localStorage.getItem('userMsg')).users
      this.userId = user.company_user_id || user.user_id;
    },
  }
</script>
<style>
  .font14{
    font-size: 14px;
  }
  .pop{
    padding:20px 0;
  }
  .pop .mint-cell-value{
    border:none;
  }
  .mint-toast{
    z-index: 2012!important;
  }
</style>
<style lang="less" scoped>

  .login-form-input {
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
    width: calc(100% - 40px);
  }
  .login-form-input-3 {
    float: right;
    margin-top: 3px;
  }
  }
</style>
