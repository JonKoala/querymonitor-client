import { NAMESPACE, DELETE_LOCAL_QUERY, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'

const state = {
  queryBody: null,
  queryId: null,
  queryTitle: null,
  selectResult: null,
  selectError: null
}

const getters = {
  queryBody: (state) => state.queryBody,
  queryId: (state) => state.queryId,
  queryTitle: (state) => state.queryTitle,
  selectResult: (state) => state.selectResult,
  selectError: (state) => state.selectError
}

const mutations = {
  changeQueryBody: (state, newValue) => { state.queryBody = newValue },
  changeQueryId: (state, newValue) => { state.queryId = newValue },
  changeQueryTitle: (state, newValue) => { state.queryTitle = newValue },
  changeSelectResult: (state, newValue) => { state.selectResult = newValue },
  changeSelectError: (state, newValue) => { state.selectError = newValue }
}

const namespacedModule = {
  state: {
    isDeletingQuery: false,
    isExecutingQuery: false,
    isSaving: false,
    viewMode: null
  },
  getters: {
    isDeletingQuery: (state) => state.isDeletingQuery,
    isExecutingQuery: (state) => state.isExecutingQuery,
    isSaving: (state) => state.isSaving,
    viewMode: (state) => state.viewMode
  },
  mutations: {
    changeIsDeletingQuery: (state, newValue) => { state.isDeletingQuery = newValue },
    changeIsExecutingQuery: (state, newValue) => { state.isExecutingQuery = newValue },
    changeIsSaving: (state, newValue) => { state.isSaving = newValue },
    changeViewMode: (state, newValue) => { state.viewMode = newValue }
  },
  actions: {
    [DELETE_LOCAL_QUERY]: () => {},
    [EXECUTE_QUERY]: () => {},
    [SAVE_LOCAL_QUERY]: () => {},
    [START_VIEW]: () => {}
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
