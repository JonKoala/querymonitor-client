import Vue from 'vue'
import Vuex from 'vuex'

import query from './modules/query'
import select from './modules/select'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    query,
    select
  }
})
