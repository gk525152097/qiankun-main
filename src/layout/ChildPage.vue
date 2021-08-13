<template>
  <div class="index">
    <div id="container" />
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { jumpRouter } from '@/utils/jumpRouter'
export default {
  name: 'ChildPage',
  components: {},
  props: {},
  data () {
    return {
      microApp: '',
      loading: {}
    }
  },
  computed: {},
  methods: {
    /**
     * 处理子应用加载失败
     */
    handleLoadFail () {
      this.$message.closeAll()
      this.$message({
        message: '子应用加载失败',
        type: 'error'
      })
      sessionStorage.setItem('failChildAppPath', this.$route.fullPath)
      setTimeout(() => {
        this.loading.close()
        this.$router.back(-1)
        this.$message.closeAll()
      }, 1000)
    },
    /**
     * 加载子应用
     */
    handleInitChildApp () {
      this.microApp = ''
      this.$nextTick(() => {
        window.__CHIlD_BASE_PATH__ = `/${this.$route.meta.appName}`
        this.microApp = loadMicroApp({
          name: this.$route.meta.appName,
          entry: this.$route.meta.entry,
          container: '#container',
          props: {
            globalState: this.$store.state.global, // 主应用store的global 遵守数据单向 不允许子应用直接修改主应用数据
            setGlobalState: data => this.$store.dispatch('global/handleData', data),
            jumpRouter: jumpRouter // 全局跳转方法
          }
        }, {
          sandbox: {
            // experimentalStyleIsolation: true
          }
        })
        /**
         * 子应用 loadPromise
         * 用于处理子应用加载结果
         */
        this.microApp.loadPromise
          .then(() => {
            this.loading.close()
          })
          .catch(() => {
            this.handleLoadFail()
          })
        this.microApp.mountPromise
          .then(res => {
            window.__CHIlD_BASE_PATH__ = ''
          })
      })
    }
  },
  created () {
  },
  mounted () {
    this.loading = this.$loading({
      lock: true,
      text: '加载中……',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.handleInitChildApp()
  },
  activated () {
    /**
     * keep-alive组件
     * 需要处理重新进来后 子应用加载失败不回退
     */
    if (this.microApp && this.microApp.getStatus() === 'LOADING_SOURCE_CODE') {
      // 加载失败
      this.handleLoadFail()
    }
  },
  deactivated () {

  },
  updated () {
    this.handleInitChildApp()
  },
  destroyed () {
  }
}
</script>

<style  lang="scss">
#container>:first-child {
 height: 100%;
}
</style>

<style lang="scss" scoped>
.index, #container {
  height: 100%;
}

</style>
