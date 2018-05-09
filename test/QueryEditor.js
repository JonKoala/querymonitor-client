import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import Vuetify from 'vuetify'

import QueryEditor from 'components/QueryEditor'

const localVue = createLocalVue();
localVue.use(Vuetify);

// disable annoying dependency warnings
console.warn = function() {};


describe('QueryEditor.vue', function() {

  var wrapper;

  beforeEach(function() {
    wrapper = mount(QueryEditor, { localVue });
    return wrapper.vm.$nextTick();
  });

  describe('Indent button', function() {

    it('Should indent the query when clicked', function() {
      var query = 'select 1 as col1, 2 as col2';
      wrapper.setData({query: query});

      var indentedQuery = 'select\n  1 as col1,\n  2 as col2';
      wrapper.find('#indent-btn').trigger('click');
      expect(wrapper.vm.$data.query).to.equal(indentedQuery);
    });

  });

  describe('Inline button', function() {

    it('should inline the query when clicked', function() {
      var query = 'select\n  1 as col1,\n  2 as col2';
      wrapper.setData({query: query});

      var inlinedQuery = 'select 1 as col1, 2 as col2';
      wrapper.find('#inline-btn').trigger('click');
      expect(wrapper.vm.$data.query).to.equal(inlinedQuery);
    });

  });

  describe('\'input\' event', function() {

    it('Should emit the event each time the query is changed', function() {
      var query = 'select 1 as col1, 2 as col2';
      wrapper.setData({query: query});

      var query2 = 'select 3 as col1, 4 as col2';
      wrapper.setData({query: query2});

      expect(wrapper.emitted().input).to.be.an('array');
      expect(wrapper.emitted().input).to.have.lengthOf(2);
    });

    it('Should pass the query, inlined, as argument', function() {
      var query = 'select 1 as col1, 2 as col2';
      wrapper.setData({query: query});
      wrapper.find('#indent-btn').trigger('click');

      expect(wrapper.emitted().input).to.be.an('array');
      expect(wrapper.emitted().input).to.have.lengthOf(2);
      expect(wrapper.emitted().input[1]).to.be.an('array');
      expect(wrapper.emitted().input[1]).to.have.lengthOf(1);
      expect(wrapper.emitted().input[1][0]).to.be.an('string');
      expect(wrapper.emitted().input[1][0]).to.equal(query);
    });

  });

});
