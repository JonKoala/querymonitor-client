import Vue from 'vue'

import { DELETE_LOCAL_QUERY, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'


const initialState = {
  isDeletingQuery: false,
  isExecutingQuery: false,
  isSaving: false,
  viewMode: null,
  paramId: null
}
const state = Object.assign({}, initialState)

const getters = {
  isDeletingQuery: (state) => state.isDeletingQuery,
  isExecutingQuery: (state) => state.isExecutingQuery,
  isSaving: (state) => state.isSaving,
  viewMode: (state) => state.viewMode,
  paramId: (state) => state.paramId
}

const mutations = {
  changeIsDeletingQuery: (state, newValue) => { state.isDeletingQuery = newValue },
  changeIsExecutingQuery: (state, newValue) => { state.isExecutingQuery = newValue },
  changeIsSaving: (state, newValue) => { state.isSaving = newValue },
  changeViewMode: (state, newValue) => { state.viewMode = newValue },
  changeParamId: (state, newValue) => { state.paramId = newValue },
  resetState: (state) => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions: {},
  namespaced: true
}
