<template>
  <div class="white-body-view">
    <el-tree
      id="my-tree"
      ref="tree"
      @node-click="handleNodeClick"
      class="tree-view structure-tree"
      :data="treeData"
      highlight-current
      :default-expand-all="treeExpandAll"
      :props="defaultProps"
      check-strictly
      :node-key="treeNodeKey"
      :auto-expand-parent="false"
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="tooltip">
          <span class="add-f-s-14">{{ data.textName }}</span>
        </span>
        <div v-if="node.isCurrent == true" class="operation-view">
          <i
            class="small-operation-btn el-icon-plus"
            @click.stop="handleAdd(treeData)"
          />
          <i
            class="small-operation-btn el-icon-edit "
            @click.stop="handleEdit(treeData)"
          />
          <i
            class="small-operation-btn el-icon-delete"
            @click.stop="handleDelete(treeData)"
          />
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    // 源数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 树节点是否默认展开
    treeExpandAll: {
      type: Boolean,
      default: true
    },
    // 树节点唯一标识
    treeNodeKey: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectItem: {}
    }
  },

  methods: {
    handleNodeClick (CurrentData) {
      console.log(CurrentData)
      window.localStorage.setItem('CurrentData', JSON.stringify(CurrentData))
    },
    // 添加新增按钮
    handleAdd (treeData) {
      this.$emit('addItem', treeData)
    },
    // 点击删除按钮
    handleDelete (treeData) {
      this.$emit('deleteItem', treeData)
    },

    // 点击编辑按钮
    handleEdit (treeData) {
      this.selectItem = treeData
      this.$emit('editItem', JSON.parse(JSON.stringify(treeData)))
      // console.log('this.selectItem', this.treeEditItem)
    },
    // 删除节点
    treeDeleteItem (val) {
      this.$refs.tree.remove(val)
    },

    // 修改记录，树形列表回显
    treeEditItem (val) {
      Object.assign(this.selectItem, val)
      // this.selectItem = {}
      console.log('this.selectItem', this.selectItem)
    }
  }
}
</script>
<style lang="less" scoped>
.structure-tree {
  .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  #my-tree .el-tree > .el-tree-node {
    min-width: 100%;
    display: inline-block;
  }
  .el-tree-node__content {
    margin-bottom: 10px;
  }
  .tooltip {
    margin-right: 5px;
    font-size: 13px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 4px;
  }
  .operation-view {
    display: inline-block;
    padding: 0px 5px;
    margin-left: 5px;
    color: #777777;
  }
  .small-operation-btn{
    margin:0px 3px;
  }
}

</style>
