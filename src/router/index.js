import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import MaterialLibrary from '@/components/MaterialLibrary/MaterialLibrary.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [
        {path: '/Welcome', component: Welcome},
        {path: '/MaterialLibrary', component: MaterialLibrary}
      ]
    }
  ]
})
