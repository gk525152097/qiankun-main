<template>
  <div class="index">
    <div class="item">
      <div>跳转测试</div>
      <el-button @click="handleRouter(1)" type="primary" >跳转子应用A</el-button>
      <el-button @click="handleRouter(2)" type="primary" >跳转子应用B</el-button>
    </div>
    <div class="item">
      <div>弹窗测试</div>
      <el-button @click="drawer = true" type="primary" >抽屉</el-button>
    </div>
    <div class="item">
      <div>通信测试</div>
      <div>{{ JSON.stringify(globalData) }}</div>
      <el-button @click="handleVuex" type="primary">全局通信</el-button>
    </div>

    <div class="item">
      <div>NProgress测试</div>
      <el-button @click="handleNProgress(1)" type="primary">NProgress 开始</el-button>
      <el-button @click="handleNProgress(0)" type="primary">NProgress 关闭</el-button>
    </div>

    <el-drawer
      title="主应用"
      :visible.sync="drawer"
      :with-header="false">
      <span>主应用 弹窗</span>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {},
  props: {},
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState({
      globalData: state => state.global.globalData
    })
  },
  watch: {
    globalData: {
      handler: (val, oldVal) => {
        console.log('主应用')
        console.log(val)
      },
      deep: true
    }
  },
  methods: {
    handleNProgress (code) {
      if (code) {
        this.$NProgress.start()
      } else {
        this.$NProgress.done()
      }
    },
    handleRouter (code) {
      this.$router.push({ path: `/app-vue-demo${code}` })
    },
    handleVuex () {
      this.$store.dispatch('global/handleData', { data: 2 })
    }
  },
  created () {
  },
  mounted () {
    console.log(this.globalData)
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
    .index {
      .item {
        margin: 24px;
      }
    }
</style>
