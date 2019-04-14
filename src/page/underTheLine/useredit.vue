<template>
  <div>
    <div v-title>资料编辑</div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="userPhone">
          <el-input v-model="ruleForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item  prop="offlineStatus">
          <el-radio v-model="ruleForm.offlineStatus" v-for="(item,index) in userStatus" :key="index" :label="item.index">{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="入职日期" prop="offerTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.offerTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="certNo">
          <el-input v-model="ruleForm.certNo"></el-input>
          <el-button>拍照识别</el-button>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankNo">
          <el-input v-model="ruleForm.bankNo"></el-input>
          <el-upload action="" class="upload-demo" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
            <div class="add-btn box-item" slot="trigger">上传文件</div>
          </el-upload>
        </el-form-item>    
        <el-form-item>
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
const acceptType = ['image/png', 'image/jpg', 'image/jpeg'];
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
      ruleForm:{
        certNo:"",
        bankNo:"",
        offlineStatus:"",
        offerTime:"",
        userName:"",
        userPhone:""
      },
      rules:{
        userName: [
            { required: true, message: '请输入好友姓名', trigger: 'blur' }
          ],
        userPhone:[
          
            {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  created(){
    this.getData();
  },
  methods:{
        handleChange(f) {
      const type = f.raw.type;
      if (!acceptType.includes(type)) {
        MessageBox.alert('只支持png和jpg格式的图片', '提示');
        return;
      }
      const size = f.size;
      if (size > 2000000) {
        MessageBox.alert('图片大小不得2M', '提示');
        return;
      }
      const event = event || window.event;
      const file = event.target.files[0];
      this.axios({
        method: 'post',
        url: '/api/off/certOcr',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          certImage:file
        }
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
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
          console.log(res.data.data)
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
          alert('submit!');
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!');
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

</style>

