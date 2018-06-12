import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import { sync } from 'vuex-router-sync'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import ApiService from 'services/api.service'
import router from '../src/router'
import store from 'store'
import ViewResults from 'views/ViewResults'

const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuetify);
localVue.use(Vuex);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


async function createWrapper() {

  // stubbing the router
  store.registerModule('route', { state: { path: 'results', params: { id: 1 } } });

  var wrapper = mount(ViewResults, { localVue, store });
  await wrapper.vm.$nextTick();
  return wrapper;
}


describe('ViewResults.vue', function() {

  it('Should start by searching for the query specified on the url', async function() {
    var query = { id: 1, titulo: 'title', corpo: 'query' };
    var select = [{ col1: 'col1', col2: 'col2' }];

    var getStub = sinon.stub(ApiService, 'get');
    getStub.withArgs(`queries/${query.id}`).returns(query);
    getStub.withArgs(`select/${query.corpo}`).returns(select);

    var wrapper = await createWrapper();
    expect(getStub.callCount).to.equal(2);
    expect(wrapper.vm.paramId).to.equal(query.id);
    expect(wrapper.vm.queryTitle).to.equal(query.titulo);

    getStub.resetBehavior();
  });

});
