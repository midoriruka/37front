<template>
  <div class="page">
    <EditHead @submit="submit"></EditHead>
    <div style="padding-bottom: 30px;">
      <UploadImg :userUrl="companyUserInfo.userHeadImage" @callBackUpload="callBackUpload"></UploadImg>
      <div>
        <mt-field label="企业名称" placeholder="请输入公司名称" v-model="companyUserInfo.companyName"></mt-field>
        <mt-field label="企业简称" placeholder="请输入公司简称" v-model="companyUserInfo.companySort"></mt-field>
        <mt-field label="联系人" placeholder="请输入性别" v-model="companyUserInfo.companyContact"></mt-field>
        <EditPhone label="联系电话" :companyContactPhone="companyUserInfo.companyContactPhone" @callBack="callBack"></EditPhone>
        <!--<mt-field label="联系电话" placeholder="请输入联系电话" v-model="companyUserInfo.companyContactPhone"></mt-field>-->
        <Selector label="工资发放周期"
                  type="userNation"
                  :option="configData.payCycle"
                  :defaultIndexPro="defaultIndexProNation"
                  @changeValue="changeValue"
                  :seleValuePro="configData.payCycle[defaultIndexProNation]"></Selector>
        <Selector label="所属行业"
                  type="companyIndu"
                  :option="configData.companyIndu"
                  :defaultIndexPro="defaultIndexProUserEdu"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyIndu[defaultIndexProUserEdu]"></Selector>
        <Selector label="公司性质"
                  type="companyNature"
                  :option="configData.companyNature"
                  :defaultIndexPro="defaultIndexProUserCity"
                  @changeValue="changeValue"
                  :seleValuePro="configData.userCity[defaultIndexProUserCity]"></Selector>
        <Selector label="公司规模"
                  type="companyScale"
                  :option="configData.companyScale"
                  :defaultIndexPro="defaultIndexProUserCity"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyScale[defaultIndexProUserCity]"></Selector>
        <div class="flex">
          <div>
            企业LOGO
          </div>
          <UploadImg :userUrl="companyUserInfo.companyLogo" from="button" text="浏览"></UploadImg>
        </div>
        <Selector label="企业地区"
                  type="userCity"
                  :option="configData.userCity"
                  :defaultIndexPro="defaultIndexProUserCity"
                  @changeValue="changeValue"
                  :seleValuePro="configData.userCity[defaultIndexProUserCity]"></Selector>
        <mt-field label="详细地址" placeholder="请输入详细地址" v-model="companyUserInfo.companyAddress"></mt-field>
        <div>
          <div class="flex">
            <div>
              企业图片
            </div>
            <UploadImg :userUrl="companyUserInfo.userHeadImage"
                       from="button"
                       @callBackUpload="callBackUpload"
                       text="批量上传"></UploadImg>
          </div>
          <div>
            <img :src="item" alt="" v-for="item in companyUserInfo.companyImage">
          </div>
        </div>
      </div>
    </div>
    <div v-for="item,index in [1,2,3,4,5,6]" v-if="index<3">
      {{item}}
    </div>
  </div>
