import Recommend from "@/page/recommend";

import BankCard from "@/page/person/bankCard";

import ReviewDetail from '@/page/person/reviewDetail'

import Message from '@/page/person/message'

const recommend = [
  {
    path: "/recommend",
    name: "好友推荐",
    component: Recommend
  },
  {
    path: "/bankCard",
    name: "添加银行卡",
    component: BankCard
  },
  {
    path: "/reviewDetail",
    name: "发表评论",
    component: ReviewDetail
  },
  {
    path: "/message",
    name: "消息",
    component: Message
  }
];

export default recommend;
