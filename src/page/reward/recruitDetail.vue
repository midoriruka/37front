<!-- 招聘详情 -->
<template>
  <div style="background: #fff;">
    <div v-title>招聘详情</div>
    <div class="img-box">
      <div class="upload-btn">上传</div>
      <div class="img-type-box">
        <div v-for="(item,i) in imgTypes" :key="i"
          class="img-type-item"
          :class="{active:item === activeImgType}">
          {{item}}
        </div>
      </div>
    </div>
    <div>
      <div class="top-block">
        <p class="tb-title"><span class="tb-title-cp">无锡夏普</span><span>操作工</span></p>
        <p class="tb-salary">4000元-5000元/月</p>
        <div class="tb-labels">
          <span class="tb-label-i" v-for="(item,i) in 3" :key="i">五险一金</span>
        </div>
        <p class="tb-entry-reward">入职奖励：1500元</p>
        <p class="tb-desc">打卡60天，37打工网奖励先进1500元<br>活动倒计时：<span class="tb-desc-red">00:00:00</span></p>
        <div class="tb-tips">
          <span ><img class="tb-tips-img" src="@/assets/icon/最高奖励/温馨提示.png"></span>
          <span class="tb-tips-red">温馨提示</span>
          <span>打卡拿奖励，到手才是王道！</span>
        </div>
        <div class="tb-period">
          <span class="tb-period-n">周期补</span>
          <span>入职满55天，男：1400元 女：1600元</span>
        </div>
        <!-- 报名 -->
        <div class="signup-block">
          <p class="su-title">已报名：500人</p>
          <div class="signups">
            <div class="signup-item" v-for="(item,i) in 5" :key="i">
              <div class="su-user-l">
                <img class="su-user-portrait-img">
                <span class="su-user-name">大王找我来巡山</span>
              </div>
              <span class="su-user-r">18888888888</span>
            </div>
          </div>
          <div class="signup-btn">
            我要报名
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="detail-block">
        <div class="detail-tabbar">
          <div class="detail-tab-i"
            v-for="(item,i) in detailTabs" :key="i" :class="{active:item === activeTab}"
            @click="onTabClick(item)">
            {{item}}
          </div>
        </div>
        <div class="detail-title"><span>{{activeTab}}</span><span class="detail-mod-btn">我要纠错</span></div>
        <div class="detail-content">
          <!-- 工资说明 -->
          <div v-show="'工资说明' === activeTab" class="sal-detail">
            <div class="row">
              <div class="cell flexfix">综合薪资</div>
              <div>
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
            </div>
          </div>
          <!-- 录用条件 -->
          <div v-show="'录用条件' === activeTab" class="condi-detail">
            <div class="row">
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
            </div>
          </div>
          <!-- 企业介绍 -->
          <div v-show="'企业介绍' === activeTab" class="comp-intro">
            <p>苏州东山精密制造股份有限公司成立于1998年，由苏州市东山钣金有限责任公司整体变更设立。本公司作为国内较早进入精密制造服务行业的企业，主要面向包括通讯设备、新能源、精密机床制造等行业的客户提供包括精密钣金件、精密铸件和组配产品及技术服务，其中精密钣金件是公司的主导产品。</p>
          </div>
        </div>
      </div>
      <div class="map-wrapper">
        <div class="map" id="map"></div>
        <div class="comp-address">
          <div>
            <p class="comp-address-t">公司地址</p>
            <p>苏州市吴中区东山镇凤凰山路8号</p>
          </div>
          <div class="comp-address-btn">&gt</div>
        </div>
      </div>
      <!-- 分享给好友 -->
      <div class="share-block">
        <span class="share-span">分享给好友</span>
        <span class="share-span"><img class="share-img"></span>
        <span class="share-span"><img class="share-img"></span>
        <span class="share-span"><img class="share-img"></span>
      </div>
      <!-- 用户点评 -->
      <div class="user-comment-block">
        <div class="user-comment-title">用户点评</div>
        <!-- 评论列表 -->
        <div class="user-comments">
          <div class="user-comment-item"
            v-for="(item,i) in 3" :key="i">
            <div class="uc-item-top">
              <img class="uc-item-top-img" >
              <div class="user-info">
                <div class="user-info-n">大王找我来巡山</div>
                <div class="user-info-d">2019-01-12</div>
              </div>
            </div>
            <div class="uc-item-content">工资待遇高，工作环境不错，节假日发放福利工资待遇高，工作环境不错，节假日发放福利
            </div>
          </div>
        </div>
        <!-- 评论按钮组 -->
        <div class="user-comment-btn-group">
          <div class="user-comment-btn more">更多点评</div>
          <div class="user-comment-btn">我来点评</div>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="guess-ur-fav">
        <div class="guess-ur-fav-title">猜你喜欢</div>
        <!-- 猜你喜欢列表 -->
        <div class="gufs">
          <div class="guf-item"
            v-for="(item,i) in 2" :key="i">
            <div class="guf-l">
              <img class="guf-l-img">
            </div>
            <div class="guf-r">
              <div class="guf-r-t">
                <div class="basic-info">
                  <p class="basic-info-title">无锡夏普操作工</p>
                  <p>4000-5000元/月</p>
                </div>
                <div class="reward">
                  <img>
                  <div>1500元</div>
                </div>
              </div>
              <div class="guf-r-b">
                <div class="guf-r-b-labels">
                  <span class="guf-r-b-label-item" v-for="(item,i) in 3" :key="i">五险一金</span>
                </div>
                <div class="guf-r-b-footer">
                  <div class="guf-r-b-footer-compname">
                    无锡夏普电子元器件有限公司
                  </div>
                  <div>
                    更新:02-01
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
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      detailTabs: ['工资说明', '录用条件', '企业介绍'],
      activeTab: '工资说明',
      imgTypes: ['厂区', '餐厅', '宿舍', '工资条'],
      activeImgType: '厂区',
    }
  },
  mounted() {
    this.$nextTick().then(() => {

    })
  },
  methods: {
    onTabClick(tab) {
      this.activeTab = tab;
    }
  },
  computed: {

  },
  watch: {

  },
  components: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/recruitDetail.scss';

</style>
