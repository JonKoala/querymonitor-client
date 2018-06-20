import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { NAMESPACE, DELETE_LOCAL_QUERY, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'
import ViewSandbox from 'views/ViewSandbox'

import mockStoreModel from './mocks/sandbox.store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('ViewSandbox.vue', function() {

  var localVue, mockStore;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    mockStore = Object.assign({}, mockStoreModel);
  });

  describe('Initialization', function() {

    var store, startViewSpy;
    beforeEach(function() {
      startViewSpy = sinon.spy();

      mockStore.modules[NAMESPACE].actions[START_VIEW] = startViewSpy;

      store = new Vuex.Store(mockStore);
    });

    it('Should start by calling the START_VIEW action', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(startViewSpy.calledOnce).to.be.true;
    });

  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(mockStore);
    });

    it('Should show the editor-menu shortly after creation', async function() {
      var clock = sinon.useFakeTimers();

      var wrapper = mount(ViewSandbox, { localVue, store });
      clock.runAll();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__editor-menu').element.parentElement.style.display).to.not.equal('none');
    });

    it('Should enable the execute button when there is a query', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__execute-button button').element.disabled).to.be.false;
    });

    it('Should disable the execute button when there is no query', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', null);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__execute-button button').element.disabled).to.be.true;
    });

    it('Should enable the save-menu button when there is a query', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__save-menu-button button').element.disabled).to.be.false;
    });

    it('Should disable the save-menu button when there is no query', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', null);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__save-menu-button button').element.disabled).to.be.true;
    });

    it('Should show the save-menu on clicking its activation button', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      await wrapper.vm.$nextTick();
      wrapper.find('.sandbox__save-menu-button button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__save-menu').element.parentElement.style.display).to.not.equal('none');
    });

  });

  describe('Events', function() {

    var store, executeQueryStub, saveLocalQueryStub;
    beforeEach(function() {
      executeQueryStub = sinon.stub();
      saveLocalQueryStub = sinon.stub();

      mockStore.modules[NAMESPACE].actions[EXECUTE_QUERY] = executeQueryStub;
      mockStore.modules[NAMESPACE].actions[SAVE_LOCAL_QUERY] = saveLocalQueryStub;

      store = new Vuex.Store(mockStore);
    });

    it('Should call the EXECUTE_QUERY action on \'execute\' event', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      wrapper.find('.sandbox__execute-button button').trigger('click');
      expect(executeQueryStub.calledOnce).to.be.true;
    });

    it('Should show a notification when the \'execute\' event fails', async function() {
      executeQueryStub.throws();

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      wrapper.find('.sandbox__execute-button button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__notification').exists()).to.be.true;
    });

    it('Should call the SAVE_LOCAL_QUERY action on \'save\' event', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      store.commit('changeQueryTitle', 'query');
      wrapper.find('.sandbox__save-menu .sandbox-save-menu__save-button').trigger('click');
      expect(saveLocalQueryStub.calledOnce).to.be.true;
    });

    it('Should redirect the user after the \'save\' event', async function() {
      localVue.use(VueRouter);
      var router = new VueRouter();

      var wrapper = mount(ViewSandbox, { localVue, store, router });
      var pushStub = sinon.stub(wrapper.vm.$router, 'push');

      store.commit('changeQueryBody', 'query');
      store.commit('changeQueryTitle', 'query');
      wrapper.find('.sandbox__save-menu .sandbox-save-menu__save-button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(pushStub.calledOnce).to.be.true;
    });

    it('Should show a notification when the \'save\' event fails', async function() {
      saveLocalQueryStub.throws();

      var wrapper = mount(ViewSandbox, { localVue, store });
      store.commit('changeQueryBody', 'query');
      store.commit('changeQueryTitle', 'query');
      wrapper.find('.sandbox__save-menu .sandbox-save-menu__save-button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__notification').exists()).to.be.true;
    });

  });

});

describe('ViewSandbox.vue (sandbox mode)', function() {

  var localVue, mockStore;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    mockStore = Object.assign({}, mockStoreModel);
    mockStore.modules[NAMESPACE].state.viewMode = 'sandbox';
  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(mockStore);
    });

    it('Should render \'SANDBOX\' as the toolbar title', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__title').text()).to.equal('SANDBOX');
    });

    it('Should not render the delete-menu-button', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__delete-menu-button').exists()).to.be.false;
    });

    it('Should not render the delete-menu', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__delete-menu').exists()).to.be.false;
    });

  });

});

describe('ViewSandbox.vue (edit mode)', function() {

  var localVue, mockStore;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    mockStore = Object.assign({}, mockStoreModel);
    mockStore.modules[NAMESPACE].state.viewMode = 'edit';
    mockStore.state.queryId = 1
  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(mockStore);
    });

    it('Should render the query name as the toolbar title', function() {
      store.commit('changeQueryTitle', 'title');

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__title').text()).to.equal('title');
    });

    it('Should render the delete-menu-button', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__delete-menu-button').exists()).to.be.true;
    });

    it('Should render the delete-menu', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__delete-menu').exists()).to.be.true;
    });

    it('Should show the delete-menu on clicking its activation button', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      wrapper.find('.sandbox__delete-menu-button button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__delete-menu').element.parentElement.style.display).to.not.equal('none');
    });

  });

  describe('Events', function() {

    var store, deleteLocalQuery;
    beforeEach(function() {
      deleteLocalQuery = sinon.stub();

      mockStore.modules[NAMESPACE].actions[DELETE_LOCAL_QUERY] = deleteLocalQuery;

      store = new Vuex.Store(mockStore);
    });

    it('Should call the DELETE_LOCAL_QUERY action on \'delete\' event', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      wrapper.find('.sandbox__delete-menu .sandbox-delete-menu__delete-button').trigger('click');
      expect(deleteLocalQuery.calledOnce).to.be.true;
    });

    it('Should redirect the user after the \'delete\' event', async function() {
      localVue.use(VueRouter);
      var router = new VueRouter();

      var wrapper = mount(ViewSandbox, { localVue, store, router });
      var pushStub = sinon.stub(wrapper.vm.$router, 'push');

      wrapper.find('.sandbox__delete-menu .sandbox-delete-menu__delete-button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(pushStub.calledOnce).to.be.true;
    });

    it('Should show a notification when the \'delete\' event fails', async function() {
      deleteLocalQuery.throws();

      var wrapper = mount(ViewSandbox, { localVue, store });
      wrapper.find('.sandbox__delete-menu .sandbox-delete-menu__delete-button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__notification').exists()).to.be.true;
    });

  });

});
