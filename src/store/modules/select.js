import Vue from 'vue'

import ApiService from 'services/api.service'
import NotepadService from 'services/notepad.service'

import { EXECUTE_SELECT } from 'store/actions.type'
import { RESET_SELECT_STATE, SET_SELECT_ERROR, SET_SELECT_LINES } from 'store/mutations.type'


const initialState = {
  lines: null, // Array
  error: null // String
}
const state = Object.assign({}, initialState)

const getters = {

  selectResult (state) {
    return state.lines;
  },
  selectError (state) {
    return state.error;
  }

}

const mutations = {

  [SET_SELECT_LINES] (state, lines) {
    state.lines = lines;
  },
  [SET_SELECT_ERROR] (state, error) {
    state.error = error;
  },
  [RESET_SELECT_STATE] (state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }

}

const actions = {

  async [EXECUTE_SELECT] ({ commit }, query) {

    commit(RESET_SELECT_STATE);

    try {
      var inlinedQuery = NotepadService.inline(query);
      var result = await ApiService.get(`select/${inlinedQuery}`);
      commit(SET_SELECT_LINES, result);
    } catch (err) {
      if (err.response && err.response.status === 500 && ['SequelizeDatabaseError', 'QuerymonitorError'].includes(err.response.data.type))
        commit(SET_SELECT_ERROR, err.response.data.message);
      else
        throw err;
    }

  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
