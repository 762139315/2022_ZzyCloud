<template>
  <div>
    <!-- 材质头部区域 -->
    <div class="MaterialLibrary_heade">
      <div class="Material_word">材质</div>
      <div class="MaterialLibrary_search">
        <el-input
          suffix-icon="el-icon-search"
          placeholder="请输入材质名称"
        ></el-input>
        <el-button class="cearch" type="primary">查询</el-button>
        <el-button class="reset" type="info">重置</el-button>
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
        <div class="addClassification" @click="addNewRecord()">+添加一级分类</div>
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
      treeNodeKey: 'id'
    }
  },
  created () {
    this.initTreeData()
  },
  methods: {
    // 初始化列表
    initTreeData () {
      this.treeData = [
        {
          children: [
            {
              children: [],
              name: '油性漆',
              desc: '这是油性漆',
              parentId: '1',
              id: '1'
            },
            {
              children: [],
              name: '水性漆',
              desc: '这是水性漆',
              parentId: '2',
              id: '2'
            },
            {
              children: [],
              name: '功能性',
              desc: '这是功能性',
              parentId: '3',
              id: '3'
            }
          ],
          name: '涂料',
          parentId: '',
          id: '1'
        },
        // 油漆
        {
          name: '油漆',
          parentId: '',
          id: '2'
        },
        // 木漆
        {
          name: '木漆',
          parentId: '',
          id: '3'
        },
        {
          name: '金属漆',
          parentId: '',
          id: '4'
        },
        {
          name: '复合材质',
          parentId: '',
          id: '5'
        }
      ]
    },
    // 添加新记录
    addNewRecord () {
      this.$refs.placeDialog.openDialog(false)
    },
    // 新增表单数据
    addData (data) {
      // 新增树节点
      this.$refs.customTree.treeAddItem(data)
    },
    // 修改表单数据
    editData (data) {
      // 修改树节点
      this.$refs.customTree.treeEditItem(data)
    },
    // 增加树节点
    addTreeItem (data) {
      // 打开地点弹窗，设置默认父级节点
      this.$refs.placeDialog.openDialog(false, data.id)
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
        }).then(() => {
        // 删除树节点
          this.$refs.customTree.treeDeleteItem(data)
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 修改树节点
    editTreeItem (data) {
      // 打开地点编辑弹窗
      this.$refs.placeDialog.openDialog(true, data.parentId, data)
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
