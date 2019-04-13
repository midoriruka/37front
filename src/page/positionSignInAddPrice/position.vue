<template>
    <div class="page">
      <div class="mint-searchbar">
        <div>
          <img src="../../assets/icon/最高奖励/关闭.png" alt="" style="width: 20px;display: block;margin-right: 20px;" @click="goTo">
        </div>
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search"></i>
          <input type="search" placeholder="搜索"
                 class="mint-searchbar-core"
                 v-model="value">
        </div>
        <!--<a class="mint-searchbar-cancel" style="display: none;">取消</a>-->
      </div>
      <div style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;font-size: 14px;background: #ffffff;height: 44px;line-height: 44px;">
          <div>
            {{gps}}
          </div>
          <div style="color: #e6a03c;" @click="getLocation">重新定位</div>
      </div>
      <div style="padding: 0 10px;margin-top: 20px;">
        <div>
          热门推荐城市
        </div>
        <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 10px;">
          <div v-for="item in hotCity" @click="seleCity(item)" style="background: #ffffff;padding: 8px 10px;border-radius: 3px;">
            {{item.companyCity}}
          </div>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div v-for="item in computedCompany" style="height: 44px;background: #ffffff;line-height: 44px;padding: 0 10px;margin-top: 1px;" @click="seleCity(item)">{{item.companyCity}}</div>
      </div>
    </div>
</template>
<style scoped>
  .page{
    min-height: 100vh;
    background:#f5f5f9;
    font-size: 14px;
  }
</style>
<script>
    export default{
        data(){
            return {
              gps:'',
              value: '',
              hotCity:[],
              companyCity:[],
              currentSeleCity:''
            }
        },
        methods:{
          seleCity(data){
            this.currentSeleCity = data.companyCity
          },
          getCompanyCity(){
            this.axios({
              method: 'post',
              url: '/api/h5/getCompanyCity',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
            }).then((res) => {
              console.log(res)
              if (res.data.code == 200) {
                this.companyCity = res.data.data
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
          getCompanyHotCity(){
            this.axios({
              method: 'post',
              url: '/api/h5/getCompanyHotCity',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
            }).then((res) => {
              if (res.data.code == 200) {
                this.hotCity = res.data.data
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
          getLocation(){
            var that = this;
            if (navigator.geolocation) {
              const position = navigator.geolocation.getCurrentPosition(function (data) {
                this.latitude = position.coords.latitude;//十进制单位
                this.longitude = position.coords.longitude;//十进制单位
                sessionStorage.setItem('latitude',that.latitude)
                sessionStorage.setItem('longitude',that.longitude)
                that.baiduApi()
              },function (err) {
                that.latitude = '120.15';//十进制单位
                that.longitude = '30.28';//十进制单位
                that.baiduApi()
              });
            }
            else {
              this.$toast({
                message: res.data.msg || 'Geolocation is not supported by this browser',
                duration: 1000,
              });
            }
//            function show(position) {
//              console.log(1234)
//              var latitude = position.coords.latitude;//十进制单位
//              var longitude = position.coords.longitude;//十进制单位
//              var accuracy = position.coords.accuracy;//以m为单位制定纬度和经度与实际位置的差距
//              var timestamp = position.timestamp;
//              console.log('经度坐标' + latitude);
//              console.log('纬度坐标' + longitude);
//              console.log('准确度' + accuracy);
//              console.log('获取位置数据的时间' + timestamp);//时间戳
//            }
          },
          baiduApi(){
            let url = '';
            if(process.env.NODE_ENV === 'development'){
              url = '/aaa1/geocoder/v2/?location='+this.longitude+','+this.latitude+'&output=json&pois=1&latest_admin=1&ak=2xqgK1NTTHVqtB2moEAtPXdGvszsnlVz'
            }else{
              url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+this.longitude+','+this.latitude+'&output=json&pois=1&latest_admin=1&ak=2xqgK1NTTHVqtB2moEAtPXdGvszsnlVz'
            }
            this.axios({
              method: 'get',
              url: url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }).then((res) => {
              if (res.data.status == 0) {
                this.gps = res.data.result.addressComponent.city
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
          goTo(){
            this.$router.push('/person')
          }
        },
        computed:{
          computedCompany(){
            if(!this.value){
              return this.companyCity;
            }else {
              let arr = [];
              for(var i = 0;i<this.companyCity.length;i++){
                if(this.companyCity[i].companyCity.indexOf(this.value) != -1){
                  arr.push(this.companyCity[i])
                }
              }
              return arr
            }
          }
        },
        created(){
          this.getCompanyHotCity();
          this.getCompanyCity();
          if(!sessionStorage.getItem('longitude')){
            this.getLocation()
          }else{
            this.baiduApi();
          }
        }
    }
</script>
