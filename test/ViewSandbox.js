import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { NAMESPACE, START_VIEW } from 'store/views/sandbox.type'
import ViewSandbox from 'views/ViewSandbox'

import mockStore from './mocks/sandbox.store'


const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('ViewSandbox.vue (sandbox mode)', function() {

  var mock;
  beforeEach(function() {
    mock = Object.assign({}, mockStore);
    mock.modules[NAMESPACE].state.viewMode = 'sandbox';
  });

  describe('Initialization', function() {

    var store, startViewSpy;
    beforeEach(function() {
      startViewSpy = sinon.spy();

      mock.modules[NAMESPACE].actions[START_VIEW] = startViewSpy;

      store = new Vuex.Store(mock);
    });

    it('Should start by calling the START_VIEW action', function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(startViewSpy.calledOnce).to.be.true;
    });

  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(mock);
    });

    it('Should render \'SANDBOX\' as the toolbar title', async function() {

      var wrapper = mount(ViewSandbox, { localVue, store });
      expect(wrapper.find('.sandbox__title').text()).to.equal('SANDBOX');
    });

    it('Should display the query editor shortly after creation', async function() {
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

});
