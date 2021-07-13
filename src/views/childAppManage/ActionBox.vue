<template>
  <el-dialog
    class="ActionBox"
    :title="getTitle"
    :visible.sync="visible"
    width="50%"
    custom-class="dialog-box"
    :destroy-on-close="true"
    :before-close="() => this.$emit('handleVisibleForm')"
  >
    <span slot="title">
      <span class="title">{{ getTitle }}</span>
      <el-popover
        placement="top-start"
        trigger="hover"
      >
        <span slot="reference" class="sub">说明</span>
        <p>应用名称：接入应用的名称</p>
        <p>应用地址：接入应用的实际网络地址</p>
        <p>匹配路径：主应用匹配子应用的匹配地址</p>
      </el-popover>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="() => this.$emit('handleVisibleForm')">取 消</el-button>
      <el-button type="primary" class="btn-primary" @click="handleOk">确 定</el-button>
    </span>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="应用名称" prop="title">
        <el-input v-model.trim="form.title"></el-input>
      </el-form-item>
      <el-form-item label="应用地址" prop="entry">
        <el-input v-model.trim="form.entry"></el-input>
      </el-form-item>
      <el-form-item label="匹配路径" prop="activeRule">
        <el-input v-model.trim="form.activeRule"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ActionBox',
  components: {},
  props: {
    visible: {
      required: true
    },
    checkItem: {},
    title: {}
  },
  data () {
    return {
      form: {
        title: '',
        entry: '',
        activeRule: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        entry: [
          { required: true, message: '请输入应用地址', trigger: 'blur' }
        ],
        activeRule: [
          { required: true, message: '请输入匹配路径', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return this.title ? this.title : (Object.keys(this.checkItem).length ? '编辑' : '新增')
    }
  },
  watch: {},
  methods: {
    handleOk () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (Object.keys(this.checkItem).length) {
            this.$emit('handleModify', {
              ...this.checkItem,
              ...this.form
            })
          } else {
            this.$emit('handleAdd', this.form)
          }
          this.$refs['form'].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.ActionBox {
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .sub {
    color: #3E3E3E;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
