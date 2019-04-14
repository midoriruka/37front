<template>
  <div class="underline-userlist">
    <div v-title>客户列表</div>
    <el-table
      :data="tableData"
      header-row-class-name="userlist-table-heade">
      <el-table-column
        prop="userName"
        label="姓名"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="电话"
        width="110"
      >
      </el-table-column>
      <el-table-column
        prop="offlineStatus"
        label="当前状态">
        </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
        <el-button
            @click.native.prevent="jumpto(scope.$index, tableData)"
            type="text"
            size="small">
            处理
          </el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { userStatus } from '@/assets/constant.js';
export default {
  name:"userlist",
  data(){
    return{
      tableData: []
    }
  },
  created(){
    if(JSON.parse(window.localStorage.getItem('underLineUserMsg')) === null){
      this.$router.push({
        path: "/underline/login"
      })   
    }else{
      this.getData();
    }
  },
  methods:{
    getStatus(id){
      return userStatus.filter(item => item.index === id)
    },
    jumpto(index,tableData){
      window.localStorage.setItem('orderId', this.tableData[index].orderId);
      window.localStorage.setItem('userId', this.tableData[index].userId);
      this.$router.push({
        path: "/underline/useredit"
      })    
    },
    getData() {
      const userId = JSON.parse(window.localStorage.getItem('underLineUserMsg')).userInfo.userId;
      this.axios({
        method: 'post',
        url: '/api/off/OfflineUserLiset',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          if(res.data.data.length>0){
            const dataRest = res.data.data.map((item,index)=>{
              return{
                userName:item.userName,
                userPhone:item.userPhone,
                offlineStatus:this.getStatus(item.offlineStatus)[0].name,
                orderId:item.orderId,
                userId:item.userId
              }
            })
            this.tableData = dataRest;
          }else{
            this.tableData = []
          };
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.underline-userlist{
  height:100vh;
  background: #fff;
  padding: 0.5rem;
}

</style>
<style lang="less">
.underline-userlist {
  .el-table thead{
    color:#323232;
  }
  .el-table
  .el-table__header{
    width:98% !important;
  }
  .el-table--scrollable-x .el-table__body-wrapper{
    overflow: hidden;
  }
  .el-table__row td{
    font-size: 0.3rem;
  }
  .el-table__body{
    width:98% !important;
  }
}
.userlist-table-heade th{
  background: #f5f5f9;
  color:#323232;
  font-size: 0.3rem;
  font-weight: normal;
}
</style>
