import recruit from '@/page/recruitment/index'
import wt from '@/page/recruitment/wtRecruitment'
import qy from '@/page/recruitment/qyRecruitment'

const recruitment = [{
  path: '/recruitment',
  name: '我要招聘',
  component: recruit
},
  {
    path: '/recruitment/wtRecruitment',
    name: '委托招聘',
    component: wt
  },
  {
    path: '/recruitment/qyRecruitment',
    name: '企业招聘',
    component: qy
  }
]

export default recruitment
