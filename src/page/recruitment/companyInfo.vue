<template>
    <div class="index-form" style="background: rgb(255, 255, 255);">
      <el-form ref="form" :model="fieldData" label-width="100px">
        <el-form-item label="企业名称">
          <el-input v-model="fieldData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input v-model="fieldData.companySortName"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="14">
            <el-form-item label="联系人">
              <el-input v-model="fieldData.companyContact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别" label-width="50px">
              <el-select v-model="fieldData.companyContactSex" placeholder="性别">
                <el-option label="先生" value="0"></el-option>
                <el-option label="女士" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系电话">
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
            <el-option v-for="(item,index) in companyNatures" :key="index+'-label'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-form-item label="企业LOGO" label-width="110px">
              <el-input v-model="fieldData.companyLogo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1">
              <el-button size="small" type="primary">浏览</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-form-item label="所属地区">
          <el-input v-model="fieldData.companyContactPhone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="fieldData.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="网站">
          <el-input v-model="fieldData.companyUrl"></el-input>
        </el-form-item>
        <el-form-item label="企业介绍">
          <el-input type="textarea" v-model="fieldData.companyDes"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {InduOption, NatureOption, ScaleOption} from '@/assets/addNewCorporate.js'
    export default {
      name: "companyInfo",
      data(){
        return{
          companyIndus:InduOption,
          companyNatures:NatureOption,
          companyScales:ScaleOption,
          fieldData:{
          }
        }
      },
      mounted(){
        this.$nextTick().then(() => {
          // this.getCompanyInfo();
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
              userId:JSON.parse(window.localstorage.getItem('userMsg')).users.userId,
            }
          }).then((res) => {
            if (res.data.code == 200) {
              console.log(res.data.data);
              this.fieldData = res.data.data
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
.index-form{
  padding-left: 15px;
  padding-right: 15px;
}
</style>
