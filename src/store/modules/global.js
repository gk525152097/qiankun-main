import globalAction from '@/qiankun'
const global = {
  namespaced: true,

  state: {
    globalData: {}
  },

  mutations: {
    HANDLE_DATA: (state, data) => {
      state.globalData = data
    }
  },
  actions: {
    handleData ({ state, commit }, data) {
      const newData = {
        ...state.globalData,
        ...data
      }
      commit('HANDLE_DATA', newData)
      globalAction.setGlobalState(newData)
    }
  }
}

export default global
