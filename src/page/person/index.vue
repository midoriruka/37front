<template>
  <div>
    <!-- 每个页面的地址栏title更改部分 -->
    <div v-title>个人中心</div>
    <div v-if="isLogin">
      <!-- 已登录 -->
      <div v-if="isCompanyUser">
        <!-- 企业用户 -->
        <div class="person-bgm">
          <img  class="person-bgm-img" src="@/assets/person/login.png" alt="">
          <div class="person-info">
            <el-row type="flex" class="row-bg" justify="space-between" style="margin: 0; padding-left: 10px; text-align: left">
              <el-col :span="6">
                <span v-if="isInfo" class="qiandao">
                  已入驻
                </span>
                <span v-else class="weiqiandao">
                  未入驻
                </span>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6" style="padding-right: 10px; text-align: right; font-size: 0.3rem">
                <span @click="editorMsg()">修改资料</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 0">
              <div>
                <el-col :span="12" :offset="6">
                  <div>
                    <img :src="companyUserInfo.userHeadImage" alt="" class="person-unlogin" v-if="companyUserInfo.userHeadImage">
                    <img src="@/assets/login/user.png" alt="" class="person-unlogin" v-else>
                  </div>
                  <div>
                    {{this.companyUserInfo.companyName}}
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <div class="person-info-num">
            <el-row style="margin: 0">
              <el-col :span="12">
                <div style="font-size: 0.3rem">
                  总资产
                </div>
                <div style="font-size: 0.6rem">
                  {{this.companyUserInfo.userTotal | numfilter}}
                </div>
              </el-col>
              <el-col :span="12">
                <div style="font-size: 0.3rem">
                  账户余额
                </div>
                <div style="font-size: 0.6rem">
                  {{this.companyUserInfo.userBlanace | numfilter}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="person-two">
          <el-row style="margin: 0">
            <el-col :span="12">
              <div style="font-size: 0.6rem">
                {{this.companyUserInfo.userInte || 0}}
              </div>
              <div style="font-size: 0.3rem">
                可用积分
              </div>
                
            </el-col>
            <el-col :span="12">
              <div style="font-size: 0.6rem">
                {{this.companyUserInfo.userName || '无'}}
              </div>
              <div style="font-size: 0.3rem">
                经纪人
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <!-- 个人用户 -->
        <div class="person-bgm">
          <img  class="person-bgm-img" src="@/assets/person/login.png" alt="">
          <div class="person-info">
            <el-row type="flex" class="row-bg" justify="space-between" style="margin: 0; padding-left: 10px; text-align: left">
              <el-col :span="6">
                <span v-if="!isQian" class="qiandao" @click="setQian()">
                  签到
                </span>
                <span v-else class="weiqiandao">
                  已签到
                </span>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6" style="padding-right: 10px; text-align: right; font-size: 0.3rem">
                <span @click="editorMsg()">修改资料</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 0">
              <div>
                <el-col :span="12" :offset="6">
                  <div>
                    <img :src="personUserInfo.userImageUrl" alt="" class="person-unlogin" v-if="personUserInfo.userImageUrl">
                    <img src="@/assets/login/user.png" alt="" class="person-unlogin" v-else>
                  </div>
                  <div>
                    {{this.personUserInfo.nickName}}
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <div class="person-info-num">
            <el-row style="margin: 0">
              <el-col :span="8">
                <div style="font-size: 0.3rem">
                  总资产
                </div>
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.totalAsset | numfilter}}
                </div>
              </el-col>
              <el-col :span="8">
                <div style="font-size: 0.3rem">
                  预计奖励
                </div>
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.payAmount | numfilter}}
                </div>
              </el-col>
              <el-col :span="8">
                <div style="font-size: 0.3rem">
                  账户余额
                </div>
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.userBalance | numfilter}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="person-two">
          <el-row style="margin: 0">
            <el-col :span="12">
              <div style="font-size: 0.6rem">
                {{this.personUserInfo.userInte || 0}}
              </div>
              <div style="font-size: 0.3rem">
                可用积分
              </div>
                
            </el-col>
            <el-col :span="12">
              <div style="font-size: 0.6rem">
                {{this.personUserInfo.ecoName || '无'}}
              </div>
              <div style="font-size: 0.3rem">
                经纪人
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- 未登录 -->
      <div class="person-bgm">
        <img  class="person-bgm-img" src="@/assets/person/unlogin.png" alt="">
        <div class="person-info">
          <el-row :gutter="20" style="margin: 0">
            <div @click="jumpto('login')">
              <el-col :span="12" :offset="6">
                <div>
                  <img src="@/assets/login/user.png" alt="" class="person-unlogin">
                </div>
                <div>
                  点击登录
                </div>
              </el-col>
            </div>
            
          </el-row>
        </div>
        <div class="person-info-num">
          <el-row style="margin: 0">
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                总资产
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                预计奖励
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                账户余额
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="person-two">
        <el-row style="margin: 0">
          <el-col :span="12">
            <div @click="unLogin()">
              <div style="font-size: 0.6rem">
                0
              </div>
              <div style="font-size: 0.3rem">
                可用积分
              </div>
            </div>
            
              
          </el-col>
          <el-col :span="12">
            <div @click="unLogin()">
              <div style="font-size: 0.6rem">
                无
              </div>
              <div style="font-size: 0.3rem">
                经纪人
              </div>
            
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="person-list">
      <el-row :gutter="24" type="flex"  justify="center" style="margin: 0">
        <el-col :span="4" style="padding: 0">
          <div @click="jumpTo('/person/focusCompany')">
            <div>
              <img src="@/assets/person/guanzhuqiye.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              关注企业
            </div>
          </div>
          
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div @click="jumpto('person/myshop')">
            <div>
              <img src="@/assets/person/shop.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              我的小店
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div @click="jumpTo('/person/focusCompany')">
            <div>
              <img src="@/assets/person/msg.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              消息中心
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div>
            <div>
              <img src="@/assets/person/tixian.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              提现
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div @click="jumpTo('/person/suggest')">
            <div>
              <img src="@/assets/person/suggest.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              意见反馈
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index-foot">
      <div>
        站点地图
      </div>
      <div style="margin-bottom: 10px;">
        37打工网-转为打工者服务的招工招聘信息平台
      </div>
      <div>
        37打工网 37HR.COM ©2012-2017
      </div>
      <div>
        苏州叁柒汇信息技术服务有限公司版权所有
      </div>
      <div>
        苏ICP备17027824号-
      </div>
      <div style="margin-top: 50px;">
        真的没有了！
      </div>
    </div>
    <tabbar tarname="person" :iconarr="iconArr"></tabbar>
  </div>
