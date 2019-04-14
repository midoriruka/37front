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
              <el-input v-model="fieldData.companyLogo"></el-input>
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
        <el-form-item label="厂区" class="item" >
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeAvatarUpload1"
            :show-file-list="false"
            multiple
            :limit="8"
          >
          <el-button size="small" style="color: #e6a03c;border-color: #e6a03c;background-color: white;margin-left:3.5rem;">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="imgs-box">
          <div v-for="(img,i) in companyImage" class="img-wrapper">
            <img class="box-item img" :src="img" :preview="i">
            <div class="remove-btn" @click="remove(i,0)">×</div>
          </div>
          <el-upload action="" class="upload-demo" :on-change="handleChange1" :auto-upload="false" :show-file-list="false">
            <div class="add-btn box-item" slot="trigger">+</div>
          </el-upload>
        </div>
        <el-form-item label="餐厅" class="item" >
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeAvatarUpload2"
            :show-file-list="false"
            multiple
            :limit="8"
          >
            <el-button size="small" style="color: #e6a03c;border-color: #e6a03c;background-color: white;margin-left:3.5rem;">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="imgs-box">
          <div v-for="(img,i) in eatImage" class="img-wrapper">
            <img class="box-item img" :src="img">
            <div class="remove-btn" @click="remove(i,1)">×</div>
          </div>
          <el-upload action="" class="upload-demo" :on-change="handleChange2" :auto-upload="false" :show-file-list="false">
            <div class="add-btn box-item" slot="trigger">+</div>
          </el-upload>
        </div>
        <el-form-item label="宿舍" class="item" >
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeAvatarUpload3"
            :show-file-list="false"
            multiple
            :limit="8"
          >
            <el-button size="small" style="color: #e6a03c;border-color: #e6a03c;background-color: white;margin-left:3.5rem;">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="imgs-box">
          <div v-for="(img,i) in sleepImage" class="img-wrapper">
            <img class="box-item img" :src="img" :preview="i">
            <div class="remove-btn" @click="remove(i,2)">×</div>
          </div>
          <el-upload action="" class="upload-demo" :on-change="handleChange3" :auto-upload="false" :show-file-list="false">
            <div class="add-btn box-item" slot="trigger">+</div>
          </el-upload>
        </div>
        <el-form-item label="工资条" class="item" >
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeAvatarUpload4"
            :show-file-list="false"
            multiple
            :limit="8"
          >
            <el-button size="small" style="color: #e6a03c;border-color: #e6a03c;background-color: white;margin-left:3.5rem;">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="imgs-box">
          <div v-for="(img,i) in salryImage" class="img-wrapper">
            <img class="box-item img" :src="img" :preview="i">
            <div class="remove-btn" @click="remove(i,3)">×</div>
          </div>
          <el-upload action="" class="upload-demo" :on-change="handleChange4" :auto-upload="false" :show-file-list="false">
            <div class="add-btn box-item" slot="trigger">+</div>
          </el-upload>
        </div>
      </el-form>
      <mt-button class="index-btn" type="primary" @click="submit()">保存</mt-button>
    </div>
</template>

