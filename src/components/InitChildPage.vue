<template>
  <div class="InitChildPage">
    <div :id="id"></div>
  </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
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
        window.__CAPTRUE_PAGE__ = true
        if (this.microApp) this.microApp.unmount()
        this.microApp = ''
        this.microApp = loadMicroApp({
          name: app.appName,
          entry: `${app.entry}/${this.entry}`,
          container: `#${this.id}`
        })
      }
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
    window.__CAPTRUE_PAGE__ = false
  }
}
</script>

<style lang="scss" scoped>
    .InitChildPage {
    }
</style>
