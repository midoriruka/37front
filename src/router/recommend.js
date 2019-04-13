import Recommend from "@/page/recommend";

import ReviewDetail from '@/page/person/reviewDetail'

import ErrorCorrection from '@/page/person/errorCorrection'


const recommend = [
  {
    path: "/recommend",
    name: "好友推荐",
    component: Recommend
  },
  {
    path: "/reviewDetail",
    name: "发表评论",
    component: ReviewDetail
  },
  {
    path: "/errorCorrection",
    name: "我要纠错",
    component: ErrorCorrection
  }
];

export default recommend;
