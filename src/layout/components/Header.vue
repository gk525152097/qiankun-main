<template>
  <div class="Header">
     <div class="wrapper">
       <div class="left">
         <div class="img"></div>
         <div class="title">
           乾坤-微前端-结构框架
         </div>
         <div class="app">
           <div :class="['item', activeApp === index ? 'active' : '']" v-for="(item, index) in appList" :key="index" @click="handleApp(item, index)">
             <div>{{ item.name }}</div>
           </div>
           <div @click="() => $router.push({ path: '/iframe' })">
             <div>iframe</div>
           </div>
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
      activeApp: 0
    }
  },
  computed: {
    ...mapState({
      appList: state => state.system.appList,
      mainAppMenu: state => state.system.mainAppMenu,
      username: state => state.system.username
    })
  },
  watch: {
    $route () {
      this.handleActiveApp()
    }
  },
  methods: {
    handleActiveApp () {
      for (let i = 1; i < this.appList.length; i++) {
        if (this.$route.fullPath.indexOf(this.appList[i].activeRule) > -1) {
          this.activeApp = i
          break
        }
        this.activeApp = 0
      }
    },
    handleLogout () {
      console.log('handleLogout')
      this.$router.push({ path: '/login' })
    },
    /**
     * 切换应用
     */
    handleApp (app, index) {
      this.activeApp = index
      this.$router.push({ path: app.activeRule, mate: app })
    }
  },
  created () {
  },
  mounted () {
    this.handleActiveApp()
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
      align-items: center;
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
        margin-right: 20px;
      }
      .app {
        display: flex;
        align-items: center;
        .item {
          cursor: pointer;
          padding: 12px;
          margin: 12px 4px 12px 0;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          color: #ffffff;
          &:before {
            border-radius: 0 0 8px 8px;
            transition: all 0.3s;
            content: '';
            position: absolute;
            top: -12px;
            left: 0;
            width: 100%;
            height: calc(100% + 24px);
          }
          &:hover, &.active {
            div {
              z-index: 1;
            }
            &:before {
              background: #2e3357;
            }
          }
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
