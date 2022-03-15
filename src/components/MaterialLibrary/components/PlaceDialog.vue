<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      top="150px"
    >
      <el-form
        ref="DialogForm"
        :model="treeData"
        :rules="rules"
        label-width="100px"
        class="demo-form"
      >
        <!-- 材质名称 -->
        <el-form-item label="材质名称" prop="textName">
          <el-input v-model="treeData.textName" />
        </el-form-item>
        <!-- 上级材质 -->
        <el-form-item label="上级材质" prop="parentMateId">
          <el-input v-model="treeData.parentMateId" />
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in superiorMaterial"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="外观" prop="appearance">
          <el-upload
            :auto-upload="false"
            multiple
            :limit="1"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 预警频次 -->
        <el-form-item label="预警频次" prop="warnFrequency">
          <el-input v-model="treeData.warnFrequency" />
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
              <el-button style="margin-left: 10px" type="primary" size="small"
                >管理</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 使用寿命 -->
        <el-form-item label="使用寿命" prop="life">
          <div class="userYear">
            <el-input v-model="treeData.life" />
            <span style="padding-left: 10px">年</span>
          </div>
        </el-form-item>
        <!-- 预警年份 -->
        <el-form-item label="预警年份" prop="warnYear">
          <div class="yearWring">
            <el-input v-model="treeData.warnYear" />
            <span style="padding-left: 10px">年</span>
          </div>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="comment">
          <el-input v-model="treeData.nacommentme" />
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
      dialogVisible: false,
      // 修改
      editTreeQuertinfo: {
        appearance: '323', // 外观
        comment: '', // 备注
        // deleted: '1', // 逻辑删除
        life: '32', // 寿命
        parentText: '323', // 父材质名
        parentTextId: '32', // 父材质id
        // start: '1', // 启用
        textId: '1', // 材质id
        textName: '323', // 材质名
        warnFrequency: '', // 预警频次
        warnType: '323', // 预警类型
        warnYear: '32', // 预警年份
        year: ''
      },
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
      title: '',
      treeData: [],
      rules: {
        mateName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        parentMateId: [{ required: false, message: '请输入描述', trigger: 'blur' }]
      },
      isEdit: false,
      parentId: '',
      data: {}
    }
  },
  methods: {
    resetFields () {
      this.$nextTick(() => {
        this.initFormData()
      })
    },
    changeTitle (val) {
      this.title = val
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * @description 打开弹窗
     * @param { Boolean } isEdit 是否是修改状态 true 修改 / false 新增
     * @param { String } parentId 父级id,新增时默认选中父级时使用
     * @param { Object } data 表单数据，编辑时使用
     */
    openDialog (isEdit, treeData) {
      console.log('isEdit11', treeData)
      this.isEdit = isEdit
      this.title = isEdit ? '修改' : '新增'
      // this.initFormData()
      this.dialogVisible = true
      // 表单展示
      let getCat = JSON.parse(window.localStorage.getItem('CurrentData'))
      console.log('getCat', getCat)
      this.treeData = getCat
      if (this.isEdit) {
        this.$nextTick(() => {
          console.log('treeData', isEdit, treeData)
        })
      }
    },
    // 初始化表单数据
    initFormData () {
      this.treeData = {
        appearance: '',
        comment: '',
        deleted: '',
        life: '',
        mateId: '',
        mateName: '',
        parentMate: '',
        parentMateId: '',
        start: '',
        warnFrequency: '',
        warnType: '',
        warnYear: ''
      }
    },

    // 提交表单
    submitForm () {
      this.$refs.DialogForm.validate((valid) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.treeData))
          if (this.isEdit) {
            this.update()
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
    async update () {
      const { data: res } = await this.$http.post('/cpsp/text/update', {
        params: this.editTreeQuertinfo
      })
      console.log('editTreeQuertinfo', res.data)
    },
    // 关闭当前弹窗
    closeDialog () {
      this.$refs.DialogForm.resetFields()
      this.dialogVisible = false
    }
  },
  created () {}
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
