import { END_LOADING, LOAD_RESULTS, START_LOADING } from './results.type'
import { EXECUTE_SELECT, FETCH_QUERY } from 'store/actions.type'


const state = {
  isLoading: false
}

const getters = {

  paramId(state, allGetters, rootState) {
    return rootState.route.params.id
  },
  isLoading(state) {
    return state.isLoading;
  }

}

const mutations = {

  [START_LOADING] (state) {
    state.isLoading = true;
  },
  [END_LOADING] (state) {
    state.isLoading = false;
  }

}

const actions = {

  async [LOAD_RESULTS] ({ commit, dispatch, getters, rootGetters }) {
    commit(START_LOADING);

    try {
      await dispatch(FETCH_QUERY, getters.paramId, { root: true });
      await dispatch(EXECUTE_SELECT, rootGetters.queryBody, { root: true });
    } catch(err) {
      throw err;
    } finally {
      commit(END_LOADING);
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
