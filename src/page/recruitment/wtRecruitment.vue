<template>
  <!--委托招聘-->
  <div class="index">
    <div v-title>{{type}}</div>
    <div class="nav">
      <ul class="nav-tab">
        <router-link to="/recruitment/wtRecruitment/qiye" tag="li" class="nav-item">
          <p>企业信息</p>
          <p class="line"></p>
        </router-link>
        <!-- 注意这里的路径，course和order是account的子路由 -->
        <router-link to="/recruitment/wtRecruitment/zhiwei" tag="li" class="nav-item" :class="{active:isActive}">
          <p>企业信息</p>
          <p class="line"></p>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "wtRecruitment",
      data(){
        return{
          isActive:false,
          type:'委托招聘',
        }
      },
      watch: {
        $route(to) {
          if(to.path=='/recruitment/wtRecruitment/modify')
          {
            this.isActive=true;
          }else{
            this.isActive=false;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
 .index{
   background-color: white;
   .nav-tab{
     height: 1.053rem;
     line-height: 1.053rem;
     display: flex;
     padding-left: 0;
     margin: 0;
     .nav-item{
       width: 50%;
       text-align: center;
       font-size: 0.4rem;
       list-style: none;
       p{
         margin-top: 0;
         margin-bottom: 0;
       }
       /*.line{*/
         /*margin-left: 1.5rem;*/
         /*width: 2rem;*/
         /*height:0.1rem;*/
         /*background-color: #e6a03c;*/
       /*}*/
     }
   }
 }
 .active{
   color:#e6a03c;
   .line{
     margin-left: 1.5rem;
     width: 2rem;
     height:0.1rem;
     background-color: #e6a03c;
     border-radius: 1rem;
   }
 }
  .router-link-active{
    color:#e6a03c;
    .line{
      margin-left: 1.5rem;
      width: 2rem;
      height:0.1rem;
      background-color: #e6a03c;
      border-radius: 1rem;
    }
  }
</style>
