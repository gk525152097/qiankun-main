<template>
  <div class="Header">
     <div class="wrapper">
       <div class="left">
         <div class="img"></div>
         <div class="title">
           <el-dropdown v-if="onlyApp">
            <span class="title app">
              乾坤-{{ activeAppName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in appList" :key="index" @click.native="handleApp(item)">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
           </el-dropdown>
           <span class="title app" v-else>
             {{ activeAppName }}
           </span>
         </div>
       </div>
       <div class="right">
         <i class="el-icon-search icon" />
         <el-dropdown>
            <span class="info">
              <span>{{ username }}</span>
              <el-avatar size="small" :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"></el-avatar>
            </span>
           <el-dropdown-menu slot="dropdown">
             <el-dropdown-item @click.native="handleLogout">登出系统</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
       </div>
     </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  components: {},
  props: {},
  data () {
    return {
      activeAppName: ''
    }
  },
  computed: {
    ...mapState({
      appList: state => state.system.appList,
      mainAppMenu: state => state.system.mainAppMenu,
      username: state => state.system.username
    }),
    onlyApp () { // 只有一个应用的时候 不显示应用菜单 和 分隔信息
      return !(this.appList.length <= 1)
    }
  },
  watch: {
  },
  methods: {
    handleLogout () {
      console.log('handleLogout')
      this.$router.push({ path: '/login' })
    },
    /**
     * 切换应用
     */
    handleApp (app) {
      console.log(app)
      console.log(this.$router.getRoutes())
      // if (app.activeRule === '/') {
      //   this.$router.push({ path: '/childAppManage' })
      //   return false
      // }
      this.$router.push({ path: app.activeRule, mate: app })
    }
  },
  created () {
  },
  mounted () {
    if (this.appList.length) this.activeAppName = this.appList[0].name
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
.Header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .wrapper {
    flex: 1;
    box-sizing: border-box;
    height: 60px;
    background: Gradients(118deg, var(--color-primary));
    /*border-radius: 0 0 12px 12px;*/
    @include box-shadow;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: flex-end;
      .img {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: Gradients(118deg, var(--color-primary));
        margin-right: 8px;
        border: 1px solid #ffffff;
      }
      .title {
        overflow: hidden;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        font-family: cursive;
        &.app {
          cursor: pointer;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .icon {
        color: #FFF;
        cursor: pointer;
      }
      .info {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          margin: 0 12px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
