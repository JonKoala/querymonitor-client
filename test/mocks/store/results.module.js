import { LOAD_RESULTS } from 'store/views/results.type'


const state = {
  paramId: null,
  isLoading: false
}

const getters = {
  paramId: (state) => state.paramId,
  isLoading: (state) => state.isLoading
}

const mutations = {
  changeParamId: (state, newValue) => { state.paramId = newValue },
  changeIsLoading: (state, newValue) => { state.isLoading = newValue }
}

const actions = {
  [LOAD_RESULTS]: () => {}
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
