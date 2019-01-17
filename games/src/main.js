import Vue from 'vue'
import FastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueScroller from 'vue-scroller'
import App from './App'
import router from './config'
import Vuex from 'vuex'
import { ToastPlugin, dateFormat } from 'vux'
import { AlertPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import './page.config'


import VueSocketio from 'vue-socket.io'
//后台地址信

function getUrl()
  {
      var json = {}
      var url = window.location.href;
      if(url.match(/\?/gi)===null)
      {
          alert('找不到网站标识符')
          return false;
      }
      var nUrl = url.split('?')[1].split('&');
      for(var i = 0;i<nUrl.length;i++)
      {
        let arr = [];
        arr = nUrl[i].split('=')
        arr[1] = arr[1].split('#')[0]
        json[arr[0]] = arr[1]
      }
     return json;
  }


var siteid = getUrl().sites;
Vue.prototype.OPENURL = Vue.prototype.SITEINFO[siteid]
console.log('siteInfo',Vue.prototype.SITEINFO)
  Vue.use(VueSocketio, Vue.prototype.SITEINFO[siteid])

// var fs = require('fs')
// Vue.use(require('vue-svg'),{
//   sprite: fs.readFileSync(__dirname + 'sprites.svg', 'utf8'),
//   prefix: 'svg-sprite--'
// })
require('swiper/dist/css/swiper.css')
// 发布时不打包mock
// if (process.env.NODE_ENV !== 'production') {
//   require('../static/js/mock.js')
//   require('../static/js/mockSk.js')
//   require('../static/js/mockZ.js')
// }
require('@/config/axios')
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)
Vue.use(ToastPlugin)
Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
const store = new Vuex.Store(
  {
    state: {
      baseUrl: ''
    },
    actions: {
    },
    mutations: {
      showWebSite (state) {
        console.log(state.webSite)
      }
    },
    getters: {
    },
    modules: {
    }
  }
)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.toastPosition = 'bottom'
Vue.prototype.commentDate = function (a) {
  if (typeof a === 'number') {
    return dateFormat(new Date(a), 'YYYY/MM/DD')
  } else {
    a = a.replace(/-/g, '/')
    return dateFormat(new Date(a), 'YYYY/MM/DD')
  }
}

// sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
