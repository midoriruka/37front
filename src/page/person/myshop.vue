<template>
  <div>
    <div v-title>我的小店</div>
    <div class="myshop-header">
      <img :src="userMap.userImageUrl" class="myshop-header-img" />
      <div class="myshop-header-content">
        <div class="myshop-header-name">{{userMap.nickName}}</div>
        <div class="myshop-header-user">
          <img src="@/assets/person/star-level.png" alt="" style="position:relative;zIndex:1;width:1.08rem;height:1.08rem;" /><span class="myshop-header-level">V{{userMap.skLevel}}</span>
          <span class="myshop-header-count">推荐人数{{userMap.investCount}}</span>
        </div>
      </div>
    </div>
    <ul class="myshop-user">
      <li class="myshop-user-list" @click="showCode(true)">
        <span>我的二维码</span>
        <div>
          <img src="@/assets/person/code.png" alt="">
          <i class="el-icon-arrow-right"></i>
        </div>
        
      </li>
      <li class="myshop-user-list" @click="dialogFormVisible = true">
        <span>推荐好友</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li class="myshop-user-list">
        <span>我的专属链接</span>
        <span id="link" class="myshop-list-link">{{userMap.investUrl}}</span>
        <el-button @click="copyUrl2('link')">复制</el-button>
      </li>
      <li class="myshop-user-list">
        <span>我的推荐码</span>
        <span id="investCode" class="myshop-list-link">{{userMap.investCode}}</span>
        
        <el-button @click="copyUrl2('investCode')">复制</el-button>
      </li>
      </ul>
      <div v-if=" pushList !== null " style="background:#fff;">
        <div class="myshop-list-title">我的推荐企业</div>
        <div class="myshop-list" v-for="(item, index) in pushList" :key="index" @click="jumpto(item.officeId)">
          <div class="myshop-list-left">
            <img :src="item.companyLogo" />
            <span>{{item.inviteCount}}人</span>
          </div>
          <div class="myshop-list-right">
            <div class="myshop-list-right-title">
              <span>{{item.officeName}}</span>
              <span>{{item.salaryStart}}元-{{item.salayEnd}}元/{{checkTime(item.salayUnit)}}</span>
            </div>
            <div class="tb-labels">
              <span class="tb-label-i" v-for="(items,i) in officeTags(item.officeTags)" :key="i">{{items}}</span>
            </div>
          
            <div class="myshop-list-company">
              {{item.companyName}}
            </div>
                        <div style="text-align: center" class="money">
                <el-row>
                  <el-col style="background: #e65032; color: #fff; border-top-left-radius: 5px;border-bottom-left-radius: 5px; padding: 5px; height: 1rem;width:2rem;">
                    <span class="item-content-jiang">{{item.amount}}</span>元
                  </el-col>
                  <el-col  style="background: #eaebed;border-top-right-radius: 5px;border-bottom-right-radius: 5px;height: 1rem;width:1rem;">
                    {{item.onMode | mode}}
                  </el-col>
                </el-row>
              </div>
              <div class="myshop-list-time">
                {{item.createTime | time}}
              </div>
          </div>
        </div>
      </div>
      <div class="code-image" v-show="codeStatus === true">
        <div><img src="@/assets/person/close.png" @click="showCode(false)"></div>
        <p>长安保存二维码</p>
        <img :src="userMap.investCodeImage">
      </div>
      <div class="myshop-friend" v-show="dialogFormVisible===true">
        <el-dialog title="推荐好友" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="name">
              <img src="@/assets/recommend/user.png" alt class="commit-form-input-icon">
              <el-input v-model="ruleForm.name" placeholder="请输入好友姓名" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <img src="@/assets/recommend/phone.png" alt class="commit-form-input-icon">
             <el-input v-model="ruleForm.phone" placeholder="请输入好友手机号" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确认推荐</el-button>
          </div>
        </el-dialog>
      </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { OFFICE_TAGS } from '@/assets/constant.js';
