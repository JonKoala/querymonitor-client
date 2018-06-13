import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import ApiService from 'services/api.service'
import store from 'store'
import ViewResults from 'views/ViewResults'

import { module as routeStub  } from './utils/route.module.stub'
import { SET_ROUTE_PATH, SET_ROUTE_PARAMS } from './utils/route.module.stub'
import { waitWhile } from './utils/utils'

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


function createWrapper() {

  // stubbing the router
  store.registerModule('route', routeStub);
  store.commit(SET_ROUTE_PATH, '/results');
  store.commit(SET_ROUTE_PARAMS, { id: 1 });

  return mount(ViewResults, { localVue, store });;
}


describe('ViewResults.vue', function() {

  var query, select, getStub;
  beforeEach(function() {
    query = { id: 1, titulo: 'title', corpo: 'corpo' };
    select = [{ col1: 'col1', col2: 'col2' }];
    getStub = sinon.stub(ApiService, 'get');
    getStub.withArgs('queries/1').returns(query);
    getStub.withArgs(`select/${query.corpo}`).returns(select);
  });
  afterEach(function() {
    getStub.restore();
  });

  it('Should start by requesting for the query specified on the url and its results', async function() {

    var wrapper = createWrapper();
    await waitWhile(wrapper, () => wrapper.vm.isLoading);
    expect(getStub.callCount).to.equal(2);
    expect(wrapper.vm.paramId).to.equal(query.id);
    expect(wrapper.vm.queryTitle).to.equal(query.titulo);
    expect(wrapper.vm.selectResult).to.equal(select);
  });

  it('Should request for the new specified query and its results when the url changes', async function() {
    getStub.withArgs('queries/2').returns(query);

    var wrapper = createWrapper();
    store.commit(SET_ROUTE_PARAMS, { id: 2 });
    await waitWhile(wrapper, () => wrapper.vm.isLoading);
    expect(getStub.callCount).to.equal(4);
    expect(wrapper.vm.paramId).to.equal(2);
    expect(wrapper.vm.queryTitle).to.equal(query.titulo);
    expect(wrapper.vm.selectResult).to.equal(select);
  });

  it('Should render the query title', async function() {

    var wrapper = createWrapper();
    await waitWhile(wrapper, () => wrapper.vm.isLoading);
    expect(wrapper.find('.toolbar__title').text()).to.equal(query.titulo);
  });

  it('Should render the query string on a dialog', async function() {

    var wrapper = createWrapper();
    await waitWhile(wrapper, () => wrapper.vm.isLoading);
    expect(wrapper.find('textarea').element.value).to.equal(query.corpo);
  });

  it('Should display the query string dialog only when the \'query\' button is clicked', async function() {

    var wrapper = createWrapper();
    await waitWhile(wrapper, () => wrapper.vm.isLoading);
    expect(wrapper.find('.dialog').element.style.display).to.equal('none');

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.dialog').element.style.display).to.not.equal('none');
  });

});
