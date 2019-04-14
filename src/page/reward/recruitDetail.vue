<!-- 招聘详情 -->
<template>
  <div style="background: #fff;min-height: 100vh;">
    <div v-title>招聘详情</div>
    <div class="img-box">
      <swiper :options="swiperOption" ref="swiper" @slideChange="onSlideChange">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img v-show="j===0" v-for="(img,j) in splitImgStr(slide)" class="img-box-item" :src="img" :preview="index" :preview-text="imgTypes[index]">
        </swiper-slide>
      </swiper>
      <!-- 登录用户才能上传 -->
      <div v-show="isUploadBtnShow" class="upload-btn" @click="$router.push('/reward/imgUpload')">上传</div>
      <div class="img-type-box">
        <div v-for="(item,i) in imgTypes" :key="i" @click="onTypeClick(item)" class="img-type-item" :class="{active:item === activeImgType}">
          {{item}}
        </div>
      </div>
    </div>
    <div>
      <div class="top-block">
        <p class="tb-title"><span class="tb-title-cp">{{companyInfo.companyName}}</span><span>{{officeInfo.officeName}}</span></p>
        <p class="tb-salary">{{officeInfo.salaryStart}}元-{{officeInfo.salayEnd}}元/{{officeInfo.salayUnit === '0' ? '天':'小时'}}</p>
        <div class="tb-labels">
          <span class="tb-label-i" v-for="(item,i) in officeTags(officeInfo.officeTags)" :key="i">{{item}}</span>
        </div>
        <!-- 0  入职 1打卡  -->
        <div v-show="backInfo.onManAmount">
          <p class="tb-entry-reward">入职奖励：{{Number(backInfo.onManAmount) >= Number(backInfo.onWomanAmount) ? backInfo.onManAmount:backInfo.onWomanAmount}}{{backInfo.onPeriod}}</p>
          <p class="tb-desc">{{backInfo.onMode === 0 ? '入职':'打卡'}}{{backInfo.onValue}}天，37打工网奖励先进{{Number(backInfo.onManAmount) >= Number(backInfo.onWomanAmount) ? backInfo.onManAmount:backInfo.onWomanAmount}}元<br>活动倒计时：<span class="tb-desc-red">{{countDown}}</span></p>
          <div class="tb-tips">
            <span ><img class="tb-tips-img" src="@/assets/icon/最高奖励/温馨提示.png"></span>
            <span class="tb-tips-red">温馨提示</span>
            <span>打卡拿奖励，到手才是王道！</span>
          </div>
          <div class="tb-period">
            <span class="tb-period-n">周期补</span>
            <span>{{backInfo.onMode === 0 ? '入职':'打卡'}}满{{backInfo.onValue}}天，男：{{backInfo.onManAmount}}元 女：{{backInfo.onWomanAmount}}元</span>
          </div>
        </div>
        <!-- 报名 -->
        <div class="signup-block">
          <p class="su-title">已报名：{{partCount}}人</p>
          <div class="signups">
            <div class="signup-item" v-for="(item,i) in partList" :key="i">
              <div class="su-user-l">
                <img class="su-user-portrait-img" :src="item.user_image_url">
                <span class="su-user-name">{{item.nick_name}}</span>
              </div>
              <span class="su-user-r">{{item.left_phone}}****{{item.right_phone}}</span>
            </div>
          </div>
          <div class="signup-btn" @click="signUp">
            我要报名
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="detail-block">
        <div class="detail-tabbar">
          <div class="detail-tab-i" v-for="(item,i) in detailTabs" :key="i" :class="{active:item === activeTab}" @click="onTabClick(item)">
            {{item}}
          </div>
        </div>
        <div class="detail-title"><span>{{activeTab}}</span><span class="detail-mod-btn" @click="$router.push('/errorCorrection')">我要纠错</span></div>
        <div class="detail-content">
          <!-- 工资说明 -->
          <div v-show="'工资说明' === activeTab" class="sal-detail" v-html="officeInfo.officeDes">
            <!-- <div class="row">
              <div class="cell flexfix">综合薪资</div>
              <div class="flexauto">
                <div class="cell">2500-4500元</div>
                <div class="cell">
                  (1)基本工资：2020元<br>
                  (2)夜班津贴：8元/班<br>
                  (3)绩效奖金：50元/月<br>
                  (4)加班费：2020元计算，1.5倍，2倍，3倍<br>
                  (5)技能津贴：50-200元/月（第1-2个月50元，第3-5个月
                  100元，第6-8个月150元，第九个月以上200元）<br>
                  (6)年资加给：50-200元/月（第1-2个月50元，第3-5个月
                  100元，第6-8个月150元，第九个月以上200元）</div>
              </div>
            </div>
            <div class="row">
              <div class="cell flexfix">发薪日</div>
              <div class="cell">每月10日(26日至25日)</div>
            </div>
            <div class="row">
              <div class="cell flexfix">伙食</div>
              <div class="cell">餐补280元/月，4元的标准餐，当月未用金额在薪资中发放，超额自负。生活区内设有大型员工餐厅，可满足多样化的用餐需求</div>
            </div> -->
          </div>
          <!-- 录用条件 -->
          <div v-show="'录用条件' === activeTab" class="condi-detail" v-html="officeInfo.ofterReason">
            <!-- <div class="row">
              <div class="cell flexfix">年龄</div>
              <div class="cell">16-40岁</div>
            </div>
            <div class="row">
              <div class="cell flexfix">学历要求</div>
              <div class="cell">初中及以上学历</div>
            </div>
            <div class="row">
              <div class="cell flexfix">体检说明</div>
              <div class="cell">厂里指定医院体检，16-18岁体检费60元，18周岁以上体检费50元自理</div>
            </div> -->
          </div>
          <!-- 企业介绍 -->
          <div v-show="'企业介绍' === activeTab" class="comp-intro" v-html="officeInfo.officeIndu">
            <!-- <p>{{officeInfo.officeIndu}}</p> -->
          </div>
        </div>
      </div>
      <div class="map-wrapper">
        <div class="map" id="map"></div>
        <div class="comp-address" @click="locate">
          <div>
            <p class="comp-address-t">公司地址</p>
            <p>{{companyInfo.companyAddress}}</p>
          </div>
          <div class="comp-address-btn">&gt</div>
        </div>
      </div>
      <!-- 分享给好友 -->
      <div class="share-block">
        <span class="share-span">分享给好友</span>
        <span class="share-span"><img class="share-img" src="@/assets/icon/最高奖励/微信.png"></span>
        <span class="share-span"><img class="share-img" src="@/assets/icon/最高奖励/朋友圈.png"></span>
        <span class="share-span"><img class="share-img" src="@/assets/icon/最高奖励/空间.png"></span>
      </div>
      <!-- 用户点评 -->
      <div class="user-comment-block">
        <div class="user-comment-title">用户点评</div>
        <!-- 评论列表 -->
        <div class="user-comments">
          <div class="user-comment-item" v-for="(comment,i) in commentList" :key="i">
            <div class="uc-item-top">
              <img class="uc-item-top-img" :src="comment.userImageUrl">
              <div class="user-info">
                <div class="user-info-n">{{comment.userName}}</div>
                <div class="user-info-d">{{fmtTime(comment.feedTime,'YYYY年MM月DD日')}}</div>
              </div>
            </div>
            <div class="uc-item-content">{{comment.feedContent}}
            </div>
          </div>
        </div>
        <!-- 评论按钮组 -->
        <div class="user-comment-btn-group">
          <div class="user-comment-btn more" @click="$router.push('/reward/moreComments')">更多点评</div>
          <div class="user-comment-btn" @click="$router.push('/reviewDetail')">我来点评</div>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="guess-ur-fav">
        <div class="guess-ur-fav-title">猜你喜欢</div>
        <!-- 猜你喜欢列表 -->
        <div class="gufs">
          <div class="guf-item" v-for="(item,i) in hotOfficeList" :key="i" @click="onOfficeItemClick(item)">
            <div class="guf-l">
              <img class="guf-l-img" :src="item.companyLogo" @click="window.location = item.companyLogo">
              <div class="guf-l-img-desc">{{item.inviteCount}}人</div>
            </div>
            <div class="guf-r">
              <div class="guf-r-t">
                <div class="basic-info">
                  <p class="basic-info-title">{{item.officeName}}</p>
                  <p>{{item.salaryStart}}-{{item.salaryEnd}}元/{{salayUnit === '0' ? '天':'小时'}}</p>
                </div>
                <div class="reward" v-show="item.onAmount">
                  <div class="reward-num">{{item.onAmount}}<br><span class="reward-unit">元/{{item.onPeriod === '1' ? '小时':'天'}}</span></div>
                </div>
              </div>
              <div class="guf-r-b">
                <div class="guf-r-b-labels">
                  <span class="guf-r-b-label-item" v-for="(label,j) in officeTags(item.officeTags)" :key="j">{{label}}</span>
                </div>
                <div class="guf-r-b-footer">
                  <div class="guf-r-b-footer-compname">
                    {{item.companyName}}
                  </div>
                  <div>
                    更新:{{item.createTime}}
                    <!-- {{fmtTime(+new Date(),'YYYY-MM-DD')}} -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="footer">
        <p class="footer-main">
          站点地图<br>
          37打工网-专为打工者服务的招工招聘信息平台<br>
          <br>
          37打工网 37HR.COM ©2012-2017<br>
          苏州叁柒汇信息技术服务有限公司版权所有<br>
          苏ICP备17027824号-<br>
        </p>
        <p class="no-more">真的没有了！</p>
      </div>
      <el-dialog :width="'92%'" :show-close="false" :visible.sync="dialogTableVisible">
        <div slot="title" class="dialog-title">我要报名</div>
        <div class="dialog-content">
          <div class="dialog-form">
            <div class="input-wrapper">
              <img class="input-img" src="@/assets/icon/最高奖励/user.png">
              <input type="text" placeholder="请输入用户名"></div>
            <div class="input-wrapper">
              <img class="input-img" src="@/assets/icon/最高奖励/phone.png">
              <input type="text" placeholder="请输入手机号"></div>
            <div class="input-wrapper">
              <img class="input-img" src="@/assets/icon/最高奖励/valid.png">
              <div>
                <input type="text" placeholder="请输入验证码">
              </div>
              <div class="get-vn-btn">获取验证码</div>
            </div>
          </div>
          <div class="dialog-sign-up-btn">确定报名</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { OFFICE_TAGS } from '@/assets/constant.js';
