<template>
  <div class="MainLayout">
    <div class="header">
      <Header />
    </div>
    <div class="contain">
      <transition :name="routerTransition" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="handleKey" />
        </keep-alive>
      </transition>
      <transition :name="routerTransition" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"/>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'MainLayout',
  components: {
    Header
  },
  props: {},
  data () {
    return {
      routerTransition: 'zoom-fade'
    }
  },
  computed: {
    handleKey () {
      return this.$route.meta && this.$route.meta.appName ? this.$route.meta.appName : this.$route.fullPath
    }
  },
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.MainLayout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {

  }
  .contain {
    flex: 1;
  }
}
</style>
