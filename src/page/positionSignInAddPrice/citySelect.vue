<!-- 选择城市页面 -->
<template>
  <div class="page">
    <div v-title>城市选择</div>
    <div class="search-bar">
      <div class="close-btn" @click="$router.back()">×</div>
      <div class="search-input-wrapper">
        <input type="text" placeholder="请输入城市名称" @keyup.enter="selectLocation(content);" v-model="content">
      </div>
    </div>
    <div class="current-loc">
      <div @click="selectLocation(currentLocation)"><span>{{currentLocation}}</span><span class="gps-loc">GPS定位</span></div>
      <div class="relocate-btn" @click="relocate">重新定位</div>
    </div>
    <div class="recommand">
      <div class="recommand-title">热门推荐城市</div>
      <div class="hot-city-list">
        <div @click="selectLocation(item.companyCity)" class="hot-city-item" v-for="(item,i) in hotCitys" :key="i">{{item.companyCity}}</div>
      </div>
    </div>
    <div class="city-list">
      <div class="city-item" v-for="(city,i) in allCitys" :key="i" v-if="city!==null" @click="selectLocation(city.companyCity)">
        {{city.companyCity}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      hotCitys: [],
      content: '',
      currentLocation: '北京',
      allCitys: [],
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getHotCity();
      this.getAllCity();
      //初始化百度地图
      this.initMap();
    })
  },
  methods: {
    async getAllCity() {
      const { data } = await this.axios.post('/api/h5/getCompanyCity');
      if (data.code === 200) {
        if (data.data) {
          this.allCitys = data.data;
        }
      }
    },
    async getHotCity() {
      const { data } = await this.axios.post('/api/h5/getCompanyHotCity');
      if (data.code === 200) {

        this.hotCitys = data.data;

      }
    },
    initMap() {
      const myCity = new BMap.LocalCity();
      myCity.get((result) => {
        this.currentLocation = result.name;
      })
    },
    relocate() {
      const myCity = new BMap.LocalCity();
      myCity.get((result) => {
        this.currentLocation = result.name;
      })
    },
    selectLocation(location) {
      window.localStorage.setItem('position', location);
      this.$router.back();
    },
  }
}

</script>
<style scoped lang='scss'>
@import '~@/styles/citySelect.scss';

</style>
