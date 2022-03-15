<template>
  <div>
    <!-- 材质头部区域 -->
    <div class="MaterialLibrary_heade">
      <div class="Material_word">材质</div>
      <div class="MaterialLibrary_search">
        <el-input
          v-model="searchName"
          suffix-icon="el-icon-search"
          placeholder="请输入材质名称"
        ></el-input>
        <el-button @click="searchList" class="cearch" type="primary"
          >查询</el-button
        >
        <el-button @click="resetSearch" class="reset" type="info"
          >重置</el-button
        >
      </div>
    </div>
    <!-- 材质视图区域 -->
    <el-card>
      <div class="white-body-view">
        <custom-tree
          ref="customTree"
          :tree-data="treeData"
          :tree-expand-all="treeExpandAll"
          :tree-node-key="treeNodeKey"
          @addItem="addTreeItem"
          @deleteItem="deleteTreeItem"
          @editItem="editTreeItem"
        />
        <div class="addClassification" @click="addNewRecord()">
          +添加一级分类
        </div>
        <!-- 地点弹窗 -->
        <place-dialog
          ref="placeDialog"
          @addData="addData"
          @editData="editData"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import CustomTree from './components/Tree'
import PlaceDialog from './components/PlaceDialog'
export default {
  name: 'MaterialLibrary',
  components: {
    CustomTree,
    PlaceDialog
  },
  data () {
    return {
      treeData: [],
      treeExpandAll: true,
      treeNodeKey: 'id',
      searchName: '',
      quertinfo: {},
      mateName: '',
      // 添加
      AddQuertinfo: {
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
    }
  },
  created () {
    this.initTreeData()
    // 查询一级菜单
    this.getBasicMate()
  },
  methods: {
    // 查询内容
    searchList (treeData) {
      this.$refs.placeDialog.openDialog(true, treeData)
    },
    async getBasicMate () {
      const { data: res } = await this.$http.get('/cpsp/text/getBasicText', {
        params: this.quertinfo
      })
      this.treeData = res.data
    },
    // 重置搜索内容
    resetSearch () {
      this.searchName = ''
    },
    // 初始化列表
    initTreeData () {
      this.treeData = [
        {
          appearance: '',
          comment: '',
          deleted: '',
          life: '',
          parentText: '',
          parentTextId: '',
          start: '',
          textId: '',
          textName: '',
          warnFrequency: '',
          warnType: '',
          warnYear: ''
        }
      ]
    },
    // 添加新记录
    addNewRecord (treeData) {
      this.$refs.placeDialog.resetFields()
      this.$refs.placeDialog.openDialog(true, treeData)
    },
    // 新增表单数据
    addData () {
      // 新增树节点
      this.treeAddItem()
    },
    // 添加新记录，树形列表回显
    async treeAddItem (treeData) {
      this.$refs.tree.append(treeData, treeData.parentTextId)
      const { data: res } = await this.$http.post('/cpsp/mate/save', {params: this.AddQuertinfo})
      console.log(res)
    },
    // 修改表单数据
    editData (treeData) {
      console.log('editData', treeData)
      // 修改树节点
      this.$refs.customTree.treeEditItem(treeData)
    },
    // 增加树节点
    addTreeItem (treeData) {
      this.$refs.placeDialog.resetFields()
      // 打开地点弹窗，设置默认父级节点
      this.$refs.placeDialog.openDialog(true, treeData)
    },
    // 删除树节点
    deleteTreeItem (data) {
      if (data['children'] !== undefined) {
        this.$message({
          message: '该分类下有下级分类,不能删除!',
          type: 'warning'
        })
      } else {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 删除树节点
            this.$refs.customTree.treeDeleteItem(data)
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 修改树节点
    editTreeItem (treeData) {
      // 打开地点编辑弹窗
      this.$refs.placeDialog.openDialog(true, treeData)
    }
  }
}
</script>

<style lang="less" scoped>
.MaterialLibrary_heade {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Material_word {
    font-size: 20px;
    font-weight: 400;
    padding-left: 20px;
  }
  .MaterialLibrary_search {
    display: flex;
    justify-content: space-around;
    .cearch {
      height: 40px;
      width: 150px;
      margin-left: 20px;
      border-radius: 15px;
    }
    .reset {
      height: 40px;
      width: 150px;
      border-radius: 15px;
    }
  }
}
.el-card {
  margin: 20px 0;
  .addClassification {
    font-size: 14px;
    margin: 20px;
  }
}
</style>
