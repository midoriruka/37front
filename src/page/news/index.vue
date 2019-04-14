<template>
  <div>
  <div v-title>薪资讯</div>
      <mt-swipe :auto="4000" style="height: 200px">
        <mt-swipe-item>
          <img :src="bannerList.topBannerOne" :alt="bannerList.topBannerOneUrl" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.topBannerTwo" :alt="bannerList.topBannerTwoUrl" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.topBannerThree" :alt="bannerList.topBannerThreeUrl" class="banner-img">
        </mt-swipe-item>
      </mt-swipe>
      
    <div>
    <ul class="tabList" id="tabList">
        <li v-for="(item, index) in tabLIst" :key="index" @click="activeindex = index" :style="{'width':100 / tabLIst.length+'%'}">
          <a :class="activeindex === index ? 'active' : ''" :href="'#'+index"><span>{{item.className}}</span></a>
        </li>
      </ul>
     <div  class="list-content" v-for="(item, index) in tabLIst" :id="index" :key="index">
      <div class="list"><span class="list-title">{{item.className}}</span><span @click="jumpto(item.classValue,item.className)" class="list-more">更多</span></div>
      <div v-for="(item, index) in data['list'+index]"  v-if="index < 2"  :key="index" @click="toDetail(item.articleUrl)" style="height:1.633rem;">
        <img :src="item.articleImage" class="list-img">
        <div class="list-names">   
          <span class="list-des">{{item.articleTitle}}</span>
          <span class="list-content-desc">{{item.articleDes}}</span>
        </div>
        
      </div>
      </div>
    </div>
   
  </div>
  
</template>
<script>
import { MessageBox } from "mint-ui";
export default{
  name: "news",
  data() {
    return {
      data:{},
      bannerList: {},
      tabLIst:{},
      activeindex:0

    }
  },
   created() {
     this.getData();
  },
  methods: {
    jumpto(data,name){
      window.localStorage.setItem('classId', data);
      window.localStorage.setItem('className', name);
      this.$router.push({
        path: "/news/moreinfo"
      })    
    },
     getData() {
      this.axios({
        method: 'post',
        url: '/api/h5/getArticleList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.data;
          this.bannerList = res.data.data.bannerInfo;
          this.tabLIst = res.data.data.classList;
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    toDetail(url){
      window.location.href=url;
    }
  }
};
window.onscroll = function(){
  if(window.location.pathname!=="/news") return;
  //获取当前滚动的距离
     const btop = document.body.scrollTop||document.documentElement.scrollTop;
     const tabListTop = document.getElementById("tabList").offsetTop;
     //如果滚动距离大于导航条据顶部的距离
     if(btop>tabListTop){
         //为导航条设置fix
         document.getElementById("tabList").classList.add("fix")
     }else{
         //移除fixed
         document.getElementById("tabList").classList.remove("fix")
     }
}
</script>
<style lang="less" scoped>
.tabList{
    padding: 25px 20px;
    margin: 0;
    background-color: #fff;
  li {
    list-style: none;
    display:inline-block;
    text-align: center;
    font-size: 0.4rem;
    color:#323232;
    .active{
      color:#e6a03c;
      font-weight:bold;
      font-size:15px;
    }
    a{
      color: #323232;
      text-decoration: none;
      &:hover{
        color:#e6a03c;
        font-weight:bold;
        font-size:15px;
      }
    }
  }
}
.list-content{
  padding:0 20px 20px 20px;
  margin-top:20px;
  background:#fff;
  border-bottom: 1px solid #f5f5f9;
  .list-img{
    width: 2.133rem;
    height: 1.333rem;
  }
  .list-names{
    vertical-align: top;
    display: inline-block;
    width: 72%;
    font-size: 0.32rem;
    margin-left: 10px;

  .list-des{
    color: #323232;
    font-weight: bold;
    display: block;
  }
  .list-content-desc{
    color: #969696;
    position: relative;
    display: inline-block;
    height: 0.9rem;
    overflow: hidden;
    margin-top: 0.1rem;
    overflow:hidden;
    text-overflow: ellipsis;//显示省略号
    display:-webkit-box;
    -webkit-line-clamp:2;//块元素显示的文本行数
    -webkit-box-orient:vertical;
  }
  }

}
.list{
  padding:7px 0;
  overflow:hidden;
  .list-title {
    font-size:15px;
  }
  .list-more{
    font-size:12px;
    color:#969696;
    float:right;
  }
  
}
.fix {
  position:fixed;
  top:0;
  left:0;
  z-index:1;
  width:100%;
}
.banner-img {
  // border: 1px solid #ccc;
  width: 100%;
  height: 200px;
}
</style>
