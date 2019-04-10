import Person from '@/page/person'
import Sign from '@/page/person/sign'
import Shop from '@/page/person/shop'
import ShopDetail from '@/page/person/shopDetail'
import OrderConfirm from '@/page/person/orderConfirm';

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
},{
  path: '/person/shop/orderConfirm',
  name: '订单确认',
  component: OrderConfirm
}]

export default user
