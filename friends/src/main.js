import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastClick from 'fastclick'
import location from 'scripts/location'
import Notice from './components/notice'
import Toast from './components/toast'
import Indicator from './components/indicator'
import Dialog from './components/dialog'
import 'scss/common.scss'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(Notice)
Vue.use(Toast)
Vue.use(Indicator)
Vue.use(Dialog)

let svg = require.context('svg', false, /\.svg$/)
svg.keys().forEach(svg)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    return location().then(function ({lng = null, lat = null, positionCity = null}) {
      if (lng && lat) {
        // 更新坐标信息
        store.commit('updatePosition', {
          lng,
          lat
        })
      }
      if (positionCity) {
        // 设置当前城市
        store.commit('changeLocationCity', positionCity)
      }
    })
  }
})
