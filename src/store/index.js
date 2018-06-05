import Vue from 'vue'
import Vuex from 'vuex'

import query from './modules/query'
import select from './modules/select'

import results from './views/results'
import { NAMESPACE as resultsNamespace } from './views/results.type'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    query,
    select,

    [resultsNamespace]: results
  }
})
