import Login from '@/page/login/login'
import Register from '@/page/login/registertion'

const loginRegister = [{
  path: '/login',
  name: '登录',
  component: Login
}, {
  path: '/registertion',
  name: '注册',
  component: Register
}]

export default loginRegister