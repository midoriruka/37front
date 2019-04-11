<template>
    <!--委托招聘-->
  <div class="index">
    <div v-title>委托招聘</div>
    <div class="nav">
      <ul class="nav-tab">
        <router-link to="/recruitment/wtRecruitment/qiye" tag="li" class="nav-item">企业信息</router-link>
        <!-- 注意这里的路径，course和order是account的子路由 -->
        <router-link to="/recruitment/wtRecruitment/zhiwei" tag="li" class="nav-item">职位信息</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "wtRecruitment",
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
     .nav-item{
       width: 50%;
       text-align: center;
       font-size: 0.4rem;
       list-style: none;
     }
   }
 }
  .router-link-active{
    color:#e6a03c;
  }
</style>
