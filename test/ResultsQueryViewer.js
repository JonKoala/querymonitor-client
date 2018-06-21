import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import chai from 'chai'
import chaiString from 'chai-string'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import ResultsQueryViewer from 'components/ResultsQueryViewer'
import NotepadService from 'services/notepad.service'

import mockStore from './mocks/store'


chai.use(chaiString);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('ResultsQueryViewer.vue', function() {

  var localVue, store;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);

    var storeModel = Object.assign({}, mockStore);
    storeModel.state.queryId = 1;
    storeModel.state.queryBody = 'query';

    store = new Vuex.Store(storeModel);
  });

  it('Should render the query body', function() {

    var wrapper = mount(ResultsQueryViewer, { localVue, store });
    expect(wrapper.find('.results-query-viewer__body textarea').element.value).to.equal('query');
  });

  it('Should link to /edit with the query id', function() {

    var wrapper = mount(ResultsQueryViewer, { localVue, store });
    expect(wrapper.find('.results-query-viewer__edit-link a').element.href).to.containIgnoreCase('/edit/1');
  });

  it('should copy the query on clicking the copy-button', function() {
    var toClipboardStub = sinon.stub(NotepadService, 'toClipboard');

    var wrapper = mount(ResultsQueryViewer, { localVue, store });
    wrapper.find('.results-query-viewer__copy-button button').trigger('click');
    expect(toClipboardStub.calledOnce).to.be.true;
  });

});
