import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import LoginRegister from './login'
import Person from './person'
import editPerson from '../page/edit/editPerson.vue'
import editCompany from '../page/edit/editCompany.vue'
import signIn from '../page/positionSignInAddPrice/signIn.vue'
import position from '../page/positionSignInAddPrice/position.vue'
import addPrice from '../page/positionSignInAddPrice/addPrice.vue'

Vue.use(Router)

let menu = new Router({
  mode: 'history',
  routes: [
    {
      path: '/editPerson',
      name: '修改个人资料',
      component: editPerson,
      meta:{showHead:true}
    },
    {
      path: '/editCompany',
      name: '修改公司资料',
      component: editCompany,
      meta:{showHead:true}
    },{
      path: '/signIn',
      name: '我要报名',
      component: signIn
    },{
      path: '/position',
      name: '区域选择',
      component: position
    },{
      path: '/addPrice',
      name: '我要加价',
      component: addPrice
    },
    {
      path: '/',
      name: '首页',
      component: Index
    }
  ].concat(Person, LoginRegister)
})

export default menu
