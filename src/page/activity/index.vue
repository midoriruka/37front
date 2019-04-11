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
        <div class="prize" @click="drawLottery(index)" :class="{active:(index === currentIndex)}" v-for="(prize,index) in prizes" :key="index">
          <img class="prize-img" v-if="prize.img" :src="prize.img">
          <span v-else>抽奖</span>
        </div>
      </div>
      <div class="count-tip">
        <span>您可参与抽奖的次数</span><span class="count-tip-num">{{count}}</span><span>次</span>
      </div>
      <div class="winning-record">
        <div class="wr-title">中奖记录</div>
        <ul class="wr-ul">
          <li class="wr-li" v-for="(item,index) in recordList" :key="index">
            <p>{{item.lotteryResult}}</p>
            <p>{{maskName(item.userName)}}</p>
            <p>{{maskPhone(item.userPhone)}}</p>
            <p>{{fommatDate(item.partTime)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
const prizeIndex = [0, 1, 2, 5, 8, 7, 6, 3];
let interval;
const drawTime = 5000;
import { MessageBox } from 'mint-ui';
const prizeMapping = {
  '一等奖': 0,
  '二等奖': 1,
  '三等奖': 2,
  '四等奖': 3,
  '五等奖': 4,
  '六等奖': 5,
  '七等奖': 6,
  '八等奖': 7,
}
export default {
  name: '',
  data() {
    return {
      currentIndex: -1,
      newActivity: false,
      prizes: [{
        img: '1.png'
      }, {
        img: '1.png'
      }, {
        img: '1.png'
      }, {
        img: '1.png'
      }, {
        img: ''
      }, {
        img: '1.png'
      }, {
        img: '1.png'
      }, {
        img: '1.png'
      }, {
        img: '1.png'
      }],
      count: 0,
      recordList: [],

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
      this.userId = userId;
      const { data } = await this.axios.post('/api/h5/getActivityInfo', {
        userId,
      });
      this.newActivity = !!data.activiMap;
      //this.newActivity = true;
      if (this.newActivity) {
        //可抽奖次数
        this.count = data.activiCount ? data.activiCount : 0;
        //中奖记录
        this.recordList = data.recordList;
        this.activityId = data.activiMap.activityId;
        //奖池图片
        this.prizes[0].img = data.activiMap.fristPrizeImage;
        this.prizes[1].img = data.activiMap.secondPrizeImage;
        this.prizes[2].img = data.activiMap.thridPrizeImage;
        this.prizes[5].img = data.activiMap.fourthPrizeImage;
        this.prizes[8].img = data.activiMap.fivePrizeImage;
        this.prizes[7].img = data.activiMap.sexPrizeImage;
        this.prizes[6].img = data.activiMap.sevenPrizeImage;
        this.prizes[3].img = data.activiMap.eighthPrizeImage;
        // this.prizes[0].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[1].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[2].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[3].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[5].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[6].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[7].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
        // this.prizes[8].img = 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg';
      }
      console.log(this.prizes);
    },
    async drawLottery(index) {
      if (!interval) {
        if (index === 4) { //4是抽奖按钮
          let i = parseInt(Math.random() * 8);
          interval = setInterval(() => {
            this.currentIndex = prizeIndex[i];
            if (i == 7) {
              i = 0;
            } else {
              i++;
            }
          }, 100);
          const { data } = await this.axios.post('/api/h5/prizeActivi', {
            userId: this.userId,
            activityId: this.activityId,
          })
          if (data.code === 200) {
            const lotterty = data.data;
            const lastIndex = prizeMapping[lotterty];
            //请求完抽奖接口后drawTime秒停止转
            setTimeout(() => {
              clearInterval(interval);
              interval = null;
              interval = setInterval(() => {
                this.currentIndex = prizeIndex[i];
                if (i === lastIndex) {
                  clearInterval(interval);
                  interval = null;
                  MessageBox.alert('恭喜您，中了'+lotterty+'！');
                } else {
                  if (i === 7) {
                    i = 0;
                  } else {
                    i++;
                  }
                }
              }, 100)
            }, drawTime);
          } else {
            MessageBox.alert('抽奖失败');
          }

        }
      }
    }
  },
  computed: {
    fommatDate(date) {
      return function(date) {
        return moment(date).format('YYYY/MM/DD');
      }
    },
    maskName(name) {
      return function(name) {
        if (!name) {
          name = '';
        }
        return name.replace(/([\u4E00-\u9FA5a-zA-Z0-9])([\u4E00-\u9FA5a-zA-Z0-9]*)/g, '$1**');
      }
    },
    maskPhone(phone) {
      return function(phone) {
        if (!phone) {
          phone = '';
        }
        return phone.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/g, '$1****$3')
      }
    }
  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/activity.scss';

</style>
