<template>
    <div class="page">
      <EditHead @submit="submit"></EditHead>
      <div style="padding-bottom: 30px;">
        <UploadImg :userUrl="userInfo.userImageUrl" @callBackUpload="callBackUpload"></UploadImg>
        <div>
          <mt-field label="姓名" placeholder="请输入用户名" v-model="userInfo.nickName"></mt-field>
          <mt-field label="昵称" placeholder="请输入昵称" v-model="userInfo.userName"></mt-field>
          <mt-field label="性别" placeholder="请输入性别" v-model="userInfo.userSex"></mt-field>
          <mt-field label="手机号" placeholder="请输入手机号" v-model="userInfo.userPhone"></mt-field>
          <!--<div style="padding:0 10px;display: flex;font-size: 16px;color: #2c3e50;height: 48px;align-items: center;">-->
            <!--<div style="width: 105px;flex: none;">生日</div>-->
            <!--<div style="flex:1;box-sizing: border-box;" @click="seleBirthday">-->
              <!--<div style="border-bottom: 1px solid #f5f5f9;color: #000;">-->
                <!--asdfasdf-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<mt-datetime-picker-->
            <!--ref="picker"-->
            <!--type="date"-->
            <!--v-model="pickerValue">-->
          <!--</mt-datetime-picker>-->
          <!--<mt-field label="生日" placeholder="请选择生日" v-model="userInfo.userBrith"></mt-field>-->
          <Selector label="生日"
                    type="userBrith"
                    :seleValuePro="{name:' '}"
                    @changeValue="changeValue"
                    ></Selector>
          <Selector label="民族"
                    type="userNation"
                    :option="configData.userNation"
                    :defaultIndexPro="defaultIndexProNation"
                    @changeValue="changeValue"
                    :seleValuePro="configData.userNation[defaultIndexProNation]"></Selector>
          <Selector label="学历"
                    type="userEdu"
                    :option="configData.userEdu"
                    :defaultIndexPro="defaultIndexProUserEdu"
                    @changeValue="changeValue"
                    :seleValuePro="configData.userEdu[defaultIndexProUserEdu]"></Selector>
          <Selector label="所属地区"
                    type="userCity"
                    :option="configData.userCity"
                    :defaultIndexPro="defaultIndexProUserCity"
                    :defaultIndexChildPro="defaultIndexProUserCity"
                    :defaultIndexChildAfterPro="defaultIndexProUserArea"
                    @changeValue="changeValue"
                    :seleValueChildrenPro="configData.userCity[defaultIndexProUserCity].children[defaultIndexProUserCity]"
                    :seleValueChildren2Pro="configData.userCity[defaultIndexProUserCity].children[defaultIndexProUserCity].children[defaultIndexProUserArea]"
                    :seleValuePro="configData.userCity[defaultIndexProUserCity]"></Selector>
          <mt-field label="详细地址" placeholder="请输入详细地址" v-model="userInfo.userAddress"></mt-field>
          <mt-field label="个人技能" placeholder="个人技能" type="textarea" rows="4" v-model="userInfo.userRemark" class="level"></mt-field>
        </div>
      </div>
    </div>
</template>
<script>
  //17600000000 验证码  888888-->
  import EditHead from '../../components/editHead.vue'
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
                pickerValue:false,
                userInfo: {
                  nickName:'',
                  userAddress:'',
                  userAge:'',
                  userBrith:'',
                  userCity:'',
                  userEdu:'',
                  userId:JSON.parse(localStorage.getItem('userMsg')).users.userId,
                  userImageUrl:'',
                  userLevel:'',
                  userName:'',
                  userNation:'',
                  userPhone:'',
                  userProvince:'',
                  userSex:'',
                  userRemark:'',
                }
            }
        },
      methods:{
        callBackUpload(data){
          console.log(data);
          this.userInfo.userImageUrl = data
        },
        seleBirthday(){
          this.pickerValue = true;
        },
        changeValue(data){
          this.userInfo[data.type] = data.value;
        },
        submit(){
          this.updateUserInfo()
        },
        updateUserInfo() {
          this.axios({
            method: 'post',
            url: '/api/h5/updateUserInfo',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: this.userInfo,
          }).then((res) => {
            if (res.data.code == 200) {
              console.log('updateUserInfo')
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
//        getCompanyUserInfo(id) {
//          this.axios({
//            method: 'post',
//            url: '/api/h5/getCompanyUserInfo',
//            headers: {
//              'Content-type': 'application/json;charset=UTF-8'
//            },
//            data: {
//              userId: id,
//            }
//          }).then((res) => {
//            if (res.data.code == 200) {
//              console.log('getCompanyUserInfo')
//            } else {
//              this.$toast({
//                message: res.data.msg || '请求出错',
//                duration: 1000,
//              });
//            }
//          }).catch((res) => {
//            this.$toast({
//              message: res.data.msg || '请求出错',
//              duration: 1000,
//            });
//          })
//        },
        getAllUserInfo(id) {
          this.axios({
            method: 'post',
            url: '/api/h5/getAllUserInfo',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userId: id,
            }
          }).then((res) => {
            if (res.data.code == 200) {
              this.userInfo = res.data.data;
              this.finduserCityIndex(res.data.data.userNation,'userNation','defaultIndexProNation');
              this.finduserCityIndex(res.data.data.userEdu,'userEdu','defaultIndexProUserEdu');
              this.finduserCityIndex(res.data.data.userProvince,'userProvince','defaultIndexProUserProvince',res.data.data.userCity,'defaultIndexProUserCity',res.data.data.userArea,'defaultIndexProUserArea');
//              this.finduserCityIndex(res.data.data.userCity,'userCity','defaultIndexProUserCity');

            } else {
              this.$store.commit('showToast',res.data?res.data.msg:'请求出错' || '请求出错');
            }
          }).catch((res) => {
            this.$store.commit('showToast',res.data?res.data.msg:'请求出错' || '请求出错');
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
//        this.getCompanyUserInfo(user.users.userId)
        this.getAllUserInfo(user.users.userId || '7')
      },
      components: {
          EditHead,
          Selector,
          UploadImg
      }
    }
</script>

<style>
  .page{
    background:#ffffff;
    padding-top: 40px;
    padding-bottom: 40px;
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
