<template>
  <div>
    <div v-title>我的小店</div>
    <div class="myshop-header">
      <img :src="userMap.userImageUrl" class="myshop-header-img" />
      <div class="myshop-header-content">
        <div class="myshop-header-name">{{userMap.nickName}}</div>
        <div class="myshop-header-user">
          <img src="@/assets/person/star-level.png" alt="" style="position:relative;zIndex:1;width:1.08rem;height:1.08rem;" /><span class="myshop-header-level">V{{userMap.skLevel}}12</span>
          <span class="myshop-header-count">推荐人数{{userMap.investCount}}24</span>
        </div>
      </div>
    </div>
    <ul class="myshop-user">
      <li class="myshop-user-list">
        <span>我的二维码</span>
        <div>
          <img src="@/assets/person/code.png" alt="">
          <i class="el-icon-arrow-right"></i>
        </div>
        
      </li>
      <li class="myshop-user-list">
        <span>推荐好友</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li class="myshop-user-list">
        <span>我的专属链接</span>
        {{userMap.investUrl}}
        <el-button>复制</el-button>
      </li>
      <li class="myshop-user-list">
        <span>我的推荐码</span>
        {{userMap.investCode}}
        <el-button>复制</el-button>
      </li>
      </ul>
      <div v-if="pushList.length > 0" style="background:#fff;">
        <div>我的推荐企业</div>
        <div class="myshop-list" v-for="(item, index) in pushList" :key="index">
          <div class="myshop-list-left">
            <img :src="item.companyLogo" />
            <span>{{item.inviteCount}}人</span>
          </div>
          <div class="myshop-list-right">
            <div class="myshop-list-right-title">
              <span>{{item.officeName}}</span>
              <span>{{item.salaryStart}}元-{{item.salayEnd}}元/{{checkTime(item.salayUnit)}}</span>
            </div>
            <!-- <div class="myshop-list-right-money" v-if="item.">

            </div> -->
            <div>
              {{item.companyName}}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name:"myshop",
  data(){
    return{
      userMap:{},
      pushList:[]
    }
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
    // 判断是什么标签
    tags(ids){
      const data=[
        {index:"0",name:"穿无尘服"},
        {index:"1",name:"包吃"},
        {index:"2",name:"包住"},
        {index:"3",name:"餐补"},
        {index:"4",name:"房补"},
        {index:"5",name:"五险"},
        {index:"6",name:"五险一金"},
        {index:"7",name:"交通补助"},
        {index:"8",name:"话补"},
        {index:"9",name:"周末双休"},
        {index:"10",name:"年底双薪"},
        {index:"11",name:"长白班"},
        {index:"12",name:"免费商业险"},
        {index:"13",name:"站姿上班"},
        {index:"14",name:"加班多"},
        {index:"15",name:"妹子多"},
        {index:"16",name:"周围热闹"},
        {index:"17",name:"吃住好"},
        {index:"18",name:"年龄要求低"},
        {index:"19",name:"日多薪"}
      ];
      

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
      }
      div{
        float:right;
        img{
          display: inline-block;
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
    .myshop-list-right-title{
      &>span:first-child{
        display:block;
        font-size: 0.48rem;
        font-weight: bold;
      }
    }
  }
</style>