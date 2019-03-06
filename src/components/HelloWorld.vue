<template>
  <div class="hello">
   <!-- <ButtonTab>
     <ButtonTabItem>asdf</ButtonTabItem>
     <ButtonTabItem>asdf</ButtonTabItem>
     <ButtonTabItem>asdf</ButtonTabItem>
   </ButtonTab> -->
   <Tabbar v-transfer-dom>
     <TabbarItem>asdf</TabbarItem>
     <TabbarItem>asdf</TabbarItem>
     <TabbarItem>asdf</TabbarItem>
   </Tabbar>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Tabbar,
    TabbarItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
