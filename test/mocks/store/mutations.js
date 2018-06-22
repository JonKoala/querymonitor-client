import Vue from 'vue'

import initialState from './state'


export default {
  changeQueryId: (state, newValue) => { state.queryId = newValue },
  changeQueryBody: (state, newValue) => { state.queryBody = newValue },
  changeQueryTitle: (state, newValue) => { state.queryTitle = newValue },
  changeSelectResult: (state, newValue) => { state.selectResult = newValue },
  changeSelectError: (state, newValue) => { state.selectError = newValue },
  resetState: (state) => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
}
