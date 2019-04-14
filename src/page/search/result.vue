<template>
  <div style="min-height: 100vh; background: #fff;">
    <div style="padding: 5px;">
      >>搜索结果为：
    </div>
    <div v-if="officeList.length > 0">
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
    <div v-else style="text-align: center; margin-top: 200px">
      暂无搜索内容
    </div>
    <div style="margin-top: 20px; text-align: center">
      <el-button @click="jumpto">返回首页</el-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import tags from './tags'
export default {
  data() {
    return {
      officeList: []
    }
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
  created() {
    if (window.localStorage.getItem('searchParams')) {
      this.getSearchList()
    }
  },
  methods: {
    jumpto() {
      this.$router.push('/')
    },
    getSearchList() {
      this.axios({
        method: 'post',
        url: '/api/h5/getCompanyIndexOfficeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.parse(window.localStorage.getItem('searchParams'))
      }).then((res) => {
        if (res.data.code == 200 && res.data.data.officeList && res.data.data.officeList.length > 0) {
          this.officeList = res.data.data.officeList
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>


