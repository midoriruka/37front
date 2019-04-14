<template>
  <div>
    <div v-title>关注企业</div>
      <mt-swipe :auto="4000" class="focus-company" style="height: 200px;padding: 0.3rem;background: #fff;">
        <mt-swipe-item>
          <img :src="bannerList.favBannerOne" :alt="bannerList.favBannerOne" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.favBannerTwo" :alt="bannerList.favBannerTwoUrl" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.favBannerThree" :alt="bannerList.favBannerThreeUrl" class="banner-img">
        </mt-swipe-item>
      </mt-swipe>
      <div v-if=" pushList !== null " style="background:#fff;marginTop:0.5rem;">
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
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { OFFICE_TAGS } from '@/assets/constant.js';
import moment from 'moment'
export default {
  name:"focuscompany",
  data(){
    return{
      pushList: [],
      bannerList:[]
    }
  },
  created(){
    this.getData();
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
  methods:{
    getData() {
      const userId = JSON.parse(window.localStorage.getItem('userMsg')).users.userId;
      this.axios({
        method: 'post',
        url: '/api/h5/myFavCompany',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.pushList = res.data.data.myFavCompanyList;
          this.bannerList = res.data.data.bannerList;
        }
      }).catch((res) => {
        console.log(res);
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
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
    // 判断时、日、月
    checkTime(time){
      if (time === "0") return "月"
      else if (time === "1") return "天"
      else return "时"
    },
    jumpto(item){
      window.localStorage.setItem('officeId', item);
      this.$router.push({
        path: "/recruitDetail"
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
.banner-img {
  // border: 1px solid #ccc;
  width: 100%;
  height: 200px;
}
</style>
<style lang="less">
.focus-company{
  .mint-swipe-items-wrap{
    border-radius:10px;
  }
}
</style>


