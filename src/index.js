import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from 'store'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
