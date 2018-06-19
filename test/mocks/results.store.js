import { NAMESPACE, LOAD_RESULTS } from 'store/views/results.type'

const state = {
  queryTitle: null,
  selectResult: null,
  selectError: null
}

const getters = {
  queryTitle: (state) => state.queryTitle,
  selectResult: (state) => state.selectResult,
  selectError: (state) => state.selectError
}

const mutations = {
  changeQueryTitle: (state, newValue) => { state.queryTitle = newValue },
  changeSelectResult: (state, newValue) => { state.selectResult = newValue },
  changeSelectError: (state, newValue) => { state.selectError = newValue }
}

const namespacedModule = {
  state: {
    paramId: null,
    isLoading: false
  },
  getters: {
    paramId: (state) => state.paramId,
    isLoading: (state) => state.isLoading
  },
  mutations: {
    changeParamId: (state, newValue) => { state.paramId = newValue },
    changeIsLoading: (state, newValue) => { state.isLoading = newValue }
  },
  actions: {
    [LOAD_RESULTS]: () => {}
  },
  namespaced: true
}

export default {
  state,
  getters,
  mutations,
  modules: {
    [NAMESPACE]: namespacedModule
  }
}
