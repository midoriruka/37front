<template>
  <div class="index-body">
    <div class="index-title">
      <div class="index-bar">
        <div class="index-bar-1 index-bar-0">
          <div style="float: left">
            <img src="@/assets/index/position.png" alt="" style="width:30px; margin-top: 15px;">
          </div>
          <div style="float: left" >
            {{position}}
          </div>
        </div>
        <div class="index-bar-2 index-bar-0">
          <div class="bar-search">
            <div style="float: left; line-height: 50px; margin-right: 5px;padding-left: 5px;">
              <img src="@/assets/index/search.png" alt="" style="width:20px; margin-top: -10px;">
            </div>
            <div style="float: left; line-height: 38px" >
              大家再搜: 常熟金像
            </div>
          </div>
        </div>
        <div class="index-bar-3 index-bar-0">
          <img :src="userInfo.img" alt="" style="width:100%; ">
        </div>
      </div>
      <div class="index-banner">
        <mt-swipe :auto="4000" style="height: 200px">
          <mt-swipe-item>
            <img :src="bannerList.indexBannerOneUrl" :alt="bannerList.indexBannerOne" class="banner-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="bannerList.indexBannerTwoUrl" :alt="bannerList.indexBannerTwo" class="banner-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="bannerList.indexBannerThreeUrl" :alt="bannerList.indexBannerThree" class="banner-img">
          </mt-swipe-item>
        </mt-swipe>
        <div class="banner-gun" v-if="this.bannerContent.length > 0">
          <div style="float: left" class="banner-gun-img">
            <img :src="bannerContentOne.head_img_url" alt="">
          </div>
          <div  style="float: left">
            {{bannerContentOne.nick_name}},帮朋友加价，快来围观
          </div>
        </div>

        <!-- button -->
        <div>
          <el-row style="margin-top: 16px;">
            <el-col :span="6">
              <div @click="jumpTo()">
                <div class="button-box" style="position: relative">
                  <img src="@/assets/index/zuigao.png" alt="">
                </div>
                <div class="button-box">
                  最高奖励
                </div>
                <div class="index-max-amount" v-if="maxAmount">
                  {{maxAmount}}
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo()">
                <div class="button-box">
                  <img src="@/assets/index/riduoxin.png" alt="">
                </div>
                <div class="button-box">
                  日多薪
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo('news')">
                <div class="button-box">
                  <img src="@/assets/index/xinzixun.png" alt="">
                </div>
                <div class="button-box">
                  薪资讯
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo('person')">
                <div class="button-box">
                  <img src="@/assets/index/person.png" alt="">
                </div>
                <div class="button-box">
                  个人中心
                </div>
              </div>
              
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px;">
            <el-col :span="6">
              <div @click="jumpTo()">
                <div class="button-box">
                  <img src="@/assets/index/zuixin.png" alt="">
                </div>
                <div class="button-box">
                  最新活动
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo()">
                <div class="button-box">
                  <img src="@/assets/index/tuijian.png" alt="">
                </div>
                <div class="button-box">
                  推荐好友
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo('recruitment')">
                <div class="button-box">
                  <img src="@/assets/index/zhaopin.png" alt="">
                </div>
                <div class="button-box">
                  我要招聘
                </div>
              </div>
              
            </el-col>
            <el-col :span="6">
              <div @click="jumpTo()">
                <div class="button-box">
                  <img src="@/assets/index/jing.png" alt="">
                </div>
                <div class="button-box">
                  敬请期待
                </div>
              </div>
              
            </el-col>
          </el-row>

        </div>
        
      </div>
    </div>
    <div class="index-laotie">
      <div class="com-title">
        <div class="com-title-img">
          <img src="@/assets/index/xing.png" alt="">
        </div>
        <div class="com-title-content">
          老铁，这10个热门大厂超级适合你哦
        </div>
      </div>
      <div class="remen-content">
        <div class="remen-content-item" v-for="(item, index) in hotOfficList" :key="index">
          <div class="item-img">
            <img :src="item.companyLogo" alt="">
          </div>
          <div class="item-content">
            <div class="item-content-title">
              {{item.officeName}}
            </div>
            <div>
              {{item.salaryStart}} - {{item.salayEnd}}{{item.salayUnit | unit}}
            </div>
            <hr>
            <div>
              {{item.onMode | mode}}&#x3000;<span class="item-content-jiang">{{item.amount}}</span><span>元</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="index-laotie">
      <div class="com-title">
        <div class="com-title-img">
          <img src="@/assets/index/xing.png" alt="">
        </div>
        <div class="com-title-content">
          老铁，网友挤破头推荐的这15个也很不错哦
        </div>
      </div>
      <div>
        <div v-for="(item, index) in indexOffic" :key="index" class="index-offic-item">
          <el-row>
            <el-col :span="5" class="offic-title-img">
              <img :src="item.companyLogo" alt="">
              <div class="invite">
                {{item.inviteCount}}人
              </div>
            </el-col>
            <el-col :span="12" class="offic-content">
              <div class="item-content-title">
                {{item.officeName}}
              </div>
              <div>
                {{item.salaryStart}} - {{item.salayEnd}}{{item.salayUnit | unit}}
              </div>
              <div>
                <span class="offic-tag" v-for="(tagItem, indexs) in item.officeTags.split(',')" :key="indexs">
                  {{tagItem}}
                </span>
              </div>
              <div style="color: #777; margin-top: 5px;">
                {{item.companyName}}
              </div>
            </el-col>
            <el-col :span="7">
              <div style="text-align: center" class="money">
                <el-row>
                  <el-col :span="14" style="background: #e65032; color: #fff; border-top-left-radius: 5px;border-bottom-left-radius: 5px; padding: 5px; height: 40px">
                    <span class="item-content-jiang">{{item.amount}}</span>元
                  </el-col>
                  <el-col :span="10" style="background: #eaebed;border-top-right-radius: 5px;border-bottom-right-radius: 5px; padding: 5px;height: 40px">
                    {{item.onMode | mode}}
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 20px;">
                {{item.createTime | time}}
              </div>
              
            </el-col>
          </el-row>
        </div>

      </div>
    </div>

    <div class="index-laotie">
      <div class="com-title">
        <div class="com-title-img">
          <img src="@/assets/index/xing.png" alt="">
        </div>
        <div class="com-title-content">
          老铁，接下来这20个也是可以的
        </div>
      </div>
      <div>
        <div v-for="(item, index) in topOffic" :key="index" class="index-offic-item">
          <el-row>
            <el-col :span="5" class="offic-title-img">
              <img :src="item.companyLogo" alt="">
              <div class="invite">
                {{item.inviteCount}}人
              </div>
            </el-col>
            <el-col :span="12" class="offic-content">
              <div class="item-content-title">
                {{item.officeName}}
              </div>
              <div>
                {{item.salaryStart}} - {{item.salayEnd}}{{item.salayUnit | unit}}
              </div>
              <div>
                <span class="offic-tag" v-for="(tagItem, indexs) in item.officeTags.split(',')" :key="indexs">
                  {{tagItem}}
                </span>
              </div>
              <div style="color: #777; margin-top: 5px;">
                {{item.companyName}}
              </div>
            </el-col>
            <el-col :span="7">
              <div style="text-align: center" class="money">
                <el-row>
                  <el-col :span="14" style="background: #e65032; color: #fff; border-top-left-radius: 5px;border-bottom-left-radius: 5px; padding: 5px; height: 40px">
                    <span class="item-content-jiang">{{item.amount}}</span>元
                  </el-col>
                  <el-col :span="10" style="background: #eaebed;border-top-right-radius: 5px;border-bottom-right-radius: 5px; padding: 5px;height: 40px">
                    {{item.onMode | mode}}
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 20px;">
                {{item.createTime | time}}
              </div>
              
            </el-col>
          </el-row>
        </div>

      </div>
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

    <tabbar tarname="home" :iconarr="iconArr"></tabbar>
  </div>
