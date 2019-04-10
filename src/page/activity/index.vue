<!-- 最新活动 -->
<template>
  <div>
    <div v-title>最新活动</div>
    <div v-if="!newActivity" class="no-activity">
      <div>
        <img class="no-activity-img" src="@/assets/icon/最新活动/最新活动.png">
      </div>
        <div class="no-activity-desc">
          <span>敬请期待新活动</span>
        </div>
        <div class="no-activity-footer">
          <p>
            站点地图<br>
            37打工网-专为打工者服务的招工招聘信息平台<br>
          </p>
          <p>
            37打工网 37HR.COM ©2012-2017<br>
            苏州叁柒汇信息技术服务有限公司版权所有<br>
            苏ICP备17027824号-
          </p>
        </div>
      </div>
      <div v-else class="activity">
        <div class="pool">
          <div class="prize" v-for="(prize,index) in prizes" :key="index">
            <img v-if="prize.img" src="">
            <span v-else>抽奖</span>
          </div>
        </div>
        <div class="count-tip">
          <span>您可参与抽奖的次数</span><span class="count-tip-num">{{count}}</span><span>次</span>
        </div>
        <div class="winning-record">
          <div class="wr-title">中奖记录</div>
          <ul class="wr-ul">
            <li class="wr-li" v-for="(item,index) in 3" :key="index">
              <p>一等奖</p>
              <p>张**</p>
              <p>188****8888</p>
              <p>2019/01/02</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      newActivity: true,
      prizes: [{

      }, {

      }, {

      }, {

      }, {

      }, {

      }, {

      }, {

      }, {

      }],
      count: 0,
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getActivityInfo();
    })
  },
  methods: {
    async getActivityInfo() {
      //获取用户ID
       const userId = JSON.parse(window.localStorage.getItem('userMsg')).users.userId;
      const { data } = await this.axios.post('/api/h5/getActivityInfo',{
        userId,
      });
      console.log(data);
    }
  },
  computed: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/activity.scss';

</style>
