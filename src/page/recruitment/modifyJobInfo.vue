<template>
    <div class="index">
      <el-form ref="form" :model="jobInfo" label-width="2rem" label-position="left">
        <el-form-item label="职位名称" class="item">
          <el-input v-model="jobInfo.officeName"></el-input>
        </el-form-item>
        <el-form-item label="职位类别" class="item">
          <el-input v-model="jobInfo.officeType"></el-input>
        </el-form-item>
        <el-row style="padding-right: 0.5rem">
          <el-col :span="12">
            <el-form-item label="招聘人数">
              <el-input v-model="jobInfo.inviteCount">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="ren">人</el-col>
          <el-col :span="10">
            <el-form-item label="性别" label-width="1rem">
              <el-select v-model="jobInfo.inviteSex">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="学历" class="item">
          <el-select v-model="jobInfo.inviteEdu">
            <el-option v-for="(item,index) in education" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" class="item">
          <el-select v-model="jobInfo.inviteWorkYears">
            <el-option v-for="(item,index) in workYear" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-row style="padding-right: 0.5rem">
          <el-col :span="10">
            <el-form-item label="年龄">
              <el-input v-model="jobInfo.inviteStartAge">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="10">
            <el-form-item label-width="0">
              <el-input v-model="jobInfo.inviteEndAge">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-right: 0.5rem">
          <el-col :span="10">
            <el-form-item label="薪资">
              <el-input v-model="jobInfo.inviteStartAge">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="10">
            <el-form-item label-width="0">
              <el-input v-model="jobInfo.inviteEndAge">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line">元/月</el-col>
        </el-row>
        <el-form-item label="摘要" style="padding-right: 0.5rem">
          <el-input type="textarea" v-model="jobInfo.officeIndu" placeholder="255个字符以内" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="工资说明"  style="padding-right: 0.5rem">
          <el-input type="textarea" v-model="jobInfo.officeDes" placeholder="请输入工资说明"></el-input>
        </el-form-item>
        <el-form-item label="录用条件"  style="padding-right: 0.5rem">
          <el-input type="textarea" v-model="jobInfo.ofterReason" placeholder="请输入录用条件"></el-input>
        </el-form-item>
      </el-form>
      <mt-button class="index-btn" type="primary">保存</mt-button>
      <mt-button class="index-btn" type="primary">删除职位</mt-button>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
    export default {
      name: "modifyJobInfo",
      data(){
        return{
          education:[
            {
            label:'不限',
            value:'0'
          },{
            label:'初中',
            value:'1'
          },{
            label:'高中',
            value:'2'
          },{
            label:'中专/技校',
            value:'3'
          },{
            label:'大专',
            value:'4'
          },{
            label:'本科',
            value:'5'
          },{
            label:'硕士及以上',
            value:'6'
          },
          ],
          workYear:[ {
            label:'不限',
            value:'0'
          },{
            label:'1年以内',
            value:'1'
          },{
            label:'1-3年',
            value:'2'
          },{
            label:'3-5年',
            value:'3'
          },{
            label:'5-10年',
            value:'4'
          }],
          jobInfo:{}
        }
      },
      mounted(){
        this.$nextTick().then(() => {
          if(this.$route.query.type=='add'){
            this.jobInfo={}
          }else{

          }
          // this.getJobInfo();
        })
          console.log(this.$route.query.type)
      }
    }
</script>

<style scoped lang="scss">
.index{
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  .item{
    width: 9rem;
  }
  .index-btn{
    width: 3.2rem;
    height: 1.067rem;
    margin-top: 1rem;
    margin-left: 1rem;
    background-color: #e6a03c;
    font-size: 0.32rem;
  }
}
</style>
<style lang="scss">
  .el-input{
    height:1rem;
  }
  .el-input__inner{
    border: 0;
  }
  .el-form-item__content{
    line-height: 0;
  }
  .el-form-item__label{
    padding-top: 0.3rem;
    width: 1.067rem;
    height: 0.307rem;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    line-height: 0.4rem;
    color: #969696;
  }
  .el-col-2{
    padding-top: 0.3rem;
  }
  .el-col-4{
    padding-top: 0.3rem;
  }
</style>