import moment from 'moment'
export default {
  name:"myshop",
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
      userMap:{},
      pushList:[],
      codeStatus: false,
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        phone: '',
      },
      rules:{
        name: [
            { required: true, message: '请输入好友姓名', trigger: 'blur' }
          ],
        phone:[
          
            {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
    filters: {
    time: (value) => {
      return moment(value).format('YYYY-MM-DD')
    },
    unit: (value) => {
      let text = ''
      switch(value) {
        case '0':
          text = '元/月';
          break;
        case '1':
          text = '元/天';
          break;
        case '2':
          text = '元/小时';
          break;
        default:
          text = '无'
      }
      return text
    },
    mode: (value) => {
      let text = ''
      switch(value) {
        case '1':
          text = '打卡';
          break;
        case '0':
          text = '入职奖励';
          break;
        default:
          text = '无'
      }
      return text
    },
  },
  created(){
    this.getData();
  },
  methods:{
    getData() {
      const userId = JSON.parse(window.localStorage.getItem('userMsg')).users.userId;
      this.axios({
        method: 'post',
        url: '/api/h5/myShop',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.userMap = res.data.data.userMap;
          this.pushList = res.data.data.pushList;
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    // 判断时、日、月
    checkTime(time){
      if (time === "0") return "月"
      else if (time === "1") return "天"
      else return "时"
    },
    // 设置显隐二维码图片呢
    showCode(value){
      this.codeStatus = value
    },
    // 复制功能
    copyUrl2(ids){
      var Url2=document.getElementById(ids).innerText;
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display='none';
 
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commit(this.ruleForm.name,this.ruleForm.phone)
          } else {
            return false;
          }
        });
      },
    commit(name,phone) {
      const info = JSON.parse(window.localStorage.getItem('userMsg'))
      const userId = info.users.userId
      this.axios({
        method: "post",
        url: "/api/h5/pushFriend",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          pushMobile: phone,
          pushName: name,
          userId: userId
        }
      })
        .then(res => {
          if(res.data.code === 200 ){
            this.dialogFormVisible = false;
            
             this.$message({
                message: "推荐成功",
                type: 'success'
              });
              this.ruleForm.name = "";
              this.ruleForm.phone = "";
          } else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
            this.ruleForm.name = "";
            this.ruleForm.phone = "";
          }
        })
        .catch(res => {
          MessageBox({
            title: "提示",
            message: res.data.msg
          });
        });
    },
    // 判断是什么标签
    officeTags(rawTags) {
        if (rawTags) {
          const tags = rawTags.split(',');
          if (tags.length > 0) {
            return OFFICE_TAGS.filter(t => tags.includes(t.index)).map(t => t.name);
          } else {
            return [];
          }
        } else {
          return [];
        }
    },
    jumpto(item){
      console.log(item);
      window.localStorage.setItem('officeId', item);
      this.$router.push({
        path: "/recruitDetail"
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .myshop-header{
    padding:25px 35px;
    background:#28a0a5;
    .myshop-header-content{
      display:inline-block;
      vertical-align: top;
      margin-left: 8px;
    }
    .myshop-header-img {
      display:inline-block;
      width:1.333rem;
      height:1.333rem;
      border-radius:50px;
      position: relative;
      top: 0.3rem;
    }
    .myshop-header-user {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
    }
    .myshop-header-name {
      font-size: 0.48rem;
      color: #fff;
    }
    .myshop-header-count {
      font-size: 0.32rem;
      color: #fff;
      position: relative;
      top: -13px;
    }
    .myshop-header-level{
      width: 1.63rem;
      display: inline-block;
      background: #f3c608;
      font-size: 0.32rem;
      color: #fff;
      line-height: 0.77rem;
      border-radius: 15px;
      text-align: center;
      vertical-align: text-bottom;
      position: relative;
      top: -9px;
      left: -0.5rem;
      z-index: 0;
    }
  }
  .myshop-user{
    padding:0;
    margin:0;
    background:#fff;
    margin-bottom:0.3rem;
    li{
      list-style:none;
      line-height:1rem;
      border-bottom:1px solid #f5f5f9;
      padding:0 0.5rem;
      overflow:hidden;
      span{
        font-size:0.3rem;
        color:#323232;
        display: inline-block;
        width: 2.3rem;
      }
      .myshop-list-link{
        color:#969696;
        display: inline-block;
        width: 55%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
      }
      div{
        float:right;
        img{
          width: 0.63rem;
          height: 0.63rem;
          float: left;
          margin-top: 0.15rem;
        }
        i{
          font-size: 0.5rem;
          margin-top: 0.2rem;
        }
      }
      &>i{
        float:right;
        font-size: 0.5rem;
        margin-top: 0.2rem;
      }
      button{
        width: 1.5rem;
        line-height: 0.2rem;
        height: 0.8rem;
        float: right;
        margin-top: 0.1rem;
        color:#e6a03c;
        padding:0;
        border:1px solid #e6a03c;
        font-size:0.3rem;
        border-radius: 0.2rem;
      }
    }
  }
  .myshop-list{
    padding:0.3rem 0.5rem;
    border-bottom: 1px solid #f5f5f9;
  }
  .myshop-list-left{
    width:2rem;
    height:2rem;
    background:red;
    display:inline-block;
    position:relative;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 0.1rem;
    img{
      width: 100%;
      height: 100%;
    }
    span{
      display: inline-block;
      width: 100%;
      background:rgba(230,160,60,0.8);;
      position: absolute;
      bottom: 0;
      height: 0.5rem;
      color: #fff;
      text-align: center;
    }
  }
  .myshop-list-right{
    display:inline-block;
    vertical-align: top;
    width: 75%;
    position: relative;
    .money{
      position: absolute;
      top: 0;
      right:0;
    }
    .myshop-list-right-title{
      &>span:first-child{
        display:block;
        font-size: 0.48rem;
        font-weight: bold;
      }
    }
  }
  .code-image{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    height: 100%;
    padding: 0 1.5rem;
    width: 100%;
    z-index: 2;
    text-align: center;
    padding-top: 27%;
    div{
      overflow: hidden;
      img{
        width: 1rem;
        height: 1rem;
        float: right;
      }
    }
    &>img{
      width: 5rem;
      height: 5rem;
    }
    p{
      color: #fff;
      font-size: 0.5rem;
    }
  }
  .el-button:focus, .el-button:hover{
    background: #fff;
  }
  .myshop-friend{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width:100%;
    background:  rgba(0,0,0,0.3);
    z-index: 2003;

  }
  .commit-form-input-icon{
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 10%;
    z-index: 1;
  }
  .tb-labels {
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
  }

.tb-label-i {
  background-color: #f5f5f9;
  border-radius: 0.226667rem;
  color: #969696;
  padding: 0.08rem 0.173333rem;
  margin-right: 0.146667rem;
}
.myshop-list-company{
  display: inline-block;
  width: 67%;
  color: #969696;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myshop-list-time{
    float: right;
    margin-top: 0.1rem;
    color: #969696;
}
.myshop-list-title{
    font-size: 0.48rem;
    font-weight: bold;
    padding-left: 0.5rem;
    padding: 0.3rem 0.5rem;
}
</style>
<style lang="less">
.myshop-friend{
    .el-dialog{
      margin: 0 auto 0;
      width:90%;
    }
  .el-dialog__body{
    padding:30px 0;
  }
  .el-dialog__header{
    text-align:center;
  }
  .el-input{
    text-align:center;
  }
  .el-input__inner{
    width:80%;
    border:none;
    border-bottom:1px solid #e3e3e3;
    border-radius:0;
    padding-left: 1.2rem;
    &::-webkit-input-placeholder{
      margin-left:1rem;
      display:inline-block;
    }
  }
  .el-dialog__footer{
    text-align:center;
    .el-button--primary{
      background:#e6a03c;
      border-color:#e6a03c;
    }
  }
  .el-form-item__error{
    left:10%;
  }
}
</style>
