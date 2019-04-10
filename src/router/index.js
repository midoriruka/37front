import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import LoginRegister from './login'
import Person from './person'
import Activity from '@/page/activity/index';


Vue.use(Router)

let menu = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: '首页',
    component: Index
  }, {
    path: '/activity',
    name: '最新活动',
    component: Activity
  }, ].concat(Person, LoginRegister)
})

export default menu
