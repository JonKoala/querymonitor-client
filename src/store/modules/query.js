import Vue from 'vue'

import ApiService from 'services/api.service'

import { DELETE_QUERY, FETCH_QUERY, SAVE_QUERY } from 'store/actions.type'
import { RESET_QUERY_STATE, SET_QUERY_BODY, SET_QUERY_ID, SET_QUERY_TITLE } from 'store/mutations.type'


const initialState = {
  id: null, // Number
  body: null, // Array
  title: null // String
}
const state = Object.assign({}, initialState)

const getters = {

  queryId(state) {
    return state.id;
  },
  queryBody (state) {
    return state.body;
  },
  queryTitle (state) {
    return state.title;
  }

}

const mutations = {

  [SET_QUERY_ID] (state, id) {
    state.id = id;
  },
  [SET_QUERY_BODY] (state, body) {
    state.body = body;
  },
  [SET_QUERY_TITLE] (state, title) {
    state.title = title;
  },
  [RESET_QUERY_STATE] (state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }

}

const actions = {

  async [DELETE_QUERY] ({ commit, getters }) {
    await ApiService.delete(`queries/${getters.queryId}`);
    commit(RESET_QUERY_STATE);
  },
  async [FETCH_QUERY] ({ commit }, id) {
    commit(RESET_QUERY_STATE);

    var query = await ApiService.get(`queries/${id}`);
    commit(SET_QUERY_ID, query.id);
    commit(SET_QUERY_BODY, query.corpo);
    commit(SET_QUERY_TITLE, query.titulo);
  },
  async [SAVE_QUERY] ({ commit, getters }) {
    var saved = null;
    if (getters.queryId)
      saved = await ApiService.put('queries', { id: getters.queryId, corpo: getters.queryBody, titulo: getters.queryTitle });
    else
      saved = await ApiService.post('queries', { corpo: getters.queryBody, titulo: getters.queryTitle });

    commit(SET_QUERY_ID, saved.data.id);
    commit(SET_QUERY_BODY, saved.data.corpo);
    commit(SET_QUERY_TITLE, saved.data.titulo);
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
