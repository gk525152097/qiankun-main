// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import element from 'element-ui'
import store from './store'
import GlobalCard from '@/components/GlobalCard'
import globalAction from './qiankun'

import './permission'
import '@/utils/scrollBar'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/scss/vueTransition.scss'
// import './assets/scss/common.scss' // 全局引入
import './assets/scss/theme.scss'

Vue.use(element)
Vue.use(Vuex)
Vue.use(GlobalCard)

Vue.prototype.$globalAction = globalAction // 乾坤通信

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#mainApp',
  router,
  store,
  components: { App },
  template: '<App/>'
})