</template>
<script>
  //17600000000 验证码  888888-->
  import EditHead from '../../components/editHead.vue'
  import EditPhone from '../../components/editPhone.vue'
  import Selector from '../../components/selector.vue'
  import UploadImg from '../../components/uploadHeadImg.vue'
  import configData from '../../assets/dataConfig/index'
  export default{
    data(){
      return {
        configData,
        popupVisible:false,
        defaultIndexProNation:0,
        defaultIndexProUserEdu:0,
        defaultIndexProUserCity:0,
        defaultIndexProUserProvince:0,
        defaultIndexProUserArea:0,
        companyUserInfo: {
          userId:JSON.parse(localStorage.getItem('userMsg')).company_user_id,
          companyAddress: "",
          companyArea: "",
          companyCity: "",
          companyContact: "",
          companyContactPhone: "",
          companyContactSex: "",
          companyImage: "",
          companyIndu: "",
          companyLogo: "",
          companyName: "",
          companyNature: "",
          companyPhone: "",
          companyProvince: "",
          companyScale: "",
          companySort: "",
          payCycle: "",
          userBlanace: "",
          userHeadImage: "",
          userInte: "",
          userTotal: "",
        }
      }
    },
    methods:{
      callBackUpload(data){
        if(data.from == 'head'){
          this.companyUserInfo.userHeadImage = data.data;
        }else if(data.from == 'button'){
          this.companyUserInfo.companyImage.push(data.data);

        }else if(data.from == 'logo'){
          this.companyUserInfo.companyLogo = data.data;
        }
      },
      callBack(data){
        this.companyUserInfo.companyContactPhone = data;
      },
      changeValue(data){
        this.companyUserInfo[data.type] = data.value;
      },
      submit(){
        this.updateCompanyInfo()
      },
      updateCompanyInfo() {
        this.companyUserInfo.userId = JSON.parse(localStorage.getItem('userMsg')).users.company_user_id;
        if(!(/^1[3456789]\d{9}$/.test(this.companyUserInfo.companyContactPhone))){
          this.$store.commit('showToast','手机格式不正确');
          return
        }
        this.companyUserInfo.companyImage = this.companyUserInfo.companyImage.join(',');
        this.axios({
          method: 'post',
          url: '/api/h5/updateCompanyInfo',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: this.companyUserInfo,
        }).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data.data);

          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res.data.msg || '请求出错',
            duration: 1000,
          });
        })
      },
      getCompanyUserInfo(id) {
        this.axios({
          method: 'post',
          url: '/api/h5/getCompanyUserInfo',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: id,
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.companyUserInfo = res.data.data;
            this.companyUserInfo.companyImage = this.companyUserInfo.companyImage?this.companyUserInfo.companyImage.split(','):[];
          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res.data.msg || '请求出错',
            duration: 1000,
          });
        })
      },
      finduserCityIndex(data,arrType,type,dataChildren,childrenIndex,dataChildrenAfter,childrenIndexIndex){
        if(!data){
          this[type] = 0;
          return;
        }
        for(let i = 0;i<configData[arrType].length;i++){
          if(configData[arrType][i].name == data){
            this[type] = i;
            if(childrenIndex){
              for(let j= 0;j<configData[arrType][i].children.length;j++){
                if(configData[arrType][i].children[j].name == dataChildren){
                  this[childrenIndex] = j;
                }
                if(childrenIndexIndex){
                  for(var k = 0,temp = configData[arrType][i].children[j].children;k<temp.length;k++){
                    if(temp[k].name == dataChildrenAfter){
                      this[childrenIndexIndex] = k;
                    }
                    break;
                  }
                }
                break;
              }
            }
            break;
          }
        }
      },
    },
    created(){
      this.$store.state.app.headContent = '修改资料';
      let user = JSON.parse(localStorage.getItem('userMsg'));
        this.getCompanyUserInfo(user.users.company_user_id || '4')
    },
    components: {
      EditHead,
      Selector,
      UploadImg,
      EditPhone
    }
  }
</script>

<style>
  .flex{
    font-size: 16px;
    display: flex;justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f5f5f9;
  }
  .page{
    background:#ffffff;
    padding-top: 40px;
  }
  .headImg{
    width: 18%;
    margin:0 auto;
    margin-top: 18px;
    margin-bottom: 33px;
    position: relative;
  }
  .headImg>img:nth-of-type(1){
    width: 100%;
    display: block;
  }
  .headImg>img:nth-of-type(2){
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    width: 18px;
  }
  .mint-cell-value{
    border-bottom: 1px solid #f5f5f9;
  }
  textarea.mint-field-core{
    border:1px solid #f5f5f9;
  }
  .level .mint-cell-value{
    border:none;
  }
</style>
