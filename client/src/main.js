import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleAuth from 'vue-google-auth'

Vue.use(GoogleAuth, { client_id: '96297730196-r8fgd3j43in9q8a4esbufqf6ual9pvnh.apps.googleusercontent.com' })
Vue.googleAuth().load()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
