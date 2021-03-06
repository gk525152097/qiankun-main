import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  {
    path: '/',
    name: '主结构',
    component: () => import('@/layout/MainLayout'),
    redirect: '/home'
  },
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/views/login/index')
  },
  {
    path: '/error',
    name: '错误',
    component: () => import('@/views/error/index')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
