import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { EXECUTE_PAGINATED_SELECT } from 'store/actions.type'
import SelectResultsTable from 'components/SelectResultsTable'

import mockStore from './mocks/store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('SelectResultsTable.vue', function() {

  var localVue, storeModel;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    storeModel = Object.assign({}, mockStore);
  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(storeModel);
    });

    afterEach(function() {
      store.dispatch('resetStore');
    });

    it('Should hide the pagination when there is only 1 page', async function() {
      var lines = [{'col 1': 'val a', 'col 2': 'val b'}];
      store.commit('changeSelectResult', lines);
      store.commit('changeSelectTotal', lines.length);

      var wrapper = mount(SelectResultsTable, { localVue, store });
      wrapper.setProps({ rows: 1 });

      expect(wrapper.find('.select-results-table__pagination').exists()).to.be.false;
    });

    it('Should display the pagination when there\'s at least 2 pages', async function() {
      var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];
      store.commit('changeSelectResult', lines);
      store.commit('changeSelectTotal', lines.length);

      var wrapper = mount(SelectResultsTable, { localVue, store });
      wrapper.setProps({ rows: 1 });

      expect(wrapper.find('.select-results-table__pagination').exists()).to.be.true;
    });

    it('Should display the right number of pages', async function() {
      var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}, {'col 1': 'val e', 'col 2': 'val f'}];
      store.commit('changeSelectResult', lines);
      store.commit('changeSelectTotal', lines.length);

      var wrapper = mount(SelectResultsTable, { localVue, store, propsData: { rows: 1, maxPages: 10 } });

      expect(wrapper.findAll('.select-results-table__pagination button.pagination__item').length).to.equal(3);
    });

  });

  describe('Events', function() {

    var store, executePaginatedSelectSpy;
    beforeEach(function() {
      executePaginatedSelectSpy = sinon.spy();
      storeModel.actions[EXECUTE_PAGINATED_SELECT] = executePaginatedSelectSpy;

      store = new Vuex.Store(storeModel);
    });

    afterEach(function() {
      store.dispatch('resetStore');
    });

    it('Should call the EXECUTE_PAGINATED_SELECT action on page change', function() {
      var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}, {'col 1': 'val e', 'col 2': 'val f'}];
      store.commit('changeSelectResult', lines);
      store.commit('changeSelectTotal', lines.length);

      var wrapper = mount(SelectResultsTable, { localVue, store, propsData: { rows: 1, maxPages: 10 } });

      expect(executePaginatedSelectSpy.calledOnce).to.be.false;
      wrapper.find('.select-results-table__pagination button.pagination__item:not(.pagination__item--active)').trigger('click');
      expect(executePaginatedSelectSpy.calledOnce).to.be.true;
    });

    it('Should call the EXECUTE_PAGINATED_SELECT action on order change', function() {
      var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}, {'col 1': 'val e', 'col 2': 'val f'}];
      store.commit('changeSelectResult', lines);
      store.commit('changeSelectTotal', lines.length);

      var wrapper = mount(SelectResultsTable, { localVue, store, propsData: { rows: 1, maxPages: 10 } });

      expect(executePaginatedSelectSpy.calledOnce).to.be.false;
      wrapper.find('.results-table__data-table thead th.column.sortable').trigger('click');
      expect(executePaginatedSelectSpy.calledOnce).to.be.true;
    });

  });

});
