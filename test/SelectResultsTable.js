import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import SelectResultsTable from 'components/SelectResultsTable'

import mockStore from './mocks/store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('SelectResultsTable.vue', function() {

  var localVue, store;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    store = new Vuex.Store(mockStore);
  });

  afterEach(function() {
    store.dispatch('resetStore');
  });


  it('Should hide the pagination area when there is only 1 page', async function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}];
    store.commit('changeSelectResult', lines);
    store.commit('changeSelectTotal', lines.length);

    var wrapper = mount(SelectResultsTable, { localVue, store });
    wrapper.setProps({ rows: 1 });

    expect(wrapper.find('.select-results-table__pagination').exists()).to.be.false;
  });

  it('Should display the pagination area when there is at least 2 pages', async function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];
    store.commit('changeSelectResult', lines);
    store.commit('changeSelectTotal', lines.length);

    var wrapper = mount(SelectResultsTable, { localVue, store });
    wrapper.setProps({ rows: 1 });

    expect(wrapper.find('.select-results-table__pagination').exists()).to.be.true;
  });

  it('Should display the right number of pages');

});
