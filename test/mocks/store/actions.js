import { NAMESPACE as resultsModuleNamespace } from 'store/views/results.type'
import { NAMESPACE as sandboxModuleNamespace } from 'store/views/sandbox.type'


const namespaces = [resultsModuleNamespace, sandboxModuleNamespace];

export default {
  resetStore: ({ commit }) => {
    commit('resetState');
    namespaces.forEach((namespace => commit([namespace, 'resetState'].join('/'))));
  }
}
