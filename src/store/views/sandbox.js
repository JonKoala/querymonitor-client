import Vue from 'vue'

import { EXECUTE_QUERY, END_EXECUTING_QUERY, END_SAVING_QUERY, RESET_SANDBOX_STATE, SAVE_LOCAL_QUERY, START_EXECUTING_QUERY, START_SANDBOX, START_SAVING_QUERY } from './sandbox.type'
import { RESET_QUERY_STATE, RESET_SELECT_STATE } from 'store/mutations.type'
import { EXECUTE_SELECT, SAVE_QUERY } from 'store/actions.type'


const initialState = {
  isExecutingQuery: false,
  isSaving: false,
}
const state = Object.assign({}, initialState)

const getters = {

  isExecutingQuery (state) {
    return state.isExecutingQuery;
  },
  isSaving (state) {
    return state.isSaving;
  }

}

const mutations = {

  [START_EXECUTING_QUERY] (state) {
    state.isExecutingQuery = true;
  },
  [END_EXECUTING_QUERY] (state) {
    state.isExecutingQuery = false;
  },
  [START_SAVING_QUERY] (state) {
    state.isSaving = true;
  },
  [END_SAVING_QUERY] (state) {
    state.isSaving = false;
  },
  [RESET_SANDBOX_STATE] (state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }

}

const actions = {

  [START_SANDBOX] ({ commit }) {
    commit(RESET_SANDBOX_STATE);
    commit(RESET_QUERY_STATE, null, { root: true });
    commit(RESET_SELECT_STATE, null, { root: true });
  },
  async [EXECUTE_QUERY] ({ commit, dispatch, rootGetters }) {
    commit(START_EXECUTING_QUERY);

    try {
      await dispatch(EXECUTE_SELECT, rootGetters.queryBody, { root: true });
    } catch(err) {
      throw err;
    } finally {
      commit(END_EXECUTING_QUERY);
    }
  },
  async [SAVE_LOCAL_QUERY] ({ commit, dispatch, rootGetters }) {
    commit(START_SAVING_QUERY);

    try {
      await dispatch(SAVE_QUERY, null, { root: true });
    } catch(err) {
      throw err;
    } finally {
      commit(END_SAVING_QUERY);
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