import { MessageBox } from 'mint-ui';
export default {
  name: '',
  data() {
    return {
      now: +new Date(),
      dialogTableVisible: false,
      detailTabs: ['工资说明', '录用条件', '企业介绍'],
      activeTab: '工资说明',
      imgTypes: ['厂区', '餐厅', '宿舍', '工资条'],
      activeImgType: '厂区',
      commentList: [
        /*{
                feedTime: +new Date(),
                userImageUrl: 'https://img01.sogoucdn.com/net/a/04/link?appid=100520040&url=https://img04.sogoucdn.com/app/a/100520093/135af7683914878b-0429e3faa7dc75a3-dec813deb352cc0e4941bb54372fde34.jpg',
                userName: '王晓',
                feedContent: '这个bucuo'
              },{
                feedTime: +new Date(),
                userImageUrl: 'https://img01.sogoucdn.com/net/a/04/link?appid=100520040&url=https://img04.sogoucdn.com/app/a/100520093/135af7683914878b-0429e3faa7dc75a3-dec813deb352cc0e4941bb54372fde34.jpg',
                userName: '王晓',
                feedContent: '这个bucuo'
              }*/
      ], //评论
      backInfo: {}, //
      companyInfo: {}, //企业信息
      officeInfo: {}, //职位信息
      hotOfficeList: [
        /*{
                officeTags: '3,4,7',
                companyLogo: 'http://p6.qhimg.com/dmfd/160_90_/t01f88419b151733f1c.jpg'
              }*/
      ], //热门职位
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: [],
      partCount: 0, //报名人数
      partList: [], //报名列表
      isUploadBtnShow: false, //是否显示上传按钮
    }
  },
  mounted() {
    this.$nextTick().then(async () => {
      setInterval(() => {
        this.now = +new Date()
      }, 1000);
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      const officeId = this.officeId = JSON.parse(window.localStorage.getItem('officeId'));
      this.isUploadBtnShow = (userMsg && userMsg.users.userId);
      //请求数据
      const { data } = await this.axios.post('/api/h5/getOfficeInfo', {
        officeId: Number(officeId)
      });
      if (data.code === 200) {
        const result = data.data;
        const commentList = result.commentList;
        const backInfo = result.backInfo;
        const hotOfficeList = result.hotOfficeList;
        this.companyInfo = result.companyInfo;
        const { companyImage, sleepImage, eatImage, salryImage } = this.companyInfo;
        this.officeInfo = result.officeInfo;
        //添加厂区、餐厅、宿舍、工资条图片
        this.swiperSlides.push(companyImage, sleepImage, eatImage, salryImage);
        // this.swiperSlides.push(this.getFirstImage(companyImage), this.getFirstImage(sleepImage), this.getFirstImage(eatImage), this.getFirstImage(salryImage));
        if (commentList) {
          this.commentList = commentList;
        }
        if (backInfo) {
          this.backInfo = backInfo;
        }
        if (hotOfficeList) {
          this.hotOfficeList = hotOfficeList;
        }
        this.partCount = result.partCount ? result.partCount : 0;
        this.partList = result.partList ? result.partList : [];
        //加载地图
        this.initMap();
      }
    })
  },
  methods: {


    onTabClick(tab) {
      this.activeTab = tab;
    },
    onTypeClick(type) {
      this.activeImgType = type;
      const index = this.imgTypes.indexOf(type);
      this.swiper.slideTo(index, 1000, false);
    },
    onSlideChange() {
      this.activeImgType = this.imgTypes[this.swiper.activeIndex];
    },
    initMap() {
      this.map = new BMap.Map('map', {
        enableMapClick: false
      });
      this.map.centerAndZoom(this.companyInfo.companyCity, 11);
      this.local = new BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      });
      this.locate();
    },
    locate() {
      this.local.search(this.companyInfo.companyAddress);
    },

    async signUp() {
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      if (userMsg && userMsg.users.userId) {
        //直接报名
        const { data } = await this.axios.post('/api/h5/partOfiice', {
          companyId: this.companyInfo.companyId,
          userId: userMsg.users.userId,
          officeId: Number(this.officeId)
        })
        if (data.code === 200) {
          //跳转到报名成功页面
          window.localStorage.removeItem('signCanvas');
          window.localStorage.setItem('officeId', officeId);
          this.$router.push('/sign');
        } else {
          MessageBox.alert('报名失败:' + data.msg);
        }
      } else {
        //跳转到登录页
        this.$router.push('/login')
        //弹出对话框

        // this.dialogTableVisible = true;
      }
    }
  },
  computed: {
    countDown() {
      //结束时间
      const endTime = this.backInfo.endTime;
      const ms = moment(endTime, 'YYYY-MM-DD HH:mm:ss').diff(moment(this.now));
      if (ms < 0) {
        return '已结束';
      }
      let second = ms / 1000;
      let minute = second / 60;
      let hour = parseInt(minute / 60);
      minute = (parseInt(minute % 60) + '').padStart(2, 0);
      second = (parseInt(second % 60) + '').padStart(2, 0);
      return `${hour}:${minute}:${second}`;
    },
    getFirstImage(imgStr) {
      return function(imgStr) {
        const imgs = imgStr.split(',');
        if (imgs.length > 0) {
          return imgs[0];
        } else {
          return "";
        }

      }
    },
    splitImgStr(imgStr) {
      return function(imgStr) {
        const imgs = imgStr.split(',');
        if (imgs.length > 0) {
          return imgs;
        } else {
          return [];
        }
      }
    },
    fmtTime(ms, fmt) {
      return function(ms, fmt) {
        return moment(ms).format(fmt);
      }
    },
    officeTags(rawTags) {
      return function(rawTags) {
        if (rawTags) {
          const tags = rawTags.split(',');
          if (tags.length > 0) {
            return OFFICE_TAGS.filter(t => tags.includes(t.index)).map(t => t.name);
          } else {
            return [];
          }
        } else {
          return [];
        }

      }
    },
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  components: {
    swiper,
    swiperSlide,
  }

}

</script>
<style scoped lang='scss'>
@import '~@/styles/recruitDetail.scss';

</style>
