import recruit from '@/page/recruitment/index'
import wt from '@/page/recruitment/wtRecruitment'
// import qy from '@/page/recruitment/qyRecruitment'
import comInfo from '@/page/recruitment/companyInfo'
import jobInfo from '@/page/recruitment/jobInfo'
import Modify from '@/page/recruitment/modifyJobInfo'

const recruitment = [{
  path: '/recruitment',
  name: '我要招聘',
  component: recruit
},
  {
    path: '/recruitment/wtRecruitment',
    name: '招聘',
    component: wt,
    children: [
      {name: '企业信息', path: 'qiye', component: comInfo},
      {name: '职位名称', path: 'zhiwei', component: jobInfo},
      {name: '修改信息', path: 'modify', component: Modify}

    ]
  }
  // {
  //   path: '/recruitment/qyRecruitment',
  //   name: '企业招聘',
  //   component: qy
  // }
]

export default recruitment
