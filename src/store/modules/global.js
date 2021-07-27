const global = {
  namespaced: true,

  state: {
    globalData: {}
  },

  mutations: {
    HANDLE_DATA: (state, data) => {
      state.globalData = {
        ...state.globalData,
        ...data
      }
    }
  },
  actions: {
  }
}

export default global
