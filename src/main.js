import Vue from 'vue'
import App from './App.vue'
// import Plugins from '@/plugins'
import router from './router/index'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from '@/store'
import '@/assets/font/iconfont.css'
Vue.use(Vant)
Vue.use(router)
Vue.config.productionTip = false
// Vue.use(Plugins)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
