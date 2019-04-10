import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import LoginRegister from './login'
import Person from './person'
import Recruitment from './recruitment'


Vue.use(Router)

let menu = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    }
  ].concat(Person, LoginRegister,Recruitment)
})

export default menu
