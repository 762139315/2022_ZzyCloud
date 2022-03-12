<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="Home_title">族库管理后台</div>
      <div class="home_signOut">
        <div>管理员</div>
        <el-button type="primary" @click="signOut">退出登陆</el-button>
      </div>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width= "isCollapse ? '64px':'200px'">
        <!-- 侧边栏 折叠按钮 -->
        <div class="toggle_button" @click="addClickToggleButton">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router = "true"
          default-active="/MaterialLibrary"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-document"></i>
              <!-- 文本 -->
              <span>建筑库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>上传/修改模型</span>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>模型拆解入库</span>
              </template>
            </el-menu-item>
          </el-submenu>
           <!-- 一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>族库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="2-1-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>上传/修改单本</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item index="2-1-2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>模型分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>材料库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="3-3-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>预警类型</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>材质库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.MaterialLibrary">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>材质库</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>定额编号库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="5-5-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>定额类别库</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文化信息库</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="6-6-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>文化库分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>UE4</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="7-7-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>模型内部</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item index="1-1-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>模拟演变</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item index="1-1-3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>工法拆解</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>业务后台</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="8-8-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>导航四</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>H5小程序</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="9-9-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>导航四</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 页面内容主题 -->
      <el-main>
        <!-- 占位符 -->
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false,
      subItem: {
        MaterialLibrary: 'MaterialLibrary'
      }
    }
  },
  methods: {
    signOut () {
      this.$router.push('./login')
    },
    addClickToggleButton () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Home_title {
    font-size: 32px;
    font-weight: 650;
    color: #fff;
  }
  .home_signOut {
    display: flex;
    align-items: center;
    div {
      margin-right: 20px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
.toggle_button {
  background-color: #4a5064;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor:pointer;
}
</style>
