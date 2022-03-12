<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      top="150px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="demo-form"
      >
        <!-- 材质名称 -->
        <el-form-item label="材质名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- 上级材质 -->
        <el-form-item label="上级材质" prop="desc">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in superiorMaterial"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="外观" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- 预警频次 -->
        <el-form-item label="预警频次" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- 预警类型-->
        <el-form-item label="预警类型" prop="desc">
          <el-row>
            <el-col :span="20">
              <el-select v-model="value" placeholder="选择预警类型">
              <el-option
                v-for="item in alertType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            </el-col>
          <el-col :span="4">
          <el-button style="margin-left:10px" type="primary" size="small">管理</el-button>
          </el-col>
         </el-row>
        </el-form-item>
        <!-- 使用寿命 -->
        <el-form-item label="使用寿命" prop="name">
          <div class="userYear">
            <el-input v-model="form.name" />
            <span style="padding-left: 10px">年</span>
          </div>
        </el-form-item>
        <!-- 预警年份 -->
        <el-form-item label="预警年份" prop="name">
          <div class="yearWring">
            <el-input v-model="form.name" />
            <span style="padding-left: 10px">年</span>
          </div>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item>
          <el-button class="pull_right" type="primary" @click="submitForm()"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      superiorMaterial: [
        {
          value: '11',
          label: '涂料'
        },
        {
          value: '12',
          label: '油性漆'
        },
        {
          value: '13',
          label: '水性漆'
        },
        {
          value: '14',
          label: '功能性漆'
        },
        {
          value: '15',
          label: '多级筛选'
        }
      ],
      alertType: [
        {
          value: '11',
          label: '日常预警'
        },
        {
          value: '12',
          label: '预防预警'
        }
      ],
      value: '',
      dialogVisible: false,
      title: '',
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        desc: [{ required: false, message: '请输入描述', trigger: 'blur' }]
      },
      isEdit: false,
      parentId: '',
      data: {}
    }
  },
  methods: {
    /**
     * @description 打开弹窗
     * @param { Boolean } isEdit 是否是修改状态 true 修改 / false 新增
     * @param { String } parentId 父级id,新增时默认选中父级时使用
     * @param { Object } data 表单数据，编辑时使用
     */
    openDialog (isEdit, parentId, data) {
      this.isEdit = isEdit
      this.parentId = parentId
      this.data = data
      this.title = isEdit ? '修改' : '新增'
      this.initFormData()
      this.dialogVisible = true
      if (this.isEdit) {
        this.$nextTick(() => {
          this.form = data
        })
      }
    },

    // 初始化表单数据
    initFormData () {
      this.form = {
        name: '',
        desc: ''
      }
    },

    // 提交表单
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.form))
          if (this.isEdit) {
            this.$emit('editData', formData)
          } else {
            // 设置新创建节点的父级编号
            formData.parentId = this.parentId ? this.parentId : ''
            // 随机生成id(仅为前端模拟使用，正常场景应为后台生成)
            formData.id = Math.random()
            this.$emit('addData', formData)
          }
          this.closeDialog()
        }
      })
    },

    // 关闭当前弹窗
    closeDialog () {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input {
  width: 360px;
}
.pull_right {
  width: 150px;
  margin: 0 auto;
}
</style>
