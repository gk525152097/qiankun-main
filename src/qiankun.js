import { initGlobalState } from 'qiankun'

const initialState = {
  // 这里写初始化数据
  test: 1,
  ceshi: 0
}

// 初始化 state
const globalAction = initGlobalState(initialState)

globalAction.onGlobalStateChange((state, prev) => { // 监听公共状态的变化
  console.log('主应用: 变更前')
  console.log(prev)
  console.log('主应用: 变更后')
  console.log(state)
})

export default globalAction
