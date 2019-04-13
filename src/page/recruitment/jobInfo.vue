<template>
    <div class="index">
      <table width="100%">
        <tr>
          <th>职位名称</th>
          <th>薪资范围</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in jobData" :key="index+'-label'">
          <td>{{item.officeName}}</td>
          <td>{{item.salaryStart}}-{{item.salayEnd}}</td>
          <td>
            <span @click="editJobInfo('修改职位',item.officeId)">修改</span>
            <span @click="deleteJobInfo(item.officeId)">删除</span>
          </td>
        </tr>
      </table>
      <mt-button class="index-btn" type="primary" @click="editJobInfo('增加职位')">增加职位</mt-button>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
    export default {
      name: "jobInfo",
      data(){
        return{
          jobData:[{
            officeName:'司机',
            salaryStart:2000,
            salayEnd:5000
          }],
        }
      },
      mounted(){
        this.$nextTick().then(() => {
          // this.getJobInfo();
        })
      },
      methods:{
        getJobInfo() {
          this.axios({
            method: 'post',
            url: '/api/h5/officeList',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data:{
              companyId:this.$store.state.companyId
            }
          }).then((res) => {
            if (res.data.code == 200) {
              this.jobData = res.data.data
            }
          }).catch((res) => {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          })
        },
        editJobInfo(type,officeId){
            this.$router.push({
              path: '/recruitment/wtRecruitment/modify',query:{ type:`${type}`,officeId:officeId}
            })
        },
        deleteJobInfo(id){
          this.axios({
            method: 'post',
            url: '/api/h5/delOffice',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data:{
              officeId: id
            }
          }).then((res) => {
            if (res.data.code == 200) {
              MessageBox({
                title: '提示',
                message: '删除成功！',
              })
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

<style scoped lang="scss">
.index{
  min-height: 100vh;
  background: #fff;
  text-align: center;
  table{
    th{
      width:3rem;
      height: 1rem;
      font-family: PingFangSC-Medium;
      font-size: 0.32rem;
      line-height: 0.4rem;
      color: #323232;
    }
    td{
      width:3rem;
      height: 1rem;
      font-family: PingFangSC-Regular;
      font-size: 0.32rem;
      line-height: 0.4rem;
      color: #323232;
      &:last-child{
        color: #e6a03c;
      }
    }
  }
  .index-btn{
    width: 3.2rem;
    height: 1.067rem;
    margin-top: 1rem;
    background-color: #e6a03c;
    font-size: 0.32rem;
  }
}
</style>
