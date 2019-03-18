import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import User from './user'


Vue.use(Router)

let menu = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    }
  ].concat(User)
})

export default menu
