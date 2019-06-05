import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleAuth from 'vue-google-auth'


/* google auth */

Vue.use(GoogleAuth, { client_id: '96297730196-rpupvmdr3qlv7iq07uo983b14gdoqg87.apps.googleusercontent.com' })
Vue.googleAuth().load()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
