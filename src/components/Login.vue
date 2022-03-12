<template>
  <div class="login_content">
    <div class="login_box">
      <div class="login_title">苏州控保建筑后台</div>
      <!-- login-form 部分 -->
      <el-form
        ref="loginRuleForm"
        status-icon
        class="login_form"
        :rules="loginRules"
        :model="loginFrom"
        label-width="70px"
      >
        <el-form-item label="用户名:" prop="userName">
          <!-- 用户名 -->
          <el-input
            v-model="loginFrom.userName"
            prefix-icon="iconfont icon-shouji"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord">
          <!-- 密码 -->
          <el-input
            v-model="loginFrom.passWord"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码:">
          <el-input
            v-model="loginFrom.verificationCode"
            prefix-icon="iconfont icon-yanzhengma3"
          ></el-input>
          <span class="verificationCodeCss">
            <img
              src=""
              alt=""
              style="width: 100%; height: 100%; cursor: pointer"
            />
          </span>
        </el-form-item>
        <!-- 登陆和重置按钮 -->
        <el-form-item class="login_Btns">
          <el-button style="width: 100px" type="primary" @click="login"
            >登录</el-button
          >
          <el-button style="width: 100px" type="info" @click="resetForm"
            >重置</el-button
          >
        </el-form-item>
        <!-- 联系客户电话 -->
        <div class="login_connectNumber">联系客服:4008881888</div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      loginFrom: {
        userName: '',
        passWord: '',
        verificationCode: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '密码长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击登陆
    login () {
      this.$refs.loginRuleForm.validate((valid) => {
        console.log(valid)
        if (!valid) {
          return false
        } else {
          this.$message({
            message: '登陆成功!',
            type: 'success'
          })
          this.$router.push('./Home')
        }
      })
    },
    // 点击重置
    resetForm () {
      this.$refs.loginRuleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_content {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    height: 430px;
    width: 450px;
    background-color: #fff;
    position: relative;
    border-radius: 15px;
    .login_title {
      font-size: 32px;
      font-weight: 650;
      color: rgb(51, 51, 51);
      text-align: center;
      padding-top: 10px;
    }
    .login_form {
      position: absolute;
      bottom: 15px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      .verificationCodeCss {
        display: inline-block;
        width: 130px;
        height: 35px;
        margin-top: 22px;
        border: 1px solid #d7d7d7;
      }
    }
    // .login_Btns {
    //   display: flex;
    //   justify-content: center;
    // }
    .login_connectNumber {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      color: rgb(51, 51, 51);
    }
  }
}
</style>
