import Vue from 'vue'

import { LOAD_RESULTS } from 'store/views/results.type'


const initialState = {
  paramId: null,
  isLoading: false
}
const state = Object.assign({}, initialState)

const getters = {
  paramId: (state) => state.paramId,
  isLoading: (state) => state.isLoading
}

const mutations = {
  changeParamId: (state, newValue) => { state.paramId = newValue },
  changeIsLoading: (state, newValue) => { state.isLoading = newValue },
  resetState: (state) => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
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
