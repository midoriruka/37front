<template>
  <div class="person-suggest">
    <div v-title>意见反馈</div>
    <div>
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入意见反馈"
        v-model="feedContext">
      </el-input>
    </div>
    <mt-button type="primary" @click="submit()" style="width: 100%; margin-top: 1rem">提交</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      feedContext: ''
    }
  },
  methods: {
    submit() {
      if (!this.feedContext) {
        Toast({
          message: '您还未填写内容',
          
          duration: 2000
        });
        return
      }
      this.axios({
        method: "post",
        url: "/api/h5/feedBack",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        data: {
          feedContext: this.feedContext,
          userId: JSON.parse(window.localStorage.getItem("userMsg")).users.userId,
          loginType: JSON.parse(window.localStorage.getItem("userMsg")).users.loginType
        }
      }).then(res => {
        if (res.data.code == 200) {
          Toast({
            message: '提交成功',
            iconClass: 'icon icon-success'
          });
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500);
        } else {
          MessageBox({
            title: "小提示",
            message: res.data.msg
          })
        }
      }).catch(res => {
        MessageBox({
          title: "小提示",
          message: res.data.msg
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.person-suggest {
  padding: 0.4rem;
  .el-textarea__inner {
    resize: none
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: #fff;
    border-bottom: none;
    background: #e6a03c;
    
  }
  .mint-button--primary {
    background: #e6a03c;
  }
}
</style>

