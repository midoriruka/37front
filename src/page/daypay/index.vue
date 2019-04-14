<template>
  <div class="daypay-page">
    <div v-title>日多薪</div>
    <div class="daypay-content">
      <div class="daypay-select-box">
        <el-button type="text" style="color: #777;" @click="jumptoposition()">{{position}}<i class="el-icon-caret-bottom"></i></el-button>
        <el-button v-if="isSelectButtonActive" type="text" style="color:rgba(225, 150, 54, 1)" @click="handleSelect">
          筛选<i class="el-icon-caret-top" style="color:rgba(225, 150, 54, 1)"></i>
        </el-button>
        <el-button v-if="!isSelectButtonActive" type="text" style="color: #777;" :class="isSelectButtonActive ? 'button-select': 'button-noselect'" @click="handleSelect">
          筛选<i class="el-icon-caret-bottom"></i>
        </el-button>
      </div>
      <div class="daypay-banner-pic">
        <mt-swipe :auto="4000" style="height: 240px">
          <mt-swipe-item>
            <img :src="bannerList.dayBannerOne" :alt="bannerList.dayBannerOneUrl" class="banner-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="bannerList.dayBannerTwo" :alt="bannerList.dayBannerTwoUrl" class="banner-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="bannerList.dayBannerThree" :alt="bannerList.dayBannerThreeUrl" class="banner-img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="daypay-office-list">
        <div class="daypay-list-item" v-for="(item, index) in officeList" :key="index" @click="jumptoDetail(item)">
          <el-row>
            <el-col :span="5" class="offic-title-img">
              <img :src="item.companyLogo" alt="item.companyLogo">
              <div class="invite">
                {{item.inviteCount}}人
              </div>
            </el-col>
            <el-col :span="12" class="offic-content">
              <div class="item-content-title">
                {{item.officeName}}
              </div>
              <div style="padding-bottom: 8px;">
                {{item.salaryStart}} - {{item.salayEnd}}{{item.salayUnit | unit}}
              </div>
              <div>
                <span class="offic-tag" v-for="(tagItem, indexs) in item.officeTags.split(',')" :key="indexs">
                  {{tagItem | tag}}
                </span>
              </div>
              <div style="color: #777;" class="ellipsis-1">
                {{item.companyName}}
              </div>
            </el-col>
            <el-col :span="7">
              <div style="text-align: center" class="money">
                <el-row>
                  <el-col v-if="item.onPeriod === '1'" :span="14" style="background: rgba(225, 150, 54, 1); color: #fff; border-top-left-radius: 5px;border-bottom-left-radius: 5px; padding: 5px; height: 40px">
                    <div class="item-content-jiang">
                      {{item.amount}}
                    </div>
                    <div>{{item.onPeriod | unitPeriod}}</div>
                  </el-col>
                  <el-col v-if="item.onPeriod === '0'" :span="14" style="background: #e65032; color: #fff; border-top-left-radius: 5px;border-bottom-left-radius: 5px; padding: 5px; height: 40px">
                    <div class="item-content-jiang">
                      {{item.amount}}
                    </div>
                    <div>{{item.onPeriod | unitPeriod}}</div>
                  </el-col>
                  <el-col :span="10" style="background: #eaebed;border-top-right-radius: 5px;border-bottom-right-radius: 5px;line-height: 40px;height: 40px">
                    {{item.onPeriod | period}}
                  </el-col>
                </el-row>
              </div>
              <div style="padding-top: 20px;color: #777;">
                
                更新：{{item.createTime | time}}
              </div>           
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <select-dialog :dialogObject="dialogObject" :selectGroup="dialogGroup" @dialog-click="getDayPayData"></select-dialog>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import moment from 'moment'
import SelectDialog from '@/components/SelectDialog'
import tags from './tags'
export default {
  name: 'Daypay',
  data () {
    return {
      bannerList: {},
      bannerContentOne: {},
      bannerContent: 1,
      officeList: [],
      isSelectButtonActive: false,
      dialogObject: {
        isDialogOpen: false
      },
      dialogGroup: {
        levelNear: [],
        officeTags: [],
        payCycle: [],
        salayNeed: []
      },
      selectCondition: {
        levelNear: 0,
        officeTags: '',
        payCycle: '',
        salayNeed: '',
      },
      position: '区域'
    }
  },
  components: {
    SelectDialog,
    tabbar
  },
  filters: {
    time: (value) => {
      return moment(value).format('YYYY-MM-DD')
    },
    unit: (value) => {
      let text = ''
      switch(value) {
        case '0':
          text = '元/月';
          break;
        case '1':
          text = '元/周';
          break;
        case '2':
          text = '元/天';
          break;
        case '3':
          text = '元/小时';
          break;
        default:
          text = '无'
      }
      return text
    },
    unitPeriod: (value) => {
      let text = ''
      switch(value) {
        case '1':
          text = '元/小时';
          break;
        case '0':
          text = '元';
          break;
        default:
          text = ''
      }
      return text
    },
    period: (value) => {
      let text = ''
      switch(value) {
        case '1':
          text = '工价';
          break;
        case '0':
          text = '补贴';
          break;
        default:
          text = '无'
      }
      return text
    },
    tag: (value) => {
      let text = ''
      for (let i = 0; i < tags.length; i++) {
        if (value == tags[i].value) {
          text = tags[i].label
          break
        }
      }
      return text
    }
  },
  created () {
    this.getDayPayData()
    window.localStorage.getItem('position') ? this.position = window.localStorage.getItem('position') : '区域'
  },
  methods: {
    jumptoposition() {
      this.$router.push('/position')
    },
    jumptoDetail(data) {
      window.localStorage.setItem('officeId', data.officeId)
      this.$router.push('/recruitDetail')
    },
    getDayPayData (selectConditionFromDialog, isDialogClose) {
      if(isDialogClose) {
        this.dialogObject.isDialogOpen = false
        this.isSelectButtonActive = false
      }
      const condition = {
        levelNear: this.selectCondition.levelNear,
        officeTags: this.selectCondition.officeTags,
        payCycle: this.selectCondition.payCycle,
        salayNeed: this.selectCondition.salayNeed
      }
      if (selectConditionFromDialog) {
          condition.levelNear = selectConditionFromDialog.levelNear;
          condition.officeTags = selectConditionFromDialog.officeTags;
          condition.payCycle = selectConditionFromDialog.payCycle
          condition.salayNeed = selectConditionFromDialog.salayNeed
      }
      this.axios({
        method: 'post',
        url: '/api/h5/getDayOfficeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyProvince: '',
          companyCity: window.localStorage.getItem('position') || '',
          levelNear: condition.levelNear,
          officeTags: condition.officeTags,
          payCycle: condition.payCycle,
          salayNeed: condition.salayNeed,
          queStr: ''
        }
      }).then(({data}) => {
        if (data) {
          this.bannerList = data.data.bannerList
          this.officeList = data.data.officeList
        }
      })     
    },
    handleSelect () {
      this.isSelectButtonActive = !this.isSelectButtonActive
      if (this.isSelectButtonActive) {
        this.dialogObject.isDialogOpen = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.daypay-page{
  .daypay-content{
    .daypay-select-box{
      padding: 10px 20px 20px;
      background: #fff;
      height: 60px;
      font-size: 0.5rem;
      line-height: 60px;
      span{
        display: inline-block;
        width: 45%;
        cursor: pointer;
      }
    }
    .daypay-banner-pic{
      padding: 20px;
      margin-top: 2px;
      background: #fff;
      img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }
    .daypay-office-list {
      margin: 10px 0 0;
      background: #fff;
      .daypay-list-item {
        padding: 10px 5%;
        width: 100%;
        .offic-title-img {
          position: relative;
          height: 80px;
          border-radius: 8px;
          img {
            width: 100%;
            height: 80px;
            border-radius: 8px;
          }
          .invite {
            background: rgba(225, 150, 54, 0.5);
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 5px 0;
            text-align: center;
            border-radius: 0 0 8px 8px;
          }
        }
        .offic-content {
          padding-left: 10px;
          .item-content-title {
            font-size: 0.4667rem;
          }
          .offic-tag {
            display: inline-block;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.1);
            padding-left: 5px;
            padding-right: 5px;
            margin-right: 10px;
            color: #777;
          }
        }
      }
    }
  }
}
</style>
