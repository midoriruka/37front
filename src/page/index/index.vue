<template>
  <div>
    <div class="index-title">

    </div>
    <tabbar tarname="home" :iconarr="iconArr"></tabbar>
  </div>
</template>
<script>
import tabbar from '@/components/tabbar'
export default {
  name: 'index',
  data() {
    return {
      iconArr: ['../../static/home-check.png', '../../static/hire-normal.png', '../../static/personal-normal .png'],
    }
  },
  components: {tabbar},
}
</script>