</template>
<script>
import tabbar from '@/components/tabbar'
import { MessageBox } from 'mint-ui'
import moment from 'moment'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      iconArr: ['../../static/index/1.png', '../../static/index/2.png', '../../static/index/3-check.png'],
      isLogin: false,
      isCompanyUser: false,
      user: {},
      personUserInfo: {},
      companyUserInfo: {},
      isQian: false,
      isInfo: false
    }
  },
  components: {tabbar},
  filters: {
    time: (value) => {
      return moment(value).format('YYYY-MM-DD')
    },
    numfilter: (num) => {
      if (num) {
        var num = (+num || 0).toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result
        } else {
          return 0
        }
      }
      
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      this.isLogin = true
      this.user = JSON.parse(window.localStorage.getItem('userMsg')).users
      if (this.user.loginType == 'person') {
        this.isCompanyUser = false
        this.getUserMsg(0)
        this.isQiandao()
      } else {
        this.isCompanyUser = true
        this.getUserMsg(1)
      }

      // this.isCompanyUser = true
      // this.getUserMsg(1)

    } else {
      this.isLogin = false
    }
  },
  methods: {
    unLogin() {
      Toast({
        message: '您还未登录',
        iconClass: 'fa fa-remove fa-5x'
      });
    },
    jumpTo(data) {
      if (window.localStorage.getItem('userMsg')) {
        this.$router.push({
          path: data
        })
      } else {
        Toast({
          message: '您还未登录',
          iconClass: 'fa fa-remove fa-5x'
        });
      }
    },
    editorMsg() {
      window.localStorage.setItem('editoMsg', JSON.stringify({
        userId: this.user.userId,
        userType: this.user.loginType
      }))
      this.$router.push({
        path: '/person/edit'
      })
    },
    isQiandao() {
      this.axios({
        method: 'post',
        url: '/api/h5/getSignDetail',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.isQian = res.data.data.isSign
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    jumpto(data) {
      this.$router.push({
        path: `/${data}`
      })
    },
    getUserMsg(data) {
      let url = data == 0 ? '/api/h5/getMyCenter' : '/api/h5/getCompanyCenter'
      this.axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          if (data == 0) {
            this.personUserInfo = res.data.data
          } else {
            this.companyUserInfo = res.data.data.companyInfo
            this.isInfo = res.data.data.isInfo
          }
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    setQian() {
      this.$router.push({
        path: '/person/sign'
      })
    //   this.axios({
    //     method: 'post',
    //     url: '/api/h5/userDaySign',
    //     headers: {
    //       'Content-type': 'application/json;charset=UTF-8'
    //     },
    //     data: {
    //       userId: this.user.userId
    //     }
    //   }).then((res) => {
    //     if (res.data.code == 200) {
    //       MessageBox({
    //         title: '小提示',
    //         message: '签到成功',
    //       })
    //       this.isQian = true
    //     }
    //   }).catch((res) => {
    //     MessageBox({
    //       title: '小提示',
    //       message: res.data.msg,
    //     })
    //   })
    }
  }
}
</script>
<style lang="less" scoped>
.person-bgm {
  position: relative;
  width: 100%;
  color: #fff;
  .person-bgm-img {
    width: 100%;
    display: block;
  }
  .person-info {
    width: 100%;
    position: absolute;
    text-align: center;
    font-size: 0.4667rem;
    bottom: 1.8rem;
    .person-unlogin {
      width: 2rem;
      height: 2rem;
      background: #fff;
      border-radius: 50%;
      margin-bottom: 0.2667rem;
    }
  }
  .person-info-num {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
    padding-bottom: 10px;
  }
}
.person-two {
  background: #fff;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #e6a03c;
}
.person-list {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  .person-list-img {
    width: 1rem;
    height: 1rem;
  }
  
}

.index-foot {
  color: #969696;
  line-height: 20px;
  text-align: center;
  margin-top: 30px;
}

.qiandao {
  display: inline-block;
  background: #e6a03c;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 0.3rem
}
.weiqiandao {
  display: inline-block;
  background: #969696;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 0.3rem
}
</style>

