import { addGlobalUncaughtErrorHandler } from 'qiankun'

/**
 * 监听qiankun全局错误
 */
addGlobalUncaughtErrorHandler(event => {
  console.log(event)
})
