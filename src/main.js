// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import ElementUI from 'element-ui'
// element-ui 样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表格
import './assets/css/global.css'
// 引入阿里字体图标
import './assets/iconfonts/iconfont.css'
// 全局导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.2.252:10099'
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(less)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
