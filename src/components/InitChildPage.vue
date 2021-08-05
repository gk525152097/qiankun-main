<template>
  <div class="InitChildPage">
    <div :id="id"></div>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import { jumpRouter } from '@/utils/jumpRouter'
export default {
  name: 'InitChildPage',
  components: {},
  props: {
    app: {
      type: Object,
      required: true
    },
    entry: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      microApp: ''
    }
  },
  computed: {
    id () {
      return `child_${this.app.id || new Date().valueOf}`
    }
  },
  watch: {},
  methods: {
    handleApp () {
      this.microApp = ''
      const app = this.app
      if (app.activeRule !== '/') {
        if (this.microApp) this.microApp.unmount()
        this.microApp = ''
        this.microApp = loadMicroApp({
          name: `page-${app.appName}`,
          entry: `${app.entry}`,
          container: `#${this.id}`,
          props: {
            singlePage: true,
            globalState: this.$store.state.global, // 主应用store的global 遵守数据单向 不允许子应用直接修改主应用数据
            setGlobalState: data => this.$store.dispatch('global/handleData', data),
            jumpRouter: jumpRouter // 全局跳转方法
          }
        }, {
          sandbox: {
            experimentalStyleIsolation: true
          }
        })
      }
      this.microApp.loadPromise
        .then(res => {
          this.$emit('handleChangeRoute')
        })
        .catch(res => {
          this.$message.closeAll()
          this.$message({
            message: '子应用加载失败',
            type: 'error'
          })
          setTimeout(() => {
            this.$emit('handleAppInitError')
          }, 500)
        })
      this.microApp.mountPromise
        .then(res => {
          window._CHIlD_BASE_PATH__ = ''
        })
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.handleApp()
    })
  },
  destroyed () {
    this.microApp.unmount()
  }
}
</script>

<style lang="scss" scoped>
    .InitChildPage {
    }
</style>
