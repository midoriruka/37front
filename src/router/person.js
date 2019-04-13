import Person from '@/page/person'
import Sign from '@/page/person/sign'
import Shop from '@/page/person/shop'
import ShopDetail from '@/page/person/shopDetail'
import OrderConfirm from '@/page/person/orderConfirm';
import MyAddress from '@/page/person/myAddress';
import AddressEdit from '@/page/person/addressEdit';
import OrderSubmit from '@/page/person/orderSubmit';
import OrderDetail from '@/page/person/orderDetail';
import MyShop from '@/page/person/myshop';
import Suggest from '@/page/person/suggest';
import Message from '@/page/person/message';
import FocusCompany from '@/page/person/focusCompany';

const user = [{
  path: '/person',
  name: '个人中心',
  component: Person
}, {
  path: '/person/sign',
  name: '签到',
  component: Sign
}, {
  path: '/person/shop',
  name: '积分商城',
  component: Shop
}, {
  path: '/person/shop/detail',
  name: '商品详情',
  component: ShopDetail
}, {
  path: '/person/shop/orderConfirm',
  name: '订单确认',
  component: OrderConfirm
}, {
  path: '/person/shop/myAddress',
  name: '我的地址',
  component: MyAddress
}, {
  path: '/person/shop/addressEdit',
  name: '我的地址编辑',
  component: AddressEdit
}, {
  path: '/person/shop/orderSubmit',
  name: '订单提交',
  component: OrderSubmit
}, {
  path: '/person/shop/orderDetail',
  name: '订单详情',
  component: OrderDetail
}, {
  path: '/person/myshop',
  name: '我的小店',
  component: MyShop
}, {
  path: '/person/suggest',
  name: '意见反馈',
  component: Suggest
}, {
  path: '/person/message',
  name: '消息中心',
  component: Message
},{
  path:"/person/focusCompany",
  name:"关注企业",
  component:FocusCompany
}]

export default user
