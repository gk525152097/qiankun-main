<template>
  <div class="index">
    <global-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in appList" :label="item.name" :name="item.name" :key="item.id"/>
      </el-tabs>
      <div v-if="activeName === '' || activeName === appList[0].name">
        <el-button class="btn-primary" @click="() => handleVisibleForm()">+ 新增菜单</el-button>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="() => handleVisibleForm(scope.row)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-for="item in childAppList" :key="item.id">
        <InitChildPage v-if="activeName === item.name" :app="item" @handleAppInitError="handleAppInitError"/>
      </div>
    </global-card>
    <ActionBox
      :checkItem="checkItem"
      :visible="visibleForm"
      @handleVisibleForm="handleVisibleForm"
      @handleAdd="handleAdd"
    />
  </div>
</template>

<script>
import InitChildPage from '@/components/InitChildPage'
import ActionBox from './ActionBox'
import mixin from '@/mixins/cTable'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    ActionBox,
    InitChildPage
  },
  mixins: [mixin],
  props: {},
  data () {
    return {
      microApp: '',
      activeName: '主应用',
      preActiveName: '',
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    ...mapState({
      appList: state => state.system.appList
    }),
    childAppList () {
      return this.appList.filter(item => item.id !== 0)
    }
  },
  watch: {},
  methods: {
    /**
     * 切换应用
     * @param tab
     */
    handleClick (tab) {
      // this.preActiveName = `${this.activeName}`
      // this.activeName = tab.name

      console.log(this.preActiveName)
      console.log(this.activeName)
    },
    handleAdd (record) {
      console.log(record)
    },
    handleAppInitError () {
      this.activeName = `${this.preActiveName}`
    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
    if (this.microApp) this.microApp.unmount()
    window.__CAPTRUE_PAGE__ = false
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common";
.index {
  #container {
    min-height: 200px;
  }
}
</style>
