import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { SET_QUERY_BODY } from 'store/mutations.type'
import NotepadService from 'services/notepad.service'
import SandboxQueryEditor from 'components/SandboxQueryEditor'

import mockStore from './mocks/store'


// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('SandboxQueryEditor.vue', function() {

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

    it('Should render the query body', function() {
      store.commit('changeQueryBody', 'query');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      expect(wrapper.find('.sandbox-query-editor__query-body textarea').element.value).to.equal('query');
    });

  });

  describe('Events', function() {

    var store, sandbox, setQueryBodySpy;
    beforeEach(function() {
      sandbox = sinon.createSandbox();
      setQueryBodySpy = sinon.spy();
      storeModel.mutations[SET_QUERY_BODY] = setQueryBodySpy;

      store = new Vuex.Store(storeModel);
    });

    afterEach(function() {
      sandbox.restore();
      store.dispatch('resetStore');
    });

    it('Should indent the query on clicking the indent-button', function() {
      sandbox.stub(NotepadService, 'indent');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__indent-button').trigger('click');
      sandbox.assert.calledOnce(NotepadService.indent);
      expect(setQueryBodySpy.calledOnce).to.be.true;
    });

    it('Should inline the query on clicking the inline-button', function() {
      sandbox.stub(NotepadService, 'inline');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__inline-button').trigger('click');
      sandbox.assert.calledOnce(NotepadService.inline);
      expect(setQueryBodySpy.calledOnce).to.be.true;
    });

    it('Should copy the query on clicking the copy-button', function() {
      sandbox.stub(NotepadService, 'toClipboard');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__copy-button').trigger('click');
      sandbox.assert.calledOnce(NotepadService.toClipboard);
    });

    it('Should copy the query on clicking the clear-button', function() {
      sandbox.stub(NotepadService, 'toClipboard');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__clear-button').trigger('click');
      sandbox.assert.calledOnce(NotepadService.toClipboard);
    });

    it('Should clear the query on clicking the clear-button', function() {
      sandbox.stub(NotepadService, 'toClipboard');

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__clear-button').trigger('click');
      sandbox.assert.calledOnce(NotepadService.toClipboard);
      expect(setQueryBodySpy.getCall(0).args[1]).to.be.null;
    });

    it('Should call the SET_QUERY_BODY mutation when changing the query', function() {

      var wrapper = mount(SandboxQueryEditor, { localVue, store });
      wrapper.find('.sandbox-query-editor__query-body textarea').element.value = 'query';
      wrapper.find('.sandbox-query-editor__query-body textarea').trigger('input');
      expect(setQueryBodySpy.calledOnce).to.be.true;
      expect(setQueryBodySpy.getCall(0).args[1]).to.equal('query');
    });

  });

});
