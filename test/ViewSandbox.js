import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { SET_QUERY_BODY } from 'store/mutations.type'
import ApiService from 'services/api.service'
import store from 'store'
import ViewSandbox from 'views/ViewSandbox'

import { module as routeStub  } from './utils/route.module.stub'
import { SET_ROUTE_PATH, SET_ROUTE_PARAMS } from './utils/route.module.stub'
import { waitWhile } from './utils/utils'


const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


function createWrapper(path) {

  // stubbing the router
  store.registerModule('route', routeStub);
  store.commit(SET_ROUTE_PATH, '/' + path);
  store.commit(SET_ROUTE_PARAMS, { id: 1 });

  return mount(ViewSandbox, { localVue, store });;
}

describe('ViewSandbox.vue', function() {

  describe('Sandbox mode', function() {

    it('Should render \'SANDBOX\' as the toolbar title', async function() {

      var wrapper = createWrapper('sandbox');
      expect(wrapper.find('.sandbox__title').text()).to.equal('SANDBOX');
    });

    it('Should display the query editor shortly after creation', async function() {
      var clock = sinon.useFakeTimers();

      var wrapper = createWrapper('sandbox');
      clock.runAll();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__editor-menu').element.parentElement.style.display).to.not.equal('none');
    });

    it('Should disable the execute button when there is no query', async function() {

      var wrapper = createWrapper('sandbox');
      store.commit(SET_QUERY_BODY, null);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.sandbox__execute-button button').element.disabled).to.be.true;
    });

  });

});
