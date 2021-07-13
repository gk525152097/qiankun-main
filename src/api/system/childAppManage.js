let appList = [
  { id: 0, name: '主应用', appName: 'app-main', entry: '/', activeRule: '/' },
  { id: 1, name: '应用A', appName: 'app-vue-demo1', entry: '//localhost:9001', activeRule: '/app-vue-demo1/' },
  { id: 2, name: '应用B', appName: 'app-vue-demo2', entry: '//localhost:9002', activeRule: '/app-vue-demo2/' },
  { id: 3, name: '应用C', appName: 'app-vue-demo3', entry: '//localhost:9003', activeRule: '/app-vue-demo3/' }
]

// 应用查询
export function handlePageData (params) {
  return Promise.resolve(appList)
}

// 应用删除
export function handleDelete (params) {
  appList = appList.filter(item => item.id !== params.id)
  return Promise.resolve(appList)
}

// 应用信息
export function handleAdd (params) {
  console.log(params)
  appList.push({
    ...params,
    id: new Date().valueOf()
  })
  return Promise.resolve(appList)
}

// 应用修改
export function handleModify (params) {
  appList = appList.map(item => {
    if (item.id === params.id) {
      return {
        ...item,
        ...params
      }
    }
    return item
  })
  return Promise.resolve(appList)
}
