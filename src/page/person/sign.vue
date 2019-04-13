<template>
  <div class="sign-body">
    <div v-title>签到</div>
    <div style="position: relative">
      <img src="@/assets/person/sign.png" alt="" class="sign-img">
      <div style="position: absolute;color: #e6a03c; top: 5px; right: 10px;">
        <span @click="signRule()" style="display: inline-block; border-radius: 10px; padding: 2px 5px; border: 1px solid #ccc">
          积分规则
        </span>
        
      </div>
    </div>
    <div class="sign-content">
      <el-row style="margin: 0; text-align: center">
        <el-col :span="12">
          <div style="font-size: 30px; color: #e6a03c;">
            {{userInte}}
          </div>
          <div style="font-size: 0.3rem; color: #e6a03c;">
            我的积分
          </div>
        </el-col>
        <el-col :span="12">
          <div @click="jumptoShop()">
            <div style="font-size: 20px; color: #e6a03c;">
              <img src="@/assets/person/shopcar.png" alt="" style="width: 35px">
            </div>
            <div style="font-size: 0.3rem; color: #e6a03c;">
              积分商城
            </div>
          </div>
          
        </el-col>
      </el-row>
      <div>
        <div v-if="!isSign" class="sign-botton" style="background: #28A0A4" @click="setSign()">
          签到
        </div>
        <div v-else class="sign-botton" style="background: #ccc">
          已签到
        </div>
      </div>
      <div class="sign-day">
        您已连续签到{{this.signMsg.signCount || 0}}天
      </div>
    </div>
    <el-dialog
  title="积分规则"
  :visible.sync="dialogVisible"
  width="90%"
  center
  >
  <el-row style="margin-bottom: 10px;">
    <el-col :span="12" style="padding-left: 20px;">每日签到:</el-col>
    <el-col :span="12">
      <span style="color:#e6a03c">+{{signruleData.signDay}}</span>积分
    </el-col>
  </el-row>
  <el-row style="margin-bottom: 10px;">
    <el-col :span="12" style="padding-left: 20px;">每邀请一人:</el-col>
    <el-col :span="12">
      <span style="color:#e6a03c">+{{signruleData.investPerson}}</span>积分
    </el-col>
  </el-row>
  <el-row style="margin-bottom: 10px;">
    <el-col :span="12" style="padding-left: 20px;">意见反馈通过审核:</el-col>
    <el-col :span="12">
      <span style="color:#e6a03c">+{{signruleData.feedBack}}</span>积分
    </el-col>
  </el-row>
  <el-row style="margin-bottom: 10px;">
    <el-col :span="12" style="padding-left: 20px;">成功入职:</el-col>
    <el-col :span="12">
      <span style="color:#e6a03c">+{{signruleData.offerIn}}</span>积分
    </el-col>
  </el-row>
  
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import moment from 'moment'
export default {
  data() {
    return {
      user: {},
      isSign: false,
      userInte: 0,
      signMsg: {},
      dialogVisible: false,
      signruleData: {
        feedBack: 0,
        investPerson: 0,
        offerIn: 0,
        signDay: 0
      }
    }
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem('userMsg')).users
    this.getSignMsg()
    this.getUserMsg()
  },
  methods: {
    getSignMsg() {
      this.axios({
        method: 'post',
        url: '/api/h5/getSignDetail',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.isSign = res.data.data.isSign
          this.signMsg = res.data.data.signDetail
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },

    getUserMsg(data) {
      this.axios({
        method: 'post',
        url: '/api/h5/getMyCenter',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.userInte = res.data.data.userInte || 0
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    setSign() {
      this.axios({
        method: 'post',
        url: '/api/h5/userDaySign',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          });
          this.isSign = true
          this.getSignMsg()
          this.getUserMsg()
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    jumptoShop() {
      this.$router.push({
        path: '/person/shop'
      })
    },
    signRule() {
      this.dialogVisible = true
      this.axios({
        method: 'post',
        url: '/api/h5/getInteRule',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.signruleData = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sign-img {
  width: 100%
}
.sign-body {
  height: 100vh;
  background: #fff;
  position: relative;
  .sign-content  {
    width: 90vw;
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    position: absolute;
    top: 2.5rem;
    left: 5vw;
    min-height: 60vh;
    box-shadow: 2px 2px 10px #ccc
  }
  .sign-botton {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin: auto;
    text-align: center;
    vertical-align: center;
    margin-top: 2rem;
    font-size: 1rem;
    color: #fff;
    line-height: 3.5rem;
    box-shadow:inset -3px -3px 2px #050533;
  }
  .sign-day {
    text-align: center;
    color: #e6a03c;
    margin-top: 20px;
  }
}
</style>


