import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { NAMESPACE } from 'store/views/sandbox.type'
import SandboxDeleteMenu from 'components/SandboxDeleteMenu'

import mockStore from './mocks/store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('SandboxDeleteMenu.vue', function() {

  var localVue, store;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    store = new Vuex.Store(mockStore);
  });

  it('Should display a loading bar when the query is being deleted', function() {
    store.commit([NAMESPACE, 'changeIsDeletingQuery'].join('/'), true);

    var wrapper = mount(SandboxDeleteMenu, { localVue, store });
    expect(wrapper.find('.sandbox-delete-menu__progress div').element.style.height).to.not.equal('0px');
  });

  it('Should emit the \'delete\' event when the delete-button is clicked', function() {

    var wrapper = mount(SandboxDeleteMenu, { localVue, store });
    wrapper.find('.sandbox-delete-menu__delete-button').trigger('click');
    expect(wrapper.emitted()).to.have.all.keys('delete');
    expect(wrapper.emitted().delete.length).to.equal(1);
  });

});
