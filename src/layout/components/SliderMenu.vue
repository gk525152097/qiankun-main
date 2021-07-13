<template>
  <div class="SilderMenu2">
    <template v-if="onlyApp">
      <div class="separate-title">应用</div>
      <el-menu :default-active="appActive" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-submenu index="app">
          <template slot="title">
            <i class="el-icon-s-help"></i>
            <span slot="title">应用系统</span>
          </template>
          <el-menu-item v-for="(item, index) in appList" :index="item.activeRule" :key="index" @click.native="handleApp(item)">{{ item.name }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </template>
    <div class="separate-title" v-show="onlyApp">菜单</div>
    <SliderMenuTree :isCollapse="isCollapse" :routers="menuTree"></SliderMenuTree>
  </div>
</template>

<script>
import SliderMenuTree from './SliderMenuTree'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SliderMenu',
  components: {
    SliderMenuTree
  },
  props: {
    isCollapse: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      appActive: '/'
    }
  },
  computed: {
    ...mapState({
      appList: state => state.system.appList,
      menuTree: state => state.system.menuTree,
      mainAppMenu: state => state.system.mainAppMenu
    }),
    onlyApp () { // 只有一个应用的时候 不显示应用菜单 和 分隔信息
      return !(this.appList.length <= 1)
    }
  },
  watch: {
    $route () {
      this.handleActiveMenu()
      if (this.$route.meta.mainRoute) {
        this.SET_MENU_TREE(this.mainAppMenu)
      }
    },
    /**
     * 主要监听 跳转子应用 后 菜单发生变化
     */
    menuTree () {
      this.handleActiveMenu()
    }
  },
  methods: {
    ...mapMutations({
      SET_MENU_TREE: 'system/SET_MENU_TREE'
    }),
    /**
     * 切换激活菜单
     */
    handleActiveMenu () {
      const { path } = this.$route
      this.appActive = '/'
      this.$nextTick(() => {
        for (let i = 1; i < this.appList.length; i++) {
          if (path.includes(this.appList[i].activeRule)) {
            this.appActive = this.appList[i].activeRule
          }
        }
      })
    },
    /**
     * 切换应用
     * 1、清空菜单
     * 2、判断是否为主应用 是 则回填主应用菜单
     * 3、子应用菜单 根据子应用注册返回结果 来渲染菜单
     */
    handleApp (app) {
      this.SET_MENU_TREE([]) // 清空菜单
      if (app.entry === '/' || app.activeRule === '/') {
        // 切换回主应用 需要重新添加路由
        this.SET_MENU_TREE(this.mainAppMenu)
      }
      this.$router.push({ path: app.activeRule, mate: app })
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common.scss";
>>> .menu-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

>>> .el-menu {
  transition: var(--transition-m);
  border: none;
  background: transparent;
  margin-left: -12px;
}
>>> .el-submenu__title {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
  padding-left: 20px;
  color: #ffffff;
}
>>> .el-submenu__title:hover  {
  transform: translateX(5px);
  background: none;
}
>>> .el-menu-item {
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-radius: var(--border-radius-m);
  padding-left: 20px;
}
>>> .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
>>> .el-menu-item-group__title {
  padding-left: 20px;
}
>>> .el-menu-item:hover {
  transition: all 0.3s;
  transform: translateX(5px);
  background: none;
}
>>> .el-menu-item:focus {
  background: transparent;
}
>>> .el-menu-item.is-active {
  color: rgba(var(--color-font-contrary), 1);
  background: Gradients(118deg, var(--color-primary));
  box-shadow: BoxShow(var(--color-primary));
}
>>> .el-menu--collapse .is-active {
  width: 60px;
}
.SilderMenu2 {
  .separate-title {
    font-size: 16px;
    color: rgba(var(--color-primary), 1);
    margin: 20px 0 8px 0;
  }
}
</style>
