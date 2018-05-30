import Vue from 'vue'

import ApiService from 'services/api.service'

import { FETCH_QUERY } from 'store/actions.type'
import { RESET_QUERY_STATE, SET_QUERY_BODY, SET_QUERY_TITLE } from 'store/mutations.type'


const initialState = {
  body: null, // Array
  title: null // String
}
const state = Object.assign({}, initialState)

const getters = {

  queryBody (state) {
    return state.body;
  },
  queryTitle (state) {
    return state.title;
  }

}

const mutations = {

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

  async [FETCH_QUERY] ({ commit }, id) {
    commit(RESET_QUERY_STATE);

    var query = await ApiService.get(`queries/${id}`);
    commit(SET_QUERY_BODY, query.corpo);
    commit(SET_QUERY_TITLE, query.titulo);
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
