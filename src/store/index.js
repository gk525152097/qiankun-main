import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter.js'
import system from './modules/system'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    system
  },
  getters
})

export default store
