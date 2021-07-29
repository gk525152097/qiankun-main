<template>
  <div class="index">
    <el-button @click="handleClick">乾坤全局状态测试</el-button>
    <el-button @click="handleVuex">vuex方式测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    handleClick () {
      this.$globalAction.setGlobalState({ info: 2 })
    },
    handleVuex () {
      this.$store.dispatch('global/handleData', { data: 2 })
    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
    .index {
    }
</style>
