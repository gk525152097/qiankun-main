/**
 * vue-router守卫
 * 主要在路由跳转的时候进行处理
 */

import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import defaultSettings from './defaultSettings'
import { handleApp, handleAppMenu } from '@/api/system'
import BaseLayout from '@/layout/BaseLayout'
import ChildPage from '@/layout/ChildPage'
import createRoutes from '@/utils/createRoutes'
import transform from '@/utils/transformTree'

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = [
  '/login',
  '/register',
  '/error'
] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  console.log('main-app')
  console.log(to)
  // 加载条
  NProgress.start()
  // 切换浏览窗口名称
  if (to.name) {
    document.title = `${defaultSettings.mainSystemName} ${to.name}`
  }

  // 在免登录白名单，直接进入
  if (whiteList.includes(to.path)) {
    next()
    return false
  }

  // 系统登陆 时间限制
  // const systemTime = sessionStorage.getItem('systemTime')
  // if (!systemTime || systemTime < new Date().valueOf() - (30 * 60 * 1000)) {
  //   // 没有系统时间 或者 时间超过30分钟限制 则去登陆页
  //   next(`/user/login?time=${new Date().valueOf()}`)
  //   return false
  // }

  // 没有用户信息
  // if (!store.state.system.username) {
  //   next('/login')
  //   return false
  // }

  /**
   * 请求用户主应用 子应用路由信息
   * 主应用用于主系统相关跳转
   * 子应用用于页面跳转
   * 1、请求用户应用信息
   * 2、请求第一个应用的路由信息
   * 3、默认跳转到第一个应用路由第一个菜单
   */
  // 没有路由
  if (!store.state.system.appList.length) {
    // 请求应用信息
    const appList = await handleApp()
    store.commit('system/SET_APP_LIST', appList)

    // todo 将主应用路由拆分出去
    // 请求第一个应用菜单 并转换成树
    let menuList = await handleAppMenu(appList[0] ? appList[0].id : '')
    menuList = menuList.map(item => {
      return {
        ...item,
        meta: {
          mainRoute: true
        }
      }
    })
    const menuTree = createRoutes(transform(menuList))

    store.commit('system/SET_MAIN_APP_MENU', menuTree)

    // 添加入口
    const enterRoute = { // 通过动态菜单添加 并修改redirect
      path: '/home',
      name: '主应用',
      component: BaseLayout,
      redirect: appList[0].activeRule !== '/' ? appList[0].activeRule : menuList[0].path // 获取菜单第一个数据为默认跳转页面
    }
    router.addRoute('主结构', enterRoute)

    // 添加应用路由 暂定主应用id === 0
    appList.filter(item => item.id !== 0).forEach((item, index) => {
      router.addRoute('主结构', {
        path: `/${item.appName}*`,
        meta: {
          ...item,
          keepAlive: true
        },
        name: item.name,
        component: ChildPage
      })
    })

    // 主应用 额外添加菜单信息 暂定主应用id === 0
    if (appList[0] && appList[0].id === 0) {
      // 将菜单添加到入口下
      menuTree.sort((a, b) => a.rang - b.rang)
      menuTree.forEach(item => {
        router.addRoute('主应用', item)
      })
    }
    // 动态菜单
    store.commit('system/SET_MENU_TREE', menuTree)

    // 添加容错路由
    router.addRoute({ path: '*', redirect: '/error', hidden: true })

    if (to.path === '/' && !to.redirect) {
      next(menuList[0].path)
      return false
    }
    next({...to, replace: true})
    return false
  }

  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

router.onError(error => {
  console.log(error)
  router.push({
    path: '/error',
    query: { type: 404 }
  })
})
