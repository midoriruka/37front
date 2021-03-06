/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store';
import axios from 'axios'
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import mockdata from './mock'
import 'lib-flexible/flexible'
import 'font-awesome/scss/font-awesome.scss'
import './styles/index.scss'

Vue.use(preview);
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.use(MintUI)

Vue.prototype.axios = axios

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     window.localStorage.removeItem('userMsg');
//   }
//   var user = window.localStorage.getItem('userMsg');
//   if (!user && to.path !== '/login') {
//     next({
//       path: '/login'
//     })
//   } else {
//     next();
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
