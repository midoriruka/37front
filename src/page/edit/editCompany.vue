<template>
  <div class="page">
    <EditHead @submit="submit"></EditHead>
    <div style="padding-bottom: 30px;">
      <UploadImg :userUrl="companyUserInfo.userHeadImage" @callBackUpload="callBackUpload"></UploadImg>
      <div>
        <mt-field label="企业名称" placeholder="请输入公司名称" v-model="companyUserInfo.companyName"></mt-field>
        <mt-field label="企业简称" placeholder="请输入公司简称" v-model="companyUserInfo.companySort"></mt-field>
        <Selector label="联系人"
                  type="companyContact"
                  :option="configData.companyContact"
                  :defaultIndexPro="defaultIndexProCompanyContact"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyContact[defaultIndexProCompanyContact]"></Selector>
        <!--<mt-field label="联系人" placeholder="请输入性别" v-model="companyUserInfo.companyContact"></mt-field>-->
        <EditPhone label="联系电话" :companyContactPhone="companyUserInfo.companyContactPhone" @callBack="callBack"></EditPhone>
        <!--<mt-field label="联系电话" placeholder="请输入联系电话" v-model="companyUserInfo.companyContactPhone"></mt-field>-->
        <Selector label="工资发放周期"
                  type="payCycle"
                  :option="configData.payCycle"
                  :defaultIndexPro="defaultIndexProPayCycle"
                  @changeValue="changeValue"
                  :seleValuePro="configData.payCycle[defaultIndexProPayCycle]"></Selector>
        <Selector label="所属行业"
                  type="companyIndu"
                  :option="configData.companyIndu"
                  :defaultIndexPro="defaultIndexProCompanyIndu"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyIndu[defaultIndexProCompanyIndu]"></Selector>
        <Selector label="公司性质"
                  type="companyNature"
                  :option="configData.companyNature"
                  :defaultIndexPro="defaultIndexProCompanyNature"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyNature[defaultIndexProCompanyNature]"></Selector>
        <Selector label="公司规模"
                  type="companyScale"
                  :option="configData.companyScale"
                  :defaultIndexPro="defaultIndexProCompanyScale"
                  @changeValue="changeValue"
                  :seleValuePro="configData.companyScale[defaultIndexProCompanyScale]"></Selector>
        <div class="flex">
          <div style="width: 105px;">
            企业LOGO
          </div>
          <div style="width:calc(100% - 105px);border-bottom: 1px solid #f5f5f9;display: flex;justify-content:space-between">
            <div><img :src="companyUserInfo.companyLogo" alt="" style="height: 30px;"></div>
            <UploadImg :userUrl="companyUserInfo.companyLogo"
                       from="logo"
                       @callBackUpload="callBackUpload"
                       text="浏览"></UploadImg>
          </div>
        </div>
        <Selector label="企业地区"
                  type="userCity"
                  :option="configData.userCity"
                  :defaultIndexPro="defaultIndexProUserProvince"
                  :defaultIndexChildPro="defaultIndexProUserCity"
                  :defaultIndexChildAfterPro="defaultIndexProUserArea"
                  @changeValue="changeValue"
                  :seleValuePro="configData.userCity[defaultIndexProUserProvince]"
                  :seleValueChildrenPro="configData.userCity[defaultIndexProUserCity].children[defaultIndexProUserCity]"
                  :seleValueChildren2Pro="configData.userCity[defaultIndexProUserProvince].children[defaultIndexProUserCity].children[defaultIndexProUserArea]"></Selector>
        <mt-field label="详细地址" placeholder="请输入详细地址" v-model="companyUserInfo.companyAddress"></mt-field>
        <div>
          <div class="flex">
            <div style="width: 105px;">
              企业图片
            </div>
            <div style="width:calc(100% - 105px);border-bottom: 1px solid #f5f5f9;display: flex;justify-content: flex-end">
              <UploadImg :userUrl="companyUserInfo.userHeadImage"
                         from="button"
                         :multiple="true"
                         @callBackUpload="callBackUpload"
                         text="批量上传"></UploadImg>
            </div>
          </div>
          <div style="padding: 30px 10px;overflow: hidden">
            <img :src="item" alt=""
                 style="width: 25%;float: left;"
                 v-for="item in imgList">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        defaultIndexProUserCity:0,
        defaultIndexProUserProvince:0,
        defaultIndexProUserBeforeCity:0,
        defaultIndexProUserArea:0,
        defaultIndexProCompanyContact:0,
        defaultIndexProPayCycle:0,
        defaultIndexProCompanyIndu:0,
        defaultIndexProCompanyScale:0,
        defaultIndexProCompanyNature:0,
        imgList:[],
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
          this.imgList = this.companyUserInfo.companyImage;
        }else if(data.from == 'logo'){
          console.log(data.data)
          this.companyUserInfo.companyLogo = data.data;
        }
      },
      callBack(data){
        this.companyUserInfo.companyContactPhone = data;
      },
      changeValue(data){
        if(data.type == "userProvince" || data.type == "userCity" || data.type == "userArea"){
          let type = data.type.replace(/user/,'company')
          this.companyUserInfo[type] = data.label;
        }else{
          this.companyUserInfo[data.type] = data.value;
        }

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
        this.$indicator.open('加载中...');
        this.axios({
          method: 'post',
          url: '/api/h5/updateCompanyInfo',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: this.companyUserInfo,
        }).then((res) => {
          this.$indicator.close();
          if (res.data.code == 200) {
            this.getCompanyUserInfo()
          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$indicator.close();
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
            userId: JSON.parse(localStorage.getItem('userMsg')).users.company_user_id,
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.companyUserInfo = res.data.data;
            this.companyUserInfo.companyImage = this.companyUserInfo.companyImage?this.companyUserInfo.companyImage.split(','):[];
            this.imgList = this.companyUserInfo.companyImage;
            this.finduserCityIndex(res.data.data.companyContact,'companyContact','defaultIndexProCompanyContact');
            this.finduserCityIndex(res.data.data.payCycle,'payCycle','defaultIndexProPayCycle');
            this.finduserCityIndex(res.data.data.companyIndu,'companyIndu','defaultIndexProCompanyIndu');
            this.finduserCityIndex(res.data.data.companyScale,'companyScale','defaultIndexProCompanyScale');
            this.finduserCityIndex(res.data.data.companyNature,'companyNature','defaultIndexProCompanyNature');
            this.finduserCityIndex(res.data.data.companyProvince,'userCity','defaultIndexProUserProvince',res.data.data.companyCity,'defaultIndexProUserCity',res.data.data.companyArea,'defaultIndexProUserArea');
          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res || '请求出错',
            duration: 1000,
          });
        })
      },
      finduserCityIndex(data,arrType,type,dataChildren,childrenIndex,dataChildrenAfter,childrenIndexIndex){
        if(!data){
          this[type] = 0;
          return;
        }

        for(var i = 0;i<configData[arrType].length;i++){
          if(configData[arrType][i][arrType == 'userCity'?'name':'value'] == data){
            this[type] = i;
            if(childrenIndex){
              for(var j= 0;j<configData[arrType][i].children.length;j++){
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
    /*border-bottom: 1px solid #f5f5f9;*/
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
