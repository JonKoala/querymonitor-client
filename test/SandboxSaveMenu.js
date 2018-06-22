import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { NAMESPACE } from 'store/views/sandbox.type'
import { SET_QUERY_TITLE } from 'store/mutations.type'
import SandboxSaveMenu from 'components/SandboxSaveMenu'

import mockStore from './mocks/store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('SandboxSaveMenu.vue', function() {

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

    it('Should display a loading bar when the query is being saved', function() {
      store.commit([NAMESPACE, 'changeIsSaving'].join('/'), true);

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__progress div').element.style.height).to.not.equal('0px');
    });

    it('Should render the query title', function() {
      store.commit('changeQueryTitle', 'title');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__query-title input').element.value).to.equal('title');
    });

    it('Should render the query body', function() {
      store.commit('changeQueryBody', 'query');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__query-body textarea').element.value).to.equal('query');
    });

    it('Should disable the save-button when the query is being saved', function() {
      store.commit([NAMESPACE, 'changeIsSaving'].join('/'), true);

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__save-button').element.disabled).to.be.true;
    });

    it('Should disable the save-button when there is no query', function() {
      store.commit('changeQueryTitle', 'title');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__save-button').element.disabled).to.be.true;
    });

    it('Should disable the save-button when there is no query', function() {
      store.commit('changeQueryBody', 'query');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__save-button').element.disabled).to.be.true;
    });

    it('Should enable the save-button when there is a query and title', function() {
      store.commit('changeQueryTitle', 'title');
      store.commit('changeQueryBody', 'query');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      expect(wrapper.find('.sandbox-save-menu__save-button').element.disabled).to.be.false;
    });

  });

  describe('Events', function() {

    var store, setQueryTitleSpy;
    beforeEach(function() {
      setQueryTitleSpy = sinon.spy();
      storeModel.mutations[SET_QUERY_TITLE] = setQueryTitleSpy;

      store = new Vuex.Store(storeModel);
    });

    afterEach(function() {
      store.dispatch('resetStore');
    });

    it('Should emit the \'save\' event when the save-button is clicked', function() {
      store.commit('changeQueryTitle', 'title');
      store.commit('changeQueryBody', 'query');

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      wrapper.find('.sandbox-save-menu__save-button').trigger('click');
      expect(wrapper.emitted()).to.have.all.keys('save');
      expect(wrapper.emitted().save.length).to.equal(1);
    });

    it('Should call the SET_QUERY_TITLE mutation when changing the title', function() {

      var wrapper = mount(SandboxSaveMenu, { localVue, store });
      wrapper.find('.sandbox-save-menu__query-title input').element.value = 'titulo';
      wrapper.find('.sandbox-save-menu__query-title input').trigger('input');
      expect(setQueryTitleSpy.calledOnce).to.be.true;
      expect(setQueryTitleSpy.getCall(0).args[1]).to.equal('titulo');
    });

  });

});
