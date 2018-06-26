import Vue from 'vue'

import ApiService from 'services/api.service'
import NotepadService from 'services/notepad.service'

import { EXECUTE_PAGINATED_SELECT, EXECUTE_SELECT } from 'store/actions.type'
import { RESET_SELECT_STATE, SET_SELECT_ERROR, SET_SELECT_LINES, SET_SELECT_LINES_PER_PAGE, SET_SELECT_PAGE, SET_SELECT_TOTAL } from 'store/mutations.type'


const initialState = {
  lines: null, // Array
  error: null, // String

  total: 0
}
const state = Object.assign({}, initialState)

const getters = {

  selectResult (state) {
    return state.lines;
  },
  selectError (state) {
    return state.error;
  },
  selectTotal (state) {
    return state.total;
  }

}

const mutations = {

  [SET_SELECT_LINES] (state, lines) {
    state.lines = lines;
  },
  [SET_SELECT_ERROR] (state, error) {
    state.error = error;
  },
  [SET_SELECT_TOTAL] (state, total) {
    state.total = total;
  },
  [RESET_SELECT_STATE] (state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }

}

const actions = {

  async [EXECUTE_SELECT] ({ commit }, query) {

    try {
      var inlinedQuery = NotepadService.inline(query);
      var result = await ApiService.get(`select/${inlinedQuery}`);

      commit(SET_SELECT_ERROR, initialState.error);
      commit(SET_SELECT_LINES, result);
    } catch (err) {
      if (err.response && err.response.status === 500 && ['SequelizeDatabaseError', 'QuerymonitorError'].includes(err.response.data.type)) {
        commit(SET_SELECT_ERROR, err.response.data.message);
        commit(SET_SELECT_LINES, initialState.lines);
      } else {
        throw err;
      }
    }

  },

  async [EXECUTE_PAGINATED_SELECT] ({ commit }, params) {

    try {
      params.query = NotepadService.inline(params.query);
      var response = await ApiService.get('select/paginated', { params });

      commit(SET_SELECT_ERROR, initialState.error);
      commit(SET_SELECT_LINES, response.result);
      commit(SET_SELECT_TOTAL, response.total);
    } catch (err) {
      if (err.response && err.response.status === 500 && ['SequelizeDatabaseError', 'QuerymonitorError'].includes(err.response.data.type)) {
        commit(SET_SELECT_ERROR, err.response.data.message);
        commit(SET_SELECT_LINES, initialState.lines);
        commit(SET_SELECT_TOTAL, initialState.total);
      } else {
        throw err;
      }
    }

  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
