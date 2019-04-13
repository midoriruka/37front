<template>
    <div class="index-form">
      <el-form ref="form" :model="fieldData" label-width="2.6rem" label-position="left">
        <el-form-item label="企业名称" class="item">
          <el-input v-model="fieldData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" class="item">
          <el-input v-model="fieldData.companySortName"></el-input>
        </el-form-item>
        <el-row style="padding-right: 0.5rem">
          <el-col :span="14">
            <el-form-item label="联系人">
              <el-input v-model="fieldData.companyContact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别" label-width="1.5rem">
              <el-select v-model="fieldData.companyContactSex" placeholder="性别">
                <el-option label="先生" value="0"></el-option>
                <el-option label="女士" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系电话" class="item">
          <el-input v-model="fieldData.companyContactPhone"></el-input>
        </el-form-item>
        <el-form-item label="工资发放周期">
          <el-select v-model="fieldData.payCycle" placeholder="按月">
            <el-option label="按月" value="0"></el-option>
            <el-option label="按日" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业">
          <el-select v-model="fieldData.companyIndu" placeholder="所属行业">
            <el-option v-for="(item,index) in companyIndus" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司性质">
          <el-select v-model="fieldData.companyNature" placeholder="公司性质">
            <el-option v-for="(item,index) in companyNatures" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司规模">
          <el-select v-model="fieldData.companyScale" placeholder="公司规模">
            <el-option v-for="(item,index) in companyScales" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-form-item label="企业LOGO">
              <el-input v-model="imgUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--<input type="text">-->
            <el-upload
              :auto-upload=false
              :on-change="onchange"
              action=""
              :limit="1">
              <el-button size="small" style="color: #e6a03c;border-color: #e6a03c;background-color: white;margin-left:0.3rem;">浏览</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="所属地区" label-width="2rem">
              <el-input v-model="fieldData.companyProvince"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省" label-width="0.5rem">
              <el-input v-model="fieldData.companyCity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="市" label-width="0.5rem">
              <el-input v-model="fieldData.companyArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-top: 0.3rem;color: #969696">
            <span>区</span>
          </el-col>
        </el-row>
        <el-form-item label="详细地址" class="item">
          <el-input v-model="fieldData.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="网站" class="item">
          <el-input v-model="fieldData.companyUrl"></el-input>
        </el-form-item>
        <el-form-item label="企业介绍" class="item" >
          <el-input type="textarea" v-model="fieldData.companyDes" placeholder="请输入企业介绍"></el-input>
        </el-form-item>
      </el-form>
      <mt-button class="index-btn" type="primary" @click="submit()">保存</mt-button>
    </div>
</template>

<script>
  import {InduOption, NatureOption, ScaleOption} from '@/assets/addNewCorporate.js'
  import { MessageBox } from 'mint-ui'
    export default {
      name: "companyInfo",
      data(){
        return{
          imgUrl:null,
          companyId:null,
          companyIndus:InduOption,
          companyNatures:NatureOption,
          companyScales:ScaleOption,
          fieldData:{
            companyUserId:`${JSON.parse(window.localStorage.getItem('userMsg')).users.company_user_id}`,
          }
        }
      },
      mounted(){
        this.$nextTick().then(() => {
          this.getCompanyInfo();
        })
      },
      methods:{
        getCompanyInfo(){
          this.axios({
            method: 'post',
            url: '/api/h5/getCompanyInfo',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data:{
              companyUserId:JSON.parse(window.localStorage.getItem('userMsg')).users.company_user_id,
            }
          }).then((res) => {
            if (res.data.code == 200 && res.data.data) {
              console.log(res.data.data);
              this.fieldData = res.data.data;
            }
          }).catch((res) => {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          })
        },
        submit(){
          this.fieldData.companyFrom= this.$route.query.type =='委托招聘'?'1':'2';
          this.axios({
            method: 'post',
            url: '/api/h5/addEntrust',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: this.fieldData
          }).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 200 && res.data.data) {
              MessageBox({
                title: '提示',
                message: '提交成功！',
              });
             this.$store.commit('setCompanyId',res.data.data)
            }
          }).catch((res) => {
            MessageBox({
              title: '提示',
              message: res.data.msg,
            })
          })
        },
        onchange(file) {
          this.imgUrl=file.name;
          this.fieldData.companyLogo=file.name;
          console.log(this.fieldData.companyLogo);
          let fileType=file.name.substring(file.name.lastIndexOf('.'));
          console.log(fileType);
          let typeArr = ['.png', '.jpg', '.jpeg'];
          if (typeArr.indexOf(fileType) > -1) {
            let reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = () => {
              let _base64 = reader.result;
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: fileType.substring(1)
                }
              }).then((res) => {
                if (res.data.code == 200) {
                  return;
                } else {
                  MessageBox({
                    title: 'error',
                    message: '上传失败，请重试',
                  });
                }
              }).catch(() => {
                MessageBox({
                  title: 'error',
                  message: '上传失败，请重试',
                });
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求，请重新上传'
            })
          }
          },
        },
    }
</script>

<style scoped lang="scss">
.index-form{
  min-height: 100vh;
  background: #fff;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  .item{
    width: 9rem;
  }
  .index-btn{
    width: 3.2rem;
    height: 1.067rem;
    margin: 1rem 0 1rem 3rem;
    background-color: #e6a03c;
    font-size: 0.32rem;
  }
}
</style>
<style lang="scss">
  .el-upload-list{
    display: none;
  }
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
