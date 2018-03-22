import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

import App from './App'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
