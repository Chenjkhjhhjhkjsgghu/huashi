import Vue from 'vue'
// 加载vue路由组件
import Router from 'vue-router'
Vue.use(Router)

// import storejs from 'storejs'
// import store from '@/store/Index'
// import * as config from '@/config'

// 配置路由
const router = new Router({
  // mode: 'history',
  // base: window.__ROOT__ || '/',
  routes: require('./router')['routes']
})

// 路由监听（判断登陆检测）
router.beforeEach(({meta, path}, from, next) => {
  // var { auth = true } = meta

  // 校验需要授权的页面
  // if (auth && path !== '/login') {
  //   // 没有登录 / 已授权 && 授权过期
  //   if (!storejs.has(config.TOKEN_KEY) || storejs.get(config.EXPIRES_KEY) < new Date().getTime()) {
  //     store.dispatch('USER_SAFE_LOGOUT')
  //     // 跳转到登录页面
  //     return next({
  //       path: '/login',
  //       query: {
  //         oauth_callback: path
  //       }
  //     })
  //   }
  // }

  return next()
})

router.afterEach(function (to) {})

export default router
