export const SET_ROUTE_PATH = 'setRoutePath'
export const SET_ROUTE_PARAMS = 'setRouteParams'
export const SET_ROUTE_QUERY = 'setRouteQuery'


const state = {
  path: '/', // String
  params: {}, // Object
  query: {} // String
}

const getters = {

  routePath (state) {
    return state.path;
  },
  routeParams (state) {
    return state.params;
  },
  routeQuery (state) {
    return state.query;
  }

}

const mutations = {

  [SET_ROUTE_PATH] (state, path) {
    state.path = path;
  },
  [SET_ROUTE_PARAMS] (state, params) {
    state.params = params;
  },
  [SET_ROUTE_QUERY] (state, query) {
    state.query = query;
  }

}

export const module = {
  state,
  getters,
  mutations
}
