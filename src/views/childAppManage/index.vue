<template>
  <div class="index">
    <global-card class="card">
      <div class="search-input">
        <el-form v-if="showSearch" label-position="top" label-width="80px" :model="searchForm" ref="searchForm" :rules="searchFormRules">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="应用名称" prop="name">
                <el-input v-model="searchForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目名称" prop="appName">
                <el-input v-model="searchForm.appName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="匹配地址" prop="entry">
                <el-input v-model="searchForm.entry"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-wrapper">
        <div class="left">
          <el-button class="btn-primary" @click="() => handleVisibleForm()">新增</el-button>
        </div>
        <div class="right">
          <el-button class="bg-primary have-bg-color" icon="el-icon-search" circle @click="handlePageData" title="查询"></el-button>
          <el-button class="bg-primary have-bg-color" icon="el-icon-refresh-right" circle @click="handleReset" title="重制"></el-button>
          <el-button v-if="showSearch" icon="el-icon-arrow-up" circle @click="showSearch = !showSearch" title="展开"></el-button>
          <el-button v-else icon="el-icon-arrow-down" circle @click="showSearch = !showSearch" title="收回"></el-button>
        </div>
      </div>
    </global-card>
    <global-card class="card">
      <el-table :data="tableData">
        <el-table-column prop="name" label="应用名称"></el-table-column>
        <el-table-column prop="appName" label="项目名称"></el-table-column>
        <el-table-column prop="entry" label="应用地址"></el-table-column>
        <el-table-column prop="activeRule" label="匹配路径"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="() => handleVisibleForm(scope.row)" >编辑</el-button>
            <el-popconfirm
              title="确认删除？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: var(--margin-m); text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 40, 60, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="totalData">
      </el-pagination>
    </global-card>
    <ActionBox
      :visible="visibleForm"
      :checkItem="checkItem"
      @handleVisibleForm="handleVisibleForm"
      @handleAdd="handleAdd"
      @handleModify="handleModify"
    />
  </div>
</template>

<script>
import { handlePageData, handleDelete, handleAdd, handleModify } from '@/api/system/childAppManage'
import mixin from '@/mixins/cTable'
import ActionBox from './ActionBox'
export default {
  name: 'index',
  components: {
    ActionBox
  },
  props: {},
  mixins: [mixin],
  data () {
    return {
      pageName: 'cTable',
      searchForm: {
        name: '',
        appName: '',
        entry: ''
      }
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    /**
     * 修改
     */
    handleModify (formData) {
      handleModify(formData)
        .then(res => {
          console.log(res)
          this.handlePageData()
          this.handleVisibleForm()
        })
        .catch(res => console.log(res))
    },
    /**
     * 新增
     */
    handleAdd (formData) {
      handleAdd(formData)
        .then(res => {
          console.log(res)
          this.handlePageData()
          this.handleVisibleForm()
        })
        .catch(res => console.log(res))
    },
    /**
     * 删除操作
     * @param record 删除的当前项
     */
    handleDelete (record) {
      handleDelete({ id: record.id })
        .then(res => {
          console.log(res)
          this.handlePageData()
        })
        .catch(res => this.$message(res.message))
    },
    /**
     * 查询
     */
    handlePageData () {
      handlePageData({
        ...this.searchForm,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
        .then(res => { this.tableData = res })
        .catch(res => this.$message(res.message))
    }
  },
  created () {
  },
  mounted () {
    this.handlePageData()
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.index {
  .card {
    margin-bottom: 12px;
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      cursor: pointer;
      margin-right: var(--margin-s);
      &:hover {
        color: rgba(var(--color-primary), 1);
      }
    }
  }
}
</style>
