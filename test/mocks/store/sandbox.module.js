import { DELETE_LOCAL_QUERY, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'


const state = {
  isDeletingQuery: false,
  isExecutingQuery: false,
  isSaving: false,
  viewMode: null,
  paramId: null
}

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
  changeParamId: (state, newValue) => { state.paramId = newValue }
}

const actions = {
  [DELETE_LOCAL_QUERY]: () => {},
  [EXECUTE_QUERY]: () => {},
  [SAVE_LOCAL_QUERY]: () => {},
  [START_VIEW]: () => {}
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
