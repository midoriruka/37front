<template>
  <div class="search-body">
    <div class="search-noresult">
      <mt-search v-model="searchContent"></mt-search>
      <div style="padding-left: 10px;">
        <div class="near-me">
          <el-checkbox-group v-model="selectGroup.levelNear">
            <el-checkbox-button v-for="near in nears" :label="near.value" :key="near.value">{{near.label}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="basic-welfare">
          <div class="select-title">基本福利</div>
          <el-checkbox-group v-model="selectGroup.officeTags">
            <el-checkbox-button v-for="welfare in welfares" :label="welfare.value" :key="welfare.value">{{welfare.label}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="account-way">
          <div class="select-title">结算方式</div>
          <el-checkbox-group v-model="selectGroup.payCycle">
            <el-checkbox-button v-for="account in accounts" :label="account.value" :key="account.value">{{account.label}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="pay-require">
          <div class="select-title">薪资要求</div>
          <el-checkbox-group v-model="selectGroup.salayNeed">
            <el-checkbox-button v-for="pay in pays" :label="pay.value" :key="pay.value">{{pay.label}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jumpTo">返回</el-button>
          <el-button @click="handleResetDialog">重置</el-button>
          <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
        </span>
      </div>
    </div>

    
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchContent: '',
      selectGroup: {
        levelNear: [],
        officeTags: [],
        payCycle: [],
        salayNeed: []
      },
      nears: [
        {
          label: '离我最近',
          value: 1
        }
      ],
      welfares: [
        {
          label: '包住宿',
          value: 1
        },
        {
          label: '包用餐',
          value: 2
        },
        {
          label: '缴纳社保',
          value: 3
        },
        {
          label: '免费体检',
          value: 4
        },
        {
          label: '用餐补贴',
          value: 5
        },
        {
          label: '住房补贴',
          value: 6
        },
        {
          label: '班车接送',
          value: 7
        }
      ],
      accounts: [
        {
          label: '按月结',
          value: 1
        },
        {
          label: '按天结',
          value: 2
        },
        {
          label: '按小时结',
          value: 3
        }
      ],
      pays: [
        {
          label: '薪资不限',
          value: 1
        },
        {
          label: '2000-3000',
          value: 2
        },
        {
          label: '3000-5000',
          value: 3
        },
        {
          label: '5000-8000',
          value: 4
        },
        {
          label: '8000以上',
          value: 5
        }
      ]
    }
  },

  created() {
    window.localStorage.removeItem('searchParams')
  },

  methods: {
    jumpTo() {
      this.$router.go(-1)
    },
     // 重置选项
    handleResetDialog() {
      this.selectGroup.levelNear = []
      this.selectGroup.officeTags = []
      this.selectGroup.payCycle = []
      this.selectGroup.salayNeed = []
    },

    handleSubmitDialog () {
      const selectCondition = {
        levelNear: 0,
        officeTags: '',
        payCycle: '',
        salayNeed: '',
      }
      this.selectGroup.levelNear.forEach(item => {
        selectCondition.levelNear = item ? item : 0
      });
      this.selectGroup.officeTags.forEach((item, index) => {
        if(index !== this.selectGroup.officeTags.length -1) {
          selectCondition.officeTags += `${item},`
        } else {
          selectCondition.officeTags += `${item}`
        }
      })
      this.selectGroup.payCycle.forEach((item, index) => {
        if(index !== this.selectGroup.payCycle.length -1) {
          selectCondition.payCycle += `${item},`
        } else {
          selectCondition.payCycle += `${item}`
        }
      })
      this.selectGroup.salayNeed.forEach((item, index) => {
        if(index !== this.selectGroup.salayNeed.length -1) {
          selectCondition.salayNeed += `${item},`
        } else {
          selectCondition.salayNeed += `${item}`
        }
      })
      selectCondition.queStr = this.searchContent
      window.localStorage.setItem('searchParams', JSON.stringify(selectCondition))
      this.$router.push('/search/result')
    }
  }
 
}
</script>
<style lang="less" scoped>
.mint-search {
  height: 44px;
}
.search-body {
  background: #fff;
  min-height: 100vh;
  .select-title{
    margin-left: 4px;
    font-size: 0.42rem;
    line-height: 30px;
    color: #333;
  }
  /deep/ .el-checkbox-group{
    background: #fff;
    color: #333;
    border: 0;
    margin-bottom: 16px;
    /deep/ .el-checkbox-button{
      margin: 6px 4px;
      /deep/ .el-checkbox-button__inner{
        width: 110px;
        background: rgb(243, 244, 249);
        color: rgb(154, 155, 156);
        font-size: 0.42rem;
      }
    }
    /deep/ .el-checkbox-button .el-checkbox-button__inner{
      border: none;
      box-shadow: none;
      border-radius: 4px;
    }
    .is-checked{
      /deep/ .el-checkbox-button__inner {
        background: #fae3c1;
        color: #e6a03c;
      }
    }
  }
  /deep/ .dialog-footer{
    text-align: center;
    display: block;
    .el-button {
      // width: 150px;
      color: #969696;
      border-color: #f5f5f9;
      background-color: #f5f5f9;
    }
    .el-button:focus, .el-button:hover {
      color: #969696;
      border-color: #f5f5f9;
      background-color: #f5f5f9;
    }
    .el-button--primary { 
      color: #FFF;
      background-color: #e6a03c;
      border-color: #e6a03c;
    }
    .el-button--primary:hover { 
      color: #FFF;
      background-color: #e6a03c;
      border-color: #e6a03c;
    }
  }
}
  

</style>

