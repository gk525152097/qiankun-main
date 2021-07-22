<template>
  <div class="index">
    <div id="container" />
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import store from '@/store'
import { mapMutations } from 'vuex'
import { jumpRouter } from '@/utils/jumpRouter'
export default {
  name: 'ChildPage',
  components: {},
  props: {},
  data () {
    return {
      microApp: ''
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      SET_MENU_TREE: 'system/SET_MENU_TREE'
    }),
    /**
     * 加载子应用
     */
    handleInitChildApp () {
      this.microApp = ''
      this.$nextTick(() => {
        this.microApp = loadMicroApp(
          {
            name: this.$route.meta.appName,
            entry: this.$route.meta.entry,
            container: '#container',
            props: {
              microStore: store, // 主应用store
              childAppList: window.childAppList, // 子应用store挂载位置
              jumpRouter: jumpRouter // 全局跳转方法
            }
          }
        )
        /**
         * 子应用 loadPromise
         * 用于处理子应用加载结果
         */
        this.microApp.loadPromise
          .then(res => {
            // console.log(`${this.$route.meta.name} 加载成功`)
          })
          .catch(res => {
            this.$message.closeAll()
            this.$message({
              message: '子应用加载失败',
              type: 'error'
            })
            sessionStorage.setItem('failChildAppPath', this.$route.fullPath)
            setTimeout(() => {
              this.$router.back(-1)
              this.$message.closeAll()
            }, 1000)
          })
        this.handleAppMountPromise()
      })
    },
    /**
     * 处理子应用Mount回调
     */
    handleAppMountPromise () {
      /**
       * 子应用 mountPromise
       * 用于处理子应用菜单挂载到主应用菜单上
       */
      this.microApp && this.microApp.mountPromise
        .then(res => {
          // console.log(window.childAppList)
          // console.log(this.$route.meta)
        })
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    this.handleInitChildApp()
  },
  activated () {
    /**
     * 路由缓存 在激活后重新加载
     */
    console.log('activated')
    this.handleAppMountPromise()
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
