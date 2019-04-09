<template>
  <div>
    <div v-if="isLogin">
      <!-- 已登录 -->
      <div>

      </div>
      <div>

      </div>
    </div>
    <div v-else>
      <!-- 未登录 -->
      <div class="person-bgm">
        <img  class="person-bgm-img" src="@/assets/person/unlogin.png" alt="">
        <div class="person-info">
          <el-row :gutter="20">
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
          <el-row>
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
                总资产
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                总资产
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="person-two">
        <el-row>
          <el-col :span="12">
            <div style="font-size: 0.6rem">
              0
            </div>
            <div style="font-size: 0.3rem">
              可用积分
            </div>
              
          </el-col>
          <el-col :span="12">
            <div style="font-size: 0.6rem">
              无
            </div>
            <div style="font-size: 0.3rem">
              经纪人
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="person-list">
      <el-row :gutter="24" type="flex"  justify="center">
        <el-col :span="4" style="padding: 0">
          <div>
            <div>
              <img src="@/assets/person/guanzhuqiye.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              关注企业
            </div>
          </div>
          
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div>
            <div>
              <img src="@/assets/person/shop.png" alt="" class="person-list-img">
            </div>
            <div style="font-size: 0.1rem;">
              我的小店
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="padding: 0">
          <div>
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
          <div>
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
export default {
  data() {
    return {
      iconArr: ['../../static/index/1.png', '../../static/index/2.png', '../../static/index/3-check.png'],
      isLogin: false
    }
  },
  components: {tabbar},
  created() {
    if (window.localStorage.getItem('userMsg')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }

    this.isLogin = false
  },
  methods: {
    jumpto(data) {
      this.$router.push({
        path: `/${data}`
      })
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
</style>

