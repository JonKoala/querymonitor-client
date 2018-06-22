import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

import resultsModule from './results.module'
import { NAMESPACE as resultsModuleNamespace } from 'store/views/results.type'
import sandboxModule from './sandbox.module'
import { NAMESPACE as sandboxModuleNamespace } from 'store/views/sandbox.type'


export default {
  actions,
  getters,
  mutations,
  state,
  modules: {
    [resultsModuleNamespace]: resultsModule,
    [sandboxModuleNamespace]: sandboxModule
  }
}
