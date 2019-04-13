<template>
  <div class="index" style="background: rgb(255, 255, 255);">
    <div v-title>我要招聘</div>
    <div class="index-banner">
      <mt-swipe :auto="4000" style="height: 200px">
        <mt-swipe-item>
          <img :src="bannerList.offiBannerOne" :alt="bannerList.offBannerOneUrl" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.offBannerTwo" :alt="bannerList.offBannerTwoUrl" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerList.offBannerThree" :alt="bannerList.offBannerThreeUrl" class="banner-img">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="index-zhaopin">
      <div class="zhaopin" @click="jumpTo('委托招聘')">
        <img :src="weituo.imgUrl" alt="">
        <p>{{weituo.name}}</p>
      </div>
      <div class="zhaopin" @click="jumpTo('企业招聘')">
        <img :src="qiye.imgUrl" alt="">
        <p>{{qiye.name}}</p>
      </div>
    </div>
    <!-- 我要招聘 -->
  </div>
</template>
<script>
  export default {
    components: {},
    data(){
      return{
        bannerList: {},
        weituo:{
          name:'委托招聘',
          imgUrl:require('@/assets/icon/我要招聘/委托招聘.png'),
        },
        qiye:{
          name:'企业招聘',
          imgUrl:require('@/assets/icon/我要招聘/企业招聘.png')
        }
      }
    },
    created(){
      this.getBanner()
    },
    methods:{
      getBanner() {
        this.axios({
          method: 'post',
          url: '/api/h5/getOfficeBanner',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.bannerList = res.data.data
          }
        }).catch((res) => {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        })
      },
      jumpTo(type){
          this.$router.push({
            path: '/recruitment/wtRecruitment/qiye',query:{ type:`${type}`}
          })
      }
    }
  }
</script>
<style lang="scss">
.index{
  min-height: 100vh;
  background: #fff;
  .index-banner {
    padding: 0.2667rem;
    .banner-img {
      border-radius: 10px;
      width: 100%;
      height: 200px;
    }
  }
  .index-zhaopin{
    margin-top: 0.267rem;
    background-color: white;
    display: flex;
    .zhaopin{
      width: 50%;
      text-align: center;
      img{
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
}
</style>
