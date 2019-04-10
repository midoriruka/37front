<!-- 最新活动 -->
<template>
  <div>
    <div v-title>最新活动</div>
    <div v-if="!hasActivity" class="no-activity">
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
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      hasActivity: false,
    }
  },
  mounted() {
    this.$nextTick().then(() => {

    })
  },
  methods: {

  },
  computed: {

  },
  components: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/activity.scss';

</style>
