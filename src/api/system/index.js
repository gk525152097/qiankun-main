const menuList = [
  { id: 1, parentId: 0, name: '应用管理', rang: 0, icon: 'el-icon-help', path: '/childAppManage', component: 'views/childAppManage', hidden: false, redirect: '' },
  { id: 7, parentId: 0, name: '角色管理', rang: 4, icon: 'el-icon-user-solid', path: '/roleManage', component: 'views/roleManage', hidden: false, redirect: '' },
  { id: 2, parentId: 0, name: '菜单管理', rang: 1, icon: 'el-icon-menu', path: '/menuManage*', component: 'views/menuManage', hidden: false, redirect: '' },
  { id: 3, parentId: 0, name: '功能管理', rang: 2, icon: 'el-icon-aim', path: '/functionManage', component: 'views/functionManage', hidden: false, redirect: '' },
  { id: 4, parentId: 0, name: '配置管理', rang: 3, icon: 'el-icon-s-tools', path: '/configurationManage', component: 'views/configurationManage', hidden: false, redirect: '' },
  { id: 5, parentId: 0, name: '权限管理', rang: 5, icon: 'el-icon-s-claim', path: '/authorityManage', component: 'views/authorityManage', hidden: false, redirect: '' },
  { id: 6, parentId: 0, name: '用户管理', rang: 6, icon: 'el-icon-user', path: '/userManage', component: 'views/userManage', hidden: false, redirect: '' },
  { id: 8, parentId: 0, name: '一级试菜单', rang: 8, icon: 'el-icon-help', path: '/testPage1', component: 'views/test', hidden: false, redirect: '' },
  { id: 9, parentId: 8, name: '二级试菜单', rang: 9, icon: '', path: '/testPage2', component: 'views/test', hidden: false, redirect: '' },
  { id: 10, parentId: 9, name: '三级级菜单2', rang: 10, icon: '', path: '/testPage3', component: 'views/test', hidden: false, redirect: '' }
]

/**
 * id: id
 * name: 应用名称
 * appName: qiankun注册名称 子应用appName
 * entry: 入口
 * activeRule: 匹配规则
 */
const appList = [
  { id: 0, name: '主应用', appName: 'app-main', entry: '/', activeRule: '/' },
  { id: 1, name: '应用A', appName: 'app-vue-demo1', entry: '//localhost:9001', activeRule: '/app-vue-demo1/' },
  { id: 2, name: '应用B', appName: 'app-vue-demo2', entry: '//localhost:9002', activeRule: '/app-vue-demo2/' },
  { id: 3, name: '应用C', appName: 'app-vue-demo3', entry: '//localhost:63342/qiankun-h5/index.html?_ijt=1t3k0ddscb7tq7egrl3f3qk767', activeRule: '/app-vue-demo3/' }
]

const userInfo = {
  username: 'gk黎光'
}

// 登陆接口
export function handleLogin (params) {
  return Promise.resolve(userInfo)
}

// 获取应用列表
export function handleApp () {
  return Promise.resolve(appList)
}

// 获取菜单信息
export function handleAppMenu (params) {
  return Promise.resolve(menuList)
}
