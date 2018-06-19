import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { NAMESPACE, LOAD_RESULTS } from 'store/views/results.type'
import ViewResults from 'views/ViewResults'

import mockStore from './mocks/results.store'

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('ViewResults.vue', function() {

  describe('Initialization', function() {

    var store, loadResultsSpy;
    beforeEach(function() {
      loadResultsSpy = sinon.spy();

      var mock = Object.assign({}, mockStore);
      mock.modules[NAMESPACE].state.paramId = 1;
      mock.modules[NAMESPACE].actions[LOAD_RESULTS] = loadResultsSpy;

      store = new Vuex.Store(mock);
    });

    it('Should start by calling the LOAD_RESULTS action', function() {

      var wrapper = mount(ViewResults, { localVue, store });
      expect(loadResultsSpy.calledOnce).to.be.true;
    });

    it('Should call LOAD_RESULTS whenever the url\'s id changes', function() {

      var wrapper = mount(ViewResults, { localVue, store });
      store.commit([NAMESPACE, 'changeParamId'].join('/'), 2);
      expect(loadResultsSpy.calledTwice).to.be.true;
      store.commit([NAMESPACE, 'changeParamId'].join('/'), 3);
      expect(loadResultsSpy.calledThrice).to.be.true;
    });

  });

  describe('Interface', function() {

    var store;
    beforeEach(function() {
      store = new Vuex.Store(mockStore);
    });

    it('Should render the query title', function() {
      store.commit('changeQueryTitle', 'title');

      var wrapper = mount(ViewResults, { localVue, store });
      expect(wrapper.find('.results__title').text()).to.equal('title');
    });

    it('Should start with the query-viewer hidden', function() {

      var wrapper = mount(ViewResults, { localVue, store });
      expect(wrapper.find('.dialog').element.style.display).to.equal('none');
    });

    it('Should show the query-viewer on clicking its activation button', async function() {

      var wrapper = mount(ViewResults, { localVue, store });
      wrapper.find('.results__query-viewer-button button').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.dialog').element.style.display).to.not.equal('none');
    });

  });

});
