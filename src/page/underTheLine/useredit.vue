<template>
  <div>
    <div v-title>资料编辑</div>
    <div class="user-edit-form">
      <el-form :model="ruleForm" ref="ruleForm" :inline="true">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="userPhone">
          <el-input v-model="ruleForm.userPhone" readonly></el-input>
        </el-form-item>
        <el-form-item  prop="offlineStatus">
          <el-radio v-model="ruleForm.offlineStatus" v-for="(item,index) in userStatus" :key="index" :label="item.index">{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="入职日期" prop="offerTime" class="offertime">
          <el-date-picker class="select-date" :disabled="ruleForm.offlineStatus!== '32'" type="date" placeholder="选择日期" v-model="ruleForm.offerTime"  style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="certNo" class="offertime">
          <el-input v-model="ruleForm.certNo"></el-input>
          <el-upload action="https://jaf" class="upload-demo" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <el-button @click="cardtype='cer'">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankNo" class="offertime">
          <el-input v-model="ruleForm.bankNo"></el-input>
          <el-upload action="https://jaf" class="upload-demo" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <el-button @click="cardtype='bank'">上传图片</el-button>
          </el-upload>
        </el-form-item>    
        <el-form-item class="buttons">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存提交</el-button>
        </el-form-item>    
      </el-form>
    </div>

  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { userStatus } from '@/assets/constant.js';
import moment from 'moment';
export default {
  name:"useredit",
  data(){
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return{
      userStatus,
      userInfo:{},
      orderInfo:{},
      cardtype:"",
      ruleForm:{
        certNo:"",
        bankNo:"",
        offlineStatus:"",
        offerTime:"",
        userName:"",
        userPhone:""
      }
    }
  },
  created(){
    this.getData();
  },
  methods:{
    beforeAvatarUpload(file) {
      var testmsg=file.name.substring(file.name.lastIndexOf('.'));	
      let typeArr = ['.png', '.jpg', '.jpeg'];
      if (typeArr.indexOf(testmsg) > -1) {
        // 上传文件地址，然后赋值给fileForm.waterFile
        const paperType = this.cardtype;
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let _base64 = reader.result

          this.axios({
            method: 'post',
            url:paperType==="cer" ? '/api/off/certOcr': "/api/off/bankOcr",
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              [paperType==="cer" ? 'certImage' : 'bankImage']: _base64,
            }
          }).then((res) => {
            if (res.data.code == 200) {
              paperType==="cer" ? this.ruleForm.certNo = res.data.data.num :this.ruleForm.bankNo = res.data.data.card_num;
              
            } else {
              this.$message.error('上传失败，请重试')
            }
          }).catch(() => {
            this.$message.error('上传失败，请重试')
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
        })
        return 
      }
    },
   getData() {
      const orderId = JSON.parse(window.localStorage.getItem('orderId'));
      const userId = JSON.parse(window.localStorage.getItem('userId'));
      this.axios({
        method: 'post',
        url: '/api/off/OfflineUserInfo',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          userId,
          orderId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          const userInfo = res.data.data.userInfo;
          const orderInfo = res.data.data.orderInfo;
          this.ruleForm={
            certNo:userInfo.certNo,
            bankNo:userInfo.bankNo,
            offlineStatus:orderInfo.offlineStatus,
            offerTime:orderInfo.offerTime,
            userName:userInfo.userName,
            userPhone:userInfo.userPhone
          }
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: 'post',
            url: '/api/off/editUserInfo',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userId:JSON.parse(window.localStorage.getItem('userId')),
              certNo:this.ruleForm.certNo,
              bankNo:this.ruleForm.bankNo,
              orderId:JSON.parse(window.localStorage.getItem('orderId')),
              offlineStatus:this.ruleForm.offlineStatus,
              offerTime:moment(this.ruleForm.offerTime).format('YYYY-MM-DD'),
            }
          }).then((res) => {
            if (res.data.code == 200 || res.data.code == '200') {
                
                // this.$message({
                //   message: "提交成功",
                //   type: 'success',
                // });
                this.$router.push({
                  path: "/underline/userlist"
                })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
          }).catch((res) => {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
  .user-edit-form{
    padding: 0.5rem;
    background: #fff;

  }
</style>
<style lang="less">
.user-edit-form{
  .el-form--inline .el-form-item__label{
    width: 1.887rem;;
    font-size: 0.32rem;
    color:#969696;
  }
  .el-radio{
    width: 2.133rem;
    height: 0.8rem;
    background: #f5f5f9;
    text-align: center;
    line-height: 0.8rem;
    color: #969696;
    margin-right:0.1rem;
    border-radius:0.133rem;
    .el-radio__input{
      display:none;
    }
    .el-radio__label{
      padding:0;
      font-size:0.32rem;
    }
  }
  .el-form--inline .el-form-item{
    margin-right:0;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:#e6a03c;
  }
  .is-checked{
    background:#fae3c1;
  }
  .el-input__inner{
    border: none;
    border-bottom: 1px solid #f5f5f9;
    border-radius: 0;
    color: #323232;
    padding-left: 10px;
  }
  .el-form-item.is-success .el-input__inner{
    border-color:#f5f5f9;
  }
  .buttons{
    margin-top: 0.7rem;
    margin-bottom: 1rem;
    .el-button{
      width: 4rem;
      height: 1.173rem;
    }
    .el-button--default{
      background:#f5f5f9;
      color:#969696;
    }
    .el-button--primary{
      background:#e6a03c;
      color:#fff;
      border:1px solid #e6a03c;
    }
  }
}
.offertime{
  width:100%;
  position: relative;
  .el-form-item__content{
    width:75%;
  }
  .el-button--default{
    width: 1.867rem;
    height: 0.8rem;
    border-radius: 0.133rem;
    border: solid 0.013rem #e6a03c;
    color: #e6a03c;
    font-size: 0.32rem;
    padding: 0;
    position: absolute;
    right: 0;
    top: 10px;
  }
  .upload-demo{
    height:0;
  }
  .select-date{
    .el-input__inner{
      padding-left:30px;
    }
  }
}
.el-message{
  min-width: 0;
}
</style>


