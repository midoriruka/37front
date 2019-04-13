import Recommend from "@/page/recommend";

import ReviewDetail from '@/page/person/reviewDetail'


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
  }
];

export default recommend;