<script>
  const acceptType = ['image/png', 'image/jpg', 'image/jpeg'];
  import {InduOption, NatureOption, ScaleOption} from '@/assets/addNewCorporate.js'
  import { MessageBox } from 'mint-ui'
    export default {
      name: "companyInfo",
      data(){
        return{
          companyId:null,
          companyIndus:InduOption,
          companyNatures:NatureOption,
          companyScales:ScaleOption,
          companyImage:[],
          eatImage:[],
          sleepImage:[],
          salryImage:[],
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
      methods: {
        getCompanyInfo() {
          this.axios({
            method: 'post',
            url: '/api/h5/getCompanyInfo',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              companyUserId: JSON.parse(window.localStorage.getItem('userMsg')).users.company_user_id,
            }
          }).then((res) => {
            if (res.data.code == 200 && res.data.data) {
              this.fieldData = res.data.data;
              if(this.fieldData.companyImage){
                this.companyImage=this.fieldData.companyImage.splice(',');
              }
              if(this.fieldData.eatImage){
                this.eatImage=this.fieldData.eatImage.splice(',');
              }
              if(this.fieldData.sleepImage){
                this.sleepImage=this.fieldData.sleepImage.splice(',');
              }
              if(this.fieldData.salryImage){
                this.salryImage=this.fieldData.salryImage.splice(',');
              }
            }
          }).catch((res) => {
            MessageBox({
              title: '小提示',
              message: res.data.msg,
            })
          })
        },
        submit() {
          MessageBox.close();
          if(this.companyImage.length>0){
            this.fieldData.companyImage=this.companyImage.join(',');
          }
          if(this.eatImage.length>0){
            this.fieldData.eatImage=this.eatImage.join(',');
          }
          if(this.sleepImage.length>0){
            this.fieldData.sleepImage=this.sleepImage.join(',');
          }
          if(this.salryImage.length>0){
            this.fieldData.salryImage=this.salryImage.join(',');
          }
          this.fieldData.companyFrom = this.$route.query.type == '委托招聘' ? '1' : '2';
          this.axios({
            method: 'post',
            url: '/api/h5/addEntrust',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: this.fieldData
          }).then((res) => {
            if (res.data.code == 200 && res.data.data) {
              MessageBox({
                title: '提示',
                message: '提交成功！',
              });
              this.$store.commit('setCompanyId', res.data.data)
            }
          }).catch((res) => {
            MessageBox({
              title: '提示',
              message: res.data.msg,
            })
          })
        },
        //上传LOGO
        onchange(file) {
          let fileType = file.name.substring(file.name.lastIndexOf('.'));
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
                  this.fieldData.companyLogo = res.data.data
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
        //企业图片批量上传
        beforeAvatarUpload1(file) {
          MessageBox.close();
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                if (res.data.code == 200) {
                    this.companyImage.push(res.data.data);
                    MessageBox({
                      type: '提示',
                      message: '批量上传厂区图片成功！'
                    })
                  } else {
                  MessageBox({
                    type: '错误',
                    message: '上传失败，请重试！'
                  })
                }
              }).catch(() => {
                MessageBox({
                  type: '错误',
                  message: '上传失败，请重试！'
                })
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        beforeAvatarUpload2(file) {
          MessageBox.close();
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                if (res.data.code == 200) {
                    this.eatImage.push(res.data.data);
                    MessageBox({
                      type: '提示',
                      message: '批量上传食堂图片成功！'
                    })
                  }else {
                  MessageBox({
                    type: '错误',
                    message: '上传失败，请重试！'
                  })
                }
              }).catch(() => {
                MessageBox({
                  type: '错误',
                  message: '上传失败，请重试！'
                })
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        beforeAvatarUpload3(file) {
          MessageBox.close();
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                if (res.data.code == 200) {
                    this.sleepImage.push(res.data.data);
                    MessageBox({
                      type: '提示',
                      message: '批量上传宿舍图片成功！'
                    })
                } else {
                  MessageBox({
                    type: '错误',
                    message: '上传失败，请重试！'
                  })
                }
              }).catch(() => {
                MessageBox({
                  type: '错误',
                  message: '上传失败，请重试！'
                })
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        beforeAvatarUpload4(file) {
          MessageBox.close();
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                if (res.data.code == 200) {
                    this.salryImage.push(res.data.data);
                    MessageBox({
                      type: '提示',
                      message: '批量上传工资条图片成功！'
                    })
                } else {
                  MessageBox({
                    type: '错误',
                    message: '上传失败，请重试！'
                  })
                }
              }).catch(() => {
                MessageBox({
                  type: '错误',
                  message: '上传失败，请重试！'
                })
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        //单张分类型上传
        handleChange1(file) {
          let fileType = file.name.substring(file.name.lastIndexOf('.'));
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(fileType) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = () => {
              let _base64 = reader.result
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
                  this.companyImage.push(res.data.data);
                //将图片路径赋值给src
                this.$previewRefresh();
              }).catch(() => {
                MessageBox({
                  title: 'error',
                  message: '上传失败，请重试1',
                });
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        handleChange2(file) {
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                  this.eatImage.push(res.data.data);
              }).catch(() => {
                MessageBox.error('上传失败，请重试')
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        handleChange3(file) {
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = () => {
              let _base64 = reader.result
              this.axios({
                method: 'post',
                url: '/api/back/uploadFile',
                headers: {
                  'Content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  baseFile: _base64,
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                  this.sleepImage.push(res.data.data);
              }).catch(() => {
                MessageBox.error('上传失败，请重试')
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        handleChange4(file) {
          var testmsg = file.name.substring(file.name.lastIndexOf('.'))
          let typeArr = ['.png', '.jpg', '.jpeg']
          if (typeArr.indexOf(testmsg) > -1) {
            // 上传文件地址，然后赋值给fileForm.waterFile
            let reader = new FileReader()
            reader.readAsDataURL(file.raw)
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
                  baseType: testmsg.substring(1)
                }
              }).then((res) => {
                  this.salryImage.push(res.data.data);
              }).catch(() => {
                MessageBox.error('上传失败，请重试')
              })
            }
          } else {
            MessageBox({
              type: 'error',
              message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
            })
            return
          }
        },
        remove(i,type) {
          switch (type) {
            case 0:
              this.companyImage.splice(i, 1);
              break;
            case 1:
              this.eatImage.splice(i, 1);
              break;
            case 2:
              this.sleepImage.splice(i, 1);
              break;
            case 3:
              this.salryImage.splice(i, 1);
              break;
          }
        },
      }
    }
</script>

<style scoped lang="scss">
  @import '~@/styles/imgUpload.scss';
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
