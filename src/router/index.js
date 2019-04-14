import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import News from '@/page/news/index'
import LoginRegister from './login'
import Person from './person'
import editPerson from '../page/edit/editPerson.vue'
import editCompany from '../page/edit/editCompany.vue'
import signIn from '../page/positionSignInAddPrice/signIn.vue'
import position from '../page/positionSignInAddPrice/position.vue'
import addPrice from '../page/positionSignInAddPrice/addPrice.vue'
import Activity from '@/page/activity/index';
import Recruitment from './recruitment'
import Recommend from './recommend';
import RecruitDetail from '@/page/reward/recruitDetail';
import ImgUpload from '@/page/reward/imgUpload';
import UnderLine from "./underline"
import MoreComments from '@/page/reward/moreComments';
import Sign from './sign'
import Daypay from '@/page/daypay/index'
import HighReward from '@/page/highreward/index'

Vue.use(Router);

Vue.use(Router)


let menu = new Router({
  mode: 'history',
  srcollBehavior(to,from,savedPosition){
    if(to.hash){
      return {
        selector:to.hash
      }
    }
  },
  routes: [
    {
      path: '/editPerson',
      name: '修改个人资料',
      component: editPerson,
      meta: {showHead: true}
    },
    {
      path: '/editCompany',
      name: '修改公司资料',
      component: editCompany,
      meta: {showHead: true}
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
    }, {
      path: '/activity',
      name: '最新活动',
      component: Activity
    },
    {
      path: '/news',
      name: '薪资讯',
      component: News
    },
    {
      path: '/recruitDetail',
      name: '招聘详情',
      component: RecruitDetail
    },
    {
      path:'/reward/imgUpload',
      name:'企业图片上传',
      component:ImgUpload,
    },{
      path:'/reward/moreComments',
      name:'更多点评',
      component:MoreComments,
    },{
      path: '/reward/imgUpload',
      name: '招聘详情',
      component: ImgUpload
    },{
      path: '/daypay',
      name: '日多薪',
      component: Daypay
    }, {
      path: '/highreward',
      name: '最高奖励',
      component: HighReward
    }
  ].concat(Person, LoginRegister, Recruitment, Recommend,UnderLine,Sign)
})

export default menu;
