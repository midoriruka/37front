<!-- 更多点评 -->
<template>
  <div style="background: #fff; min-height: 100vh;overflow: auto;">
    <div class="user-comment-block">
      <div v-title>更多点评</div>
      <div class="user-comments">
        <div class="user-comment-item" v-for="(comment,i) in commentList" :key="i">
          <div class="uc-item-top">
            <img class="uc-item-top-img" :src="comment.uploadImg">
            <div class="user-info">
              <div class="user-info-n">{{comment.userName}}</div>
              <div class="user-info-d">{{fmtTime(comment.feedTime,'YYYY年MM月DD日')}}</div>
            </div>
          </div>
          <div class="uc-item-content">{{comment.feedContext}}
          </div>
        </div>
      </div>
      <div class="user-comment-btn" @click="$router.push('/reviewDetail')">我来点评</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: '',
  data() {
    return {
      commentList: [/*{
        feedTime: +new Date(),
        uploadImg: 'https://img01.sogoucdn.com/net/a/04/link?appid=100520040&url=https://img04.sogoucdn.com/app/a/100520093/135af7683914878b-0429e3faa7dc75a3-dec813deb352cc0e4941bb54372fde34.jpg',
        userName: '王晓',
        feedContext: '这个bucuo'
      }*/],
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      const officeId = JSON.parse(window.localStorage.getItem('officeId'));
      //请求数据
      const { data } = await this.axios.post('/api/h5/getCommentList', {
        officeId: Number(officeId)
      });
      if (data.code === 200) {
        this.commentList = data.data;
      }
    })
  },
  methods: {

  },
  computed: {
    fmtTime(ms, fmt) {
      return function(ms, fmt) {
        return moment(ms).format(fmt);
      }
    },
  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/moreComments.scss';

</style>
