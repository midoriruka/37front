import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import News from '@/page/news/index'
import LoginRegister from './login'
import Person from './person'
import Activity from '@/page/activity/index';
import Recruitment from './recruitment'
import Recommend from "./recommend";
import RecruitDetail from '@/page/reward/recruitDetail';

Vue.use(Router);

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
    },
    {
      path: "/news",
      name: '薪资讯',
      component: News
    },
    {
      path:'/recruitDetail',
      name:'招聘详情',
      component:RecruitDetail,
    }
  ].concat(Person, LoginRegister, Recruitment, Recommend)
})

export default menu;
