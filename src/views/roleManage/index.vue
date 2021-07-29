<template>
  <div class="index">
    <global-card class="card">
      <div class="search-input">
        <el-form v-if="showSearch" label-position="top" label-width="80px" :model="searchForm" ref="searchForm" :rules="searchFormRules">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="searchForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色代码" prop="region">
                <el-input v-model="searchForm.code"></el-input>
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
          <el-button class="btn" icon="el-icon-search" circle @click="handlePageData" title="查询"></el-button>
          <el-button class="btn" icon="el-icon-refresh-right" circle @click="handleReset" title="重制"></el-button>
          <el-button v-if="showSearch" icon="el-icon-arrow-up" circle @click="showSearch = !showSearch" title="展开"></el-button>
          <el-button v-else icon="el-icon-arrow-down" circle @click="showSearch = !showSearch" title="收回"></el-button>
        </div>
      </div>
    </global-card>
    <global-card class="card">
      <el-table :data="tableData">
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="code" label="角色代码"></el-table-column>
        <el-table-column prop="describe" label="角色描述"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="() => handleVisibleForm(scope.row)" >编辑</el-button>
            <el-popconfirm
              title="确认删除？"
              @onConfirm="handleDelete(scope.row)"
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
    <AddBox />
  </div>
</template>

<script>
import mixin from '@/mixins/cTable'
import AddBox from './AddBox'
export default {
  name: 'index',
  components: {
    AddBox
  },
  props: {},
  mixins: [mixin],
  data () {
    return {
      pageName: 'cTable'
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
      // handleModify()
      //   .then(res => console.log(res))
      //   .catch(res => console.log(res))
    },
    /**
     * 新增
     */
    handleAdd (formData) {
      // handleAdd()
      //   .then(res => console.log(res))
      //   .catch(res => console.log(res))
    },
    /**
     * 删除操作
     * @param record 删除的当前项
     */
    handleDelete (record) {
      // handleDelete({ id: record.id })
      //   .then(res => this.$message(res.message))
      //   .catch(res => this.$message(res.message))
    },
    /**
     * 查询
     */
    handlePageData () {
      // handlePageData({
      //   ...this.searchForm,
      //   pageSize: this.pageSize,
      //   currentPage: this.currentPage
      // })
      //   .then(res => { this.tableData = res.data })
      //   .catch(res => this.$message(res.message))
    }
  },
  created () {
  },
  mounted () {},
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common";
.index {
  .card {
    margin-bottom: 12px;
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      .btn-primary {
        @include btn-primary;
      }
    }
    .right {
      .btn {
        color: #ffffff;
        @include bg-primary;
      }
    }
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
