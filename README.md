# qiankun

微前端解决方案

> https://qiankun.umijs.org/zh

## 主应用配置

在vue做基低的主应用中安装qiankun

> npm i qiankun -S

```
// 全局注册子应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
```

```
// 手动加载子应用
this.microApp = loadMicroApp({
    // ...this.$route.meta,
    name: 'app-main',
    entry: '/',
    activeRule: '/',
    container: '#container',
    props: {}
})
```

## 子应用配置

子应用修改页面渲染方式

暴露生命周期

配置webpack相关
```
// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'

Vue.config.productionTip = false

let router = null
let instance = null

function render ({ container } = {}) {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue-demo1' : '/', // 与主应用activeRule相同
    mode: 'history', // 路由模式
    routes
  })

  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#appContainer') : '#appContainer')
}

if (window.__POWERED_BY_QIANKUN__) {
  /* eslint-disable */
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  /* eslint-disable */
} else {
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap () {
  console.log('child1-bootstrap')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  console.log('child1-mount')
  render(props);
  // ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount (props) {
  console.log('child1-unmount')
  // ReactDOM.unmountComponentAtNode(
  //   props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  // );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update (props) {
  console.log('child1-update')
  console.log('update props', props)
}
```

```
// vue-cli3
// vue.config.js
const { name } = require('./package');
module.exports = {
  devServer: {
    port: 9003,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
        // eslint-disable-next-line no-unused-vars
      .tap(options => ({ name: '/fonts/[name].[hash:8].[ext]' }))
      .end()
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',// 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

```
// vue-cli2
// webpack.base.conf.js
const { name } = require('./../package')
devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd',// 把子应用打包成 umd 库格式
    // jsonpFunction: `webpackJsonp_${name}`, // 配置项说需要 但是配置之后页面无法获取异步组件
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
```

## 注意点

## 解决问题
> 子应用未启动报错问题

解决方案

    监听子应用实例回调 通过结果提示错误

    又因 跳转问题 tab 已经创建 故 需要额外处理tab问题

    在子应用产生错误的时候 将信息存放的到sessionStorage中 再通过back实现页面返回

    再通过tab的route监听 将数据删除

> 通信问题

vuex方式

    主应用通过注册子应用时候传入vuex实例 和 window对象 实现子应用修改主应用数据

    子应用在激活后 将自身vuex实例 添加到window对象上 实现主应用对所有子应用的通信

    子子通信 同上 都是将vuex挂到window上 以实现数据修改

```
// 主应用 在注册子应用时候处理
loadMicroApp(
  {
    ...this.$route.meta,
    container: '#container',
    props: {
      microStore: store  // 将主应用vuex传给子应该
      globalWindow: window // window对象 用来给子应该挂vuex实例
    }
  }
)

// 子应用 在生命周期处理
export async function mount (props) {
  Vue.prototype.$microStore = props.microStore // 将主应用vuex实例挂到全局
  handleInitChild(props) // 将自己的vuex实例挂到window 并获取其他子应用vuex实例
  render(props)
}

function handleInitChild (props) {
  const { childAppList } = props.globalWindow
  const nameList = childAppList.map(item => item.name)
  Vue.prototype.$childAppList = childAppList // 把所有子应用挂到本项目vue实例上 因为会存在子应用未注册问题
  if (!nameList.includes(appBaseUrl)) { // 防止重复添加子应用store
    props.globalWindow.childAppList.push({
      name: 'app-vue-demo1',
      childStore: store
    })
  }
}

```
qiankun action方式

    主应用注册全局属性 并初始化属性 因为不能修改没有初始化的属性
```
// 主应用 actions.js
import { initGlobalState } from 'qiankun'

    const initialState = {
      // 这里写初始化数据
      test: 1,
      ceshi: 0
    }

    // 初始化 state
    const actions = initGlobalState(initialState)

    actions.onGlobalStateChange((state, prev) => { // 监听公共状态的变化
      console.log('主应用: 变更前')
      console.log(prev)
      console.log('主应用: 变更后')
      console.log(state)
    })

    export default actions

// 子应用 action.js
function emptyAction () { // 设置一个actions实例
  // 提示当前使用的是空 Action
  console.warn('Current execute action is empty!')
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  /**
   * 设置 actions
   */
  setActions (actions) {
    this.actions = actions
  }

  /**
   * 映射
   */
  onGlobalStateChange (...args) {
    return this.actions.onGlobalStateChange(...args)
  }

  /**
   * 映射
   */
  setGlobalState (...args) {
    return this.actions.setGlobalState(...args)
  }
}

const actions = new Actions()
export default actions

// 子应用 mount 生命周期
export async function mount (props) {
  actions.setActions(props); // 注入actions实例
  render(props)
}

// 主应用 修改数据
 actions.setGlobalState({ test: 2 })

// 子应用 修改数据
actions.setGlobalState({ ceshi: 1 })
```

> 路由问题

主应用 和 子应用 都使用history模式

主应用配置 base: process.env.BASE_URL

子应用 只需要修改为history模式

在创建路由时候 子应用路由使用 path* 来处理 即
```
{
    path: `/${item.name}*`, // path*
    meta: item,
    name: item.title,
    component: ChildPage
}
```
但是 会出现问题 就是 主应用tabs创建tab名称都时候 均为子应用名称 没有精确到子应用到菜单名称

这部分 需要修改 tabs组件

> 跳转问题

主应用正常跳转

子应用 做 子应用接入相关配置

    配置 作为子应用接入时候的基础路径

主应用跳子应用

    在创建子应用页面时候配置 childapppath/* 以获取所有子应用页面

    跳转则直接 childapppath/pagepath

子应用跳主应用

    主应用 暴露 跳转方法 并在子应用注册的实际 注入

    子应用在加载的时候获取方法并作为全局方法调用

    原理：通过主应用路由跳转方式实现页面跳转 且 相较于 window.location.href 此方法 不会刷新页面

子应用跳子应用 同上

> 权限问题
如果将 子应用菜单通过 vuex传给主应用 那么 就可以实现子应用管理自己的路由
> 。。。
