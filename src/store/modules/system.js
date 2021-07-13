const system = {
  namespaced: true,

  state: {
    username: '', // 用户名
    appList: [], // 应用列表
    menuTree: [], // 菜单信息
    mainAppMenu: [] // 主应用菜单
  },

  mutations: {
    SET_USERNAME: (state, data) => {
      state.username = data
    },
    SET_APP_LIST: (state, data) => {
      state.appList = data
    },
    SET_MENU_TREE: (state, data) => {
      state.menuTree = data
    },
    SET_MAIN_APP_MENU: (state, data) => {
      state.mainAppMenu = data
    }
  },
  actions: {
    // /**
    //  * 用户登录
    //  * @param commit
    //  * @param data
    //  * @returns {Promise<any>}
    //  */
    // login ({ commit }, data) {
    //   return new Promise((resolve, reject) => {
    //     login(data).then(res => {
    //       commit('SET_USER', res.data)
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }
  }
}

export default system
