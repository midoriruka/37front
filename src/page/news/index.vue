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
        <li v-for="(item, index) in tabLIst" :key="index">
          <span tabId={item.classId}>{{item.className}}</span>
        </li>
      </ul>
     <div class="list-content" v-for="(item, index) in tabLIst" :key="index">
      <div class="list"><span class="list-title">{{item.className}}</span><span class="list-more">更多</span></div>
      <div v-for="(item, index) in data['list'+index]" :key="index" @click="toDetail(item.articleUrl)">
        <img :src="item.articleImage" class="list-img">
        <span class="list-des">{{item.articleTitle}}</span>
      </div>
      </div>
    </div>
   
  </div>
  
</template>
<script>
export default{
  name: "news",
  data() {
    return {
      data:{},
      bannerList: {},
      tabLIst:{},

    }
  },
   created() {
     this.getData();
  },
  methods: {
     getData() {
      this.axios({
        method: 'post',
        url: '/api/h5/getArticleList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data.bannerInfo);
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
    width: 20%;
    text-align: center;
    font-size: 14px;
    color:#323232;
    &:hover{
      color:#e6a03c;
      font-weight:bold;
      font-size:15px;
    }
  }
}
.list-content{
  padding:0 20px 20px 20px;
  margin-top:20px;
  background:#fff;
  .list-img{
    width: 2rem;
    height: 1rem;
  }
  .list-des{
    vertical-align: top;
    display: inline-block;
    margin-left: 10px;
    width: 72%;
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
