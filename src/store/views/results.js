import { END_LOADING, LOAD_RESULTS, START_LOADING } from './results.type'
import { EXECUTE_PAGINATED_SELECT, FETCH_QUERY } from 'store/actions.type'


const state = {
  isLoading: false,
  maxTableRows: 10
}

const getters = {

  paramId (state, allGetters, rootState) {
    return rootState.route.params.id
  },
  isLoading (state) {
    return state.isLoading;
  },
  maxTableRows (state) {
    return state.maxTableRows;
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
      await dispatch(EXECUTE_PAGINATED_SELECT, { query: rootGetters.queryBody, rowsPerPage: getters.maxTableRows, page: 1 }, { root: true });
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