</template>
<script>
import tabbar from '@/components/tabbar'
import { MessageBox } from 'mint-ui'
import moment from 'moment'
export default {
  name: 'index',
  data() {
    return {
      iconArr: ['../../static/index/1-check.png', '../../static/index/2.png', '../../static/index/3.png'],
      position: '北京',
      userInfo: {
        img: '../../static/index/3.png'
      },
      bannerList: {},
      bannerContent: [],
      bannerContentOne: {
        nick_name: '',
        head_img_url: ''
      },
      show: false,
      maxAmount: 0,
      hotOfficList: [],
      indexOffic: [],
      topOffic: []
    }
  },
  components: {tabbar},
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
  created() {
    if (window.localStorage.getItem('userMsg')) {
      
    }
    this.getBanner()
    this.getHotOffice()
    this.getIndexOffice()
    this.getTopOffice()
  },
  methods: {
    getBanner() {
      this.axios({
        method: 'post',
        url: '/api/h5/getIndexMsg',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.bannerList = res.data.data.banner
          this.bannerContent = res.data.data.addMap
          this.maxAmount = res.data.data.maxAmount ? res.data.data.maxAmount + '元' : ''
          if (this.bannerContent.length > 0) {
            this.changeBannerContent()
          }
          
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    getHotOffice() {
      this.axios({
        method: 'post',
        url: '/api/h5/getHotOfficeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.hotOfficList = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    getIndexOffice() {
      this.axios({
        method: 'post',
        url: '/api/h5/getIndexOfficeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.indexOffic = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    getTopOffice() {
      this.axios({
        method: 'post',
        url: '/api/h5/getTopOfficeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.topOffic = res.data.data
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    changeBannerContent() {
      this.bannerContentOne = {
        nick_name: this.bannerContent[0].nick_name,
        head_img_url: this.bannerContent[0].head_img_url
      }
      setInterval(() => {
        this.bannerContentOne = {
        nick_name: this.bannerContent[Math.floor(Math.random() * this.bannerContent.length)].nick_name,
        head_img_url: this.bannerContent[Math.floor(Math.random() * this.bannerContent.length)].head_img_url
      }
      }, 3500);
    },
    jumpTo(data) {
      this.$router.push({
        path: `/${data}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.index-body {
  padding-bottom: 60px;
}
.index-title {
  background: #fff;
}
.index-bar {
  background: #28a0a5;
  height: 60px;
  overflow: hidden;
}
.index-bar-0 {
  text-align: center;
  float: left;
  line-height: 60px;
  overflow: hidden;
}
.index-bar-1 {
  width: 25%;
  color: #fff;
  font-size: 14px
}
.index-bar-2 {
  width: 60%;
  .bar-search {
    background: #fff;
    height: 35px;
    border-radius: 15px;
    margin-top: 12.5px;
    overflow: hidden;
  }
}
.index-bar-3 {
  width: 15%;
  text-align: right;
  float: right;
  height: 30px;
  width: 30px;
  margin-top: 15px;
  margin-right: 10px;
  border-radius: 50%;

}

.index-banner {
  padding: 0.2667rem;
  position: relative;
}
.banner-img {
  border-radius: 10px;
  // border: 1px solid #ccc;
  width: 100%;
  height: 200px;
}
.banner-gun {
  position: absolute;
  top: 40px;
  left: 20px;
  color: #fff;
  z-index: 10;
  padding-left: 10px;
  padding-right: 10px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  overflow: hidden;
  .banner-gun-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
}

.button-box {
  text-align: center;
  font-size: 0.16rem;
  color: #323232;
  img {
    width: 0.7667rem;
    height: 0.7667rem;;
  }
}
.index-laotie {
  margin-top: 10px;
  background: #fff;
  padding: 10px;
}
.index-max-amount {
  position: absolute;
  top: -0.1333rem;
  left: 1.3333rem;
  background: #f13d3d;
  color: #fff;
  border-radius: 20px;
  padding-left: 5px;
  padding-right: 5px;
}
.com-title {
  color: #e6a03c;
  overflow: hidden;
  margin-bottom: 10px;
  .com-title-img {
    float: left;
    margin-right: 10px;
    width: 0.5rem;
    height: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .com-title-content {
    float: left;
  }
}
.remen-content {
  overflow: auto;
  display: flex; 
  .remen-content-item {
    width: 140px;
    flex-shrink: 0;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
    // height: 150px;
    background: #eaebed;
    text-align: center;
    .item-img {
      width: 100%;
      height: 60px;
    }
    .item-content {
      padding: 10px;
      .item-content-title {
        font-size: 0.4667rem;
        
      }
      .item-content-jiang {
        font-size: 0.4667rem;
        color: #e65032
      }
    }
  }
}
.index-offic-item {
  height: 90px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .offic-title-img {
    position: relative;
    height: 80px;
    img {
      width: 100%;
      height: 80px;
    }
    .invite {
      background: rgba(238, 201, 0, 0.7);
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 5px 0;
      text-align: center;
    }
  }
  .offic-content {
    padding-left: 10px;
    .item-content-title {
      font-size: 0.4667rem;
    }
    .offic-tag {
      display: inline-block;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 10px;
      color: #777;
    }
    
  }
  .money {
    .item-content-jiang {
      font-size: 0.4467rem;
    }
  }
  
}
.index-foot {
  color: #969696;
  line-height: 20px;
  text-align: center;
  margin-top: 30px;
}
</style>


