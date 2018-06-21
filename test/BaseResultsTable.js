import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import chai from 'chai'
import chaiString from 'chai-string'
import Vuetify from 'vuetify'

import BaseResultsTable from 'components/BaseResultsTable'


chai.use(chaiString);

// disable annoying dependency warnings and errors (errors are still detectable though)
console.warn = function() {};
console.error = function() {};


describe('BaseResultsTable.vue', function() {

  var localVue;
  beforeEach(function() {
    localVue = createLocalVue();
    localVue.use(Vuetify);
  });

  it('Should display a loading bar when prop isLoading is true', function() {

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('.results-table__progress').element.style.display).to.not.equal('none');
  });

  it('Should display only the results if prop value is not empty', function() {
    var value = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ value });
    expect(wrapper.find('.results-table__progress').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__data-table').element.style.display).to.not.equal('none');
    expect(wrapper.find('.results-table__alert-empty').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__alert-error').element.style.display).to.equal('none');
  });

  it('Should display only a warning alert if prop value is empty', function() {

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ value: [] });
    expect(wrapper.find('.results-table__progress').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__data-table').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__alert-empty').element.style.display).to.not.equal('none');
    expect(wrapper.find('.results-table__alert-error').element.style.display).to.equal('none');
  });

  it('Should display only an error alert if prop error is not null', function() {

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ error: 'error' });
    expect(wrapper.find('.results-table__progress').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__data-table').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__alert-empty').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__alert-error').element.style.display).to.not.equal('none');
  });

  it('Should name the header columns after prop value\'s keys', function() {
    var value = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ value });
    var columns = wrapper.find('.results-table__data-table thead tr').findAll('th');
    expect(columns.length).to.equal(2);
    expect(columns.at(0).text()).to.containIgnoreCase(Object.keys(value[0])[0]);
    expect(columns.at(1).text()).to.containIgnoreCase(Object.keys(value[0])[1]);
  });

  it('Should display a line for each entry in prop value', function() {
    var value = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ value });
    expect(wrapper.findAll('.results-table__data-table tbody tr').length).to.equal(value.length);
  });

  it('Should display the values of each entry in prop value', function() {
    var value = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ value });

    var lines = wrapper.findAll('.results-table__data-table tbody tr');

    var firstLine = lines.at(0).findAll('td');
    expect(firstLine.length).to.equal(Object.keys(value[0]).length);
    expect(firstLine.at(0).text()).to.equalIgnoreCase(Object.values(value[0])[0]);
    expect(firstLine.at(1).text()).to.equalIgnoreCase(Object.values(value[0])[1]);

    var secondLine = lines.at(1).findAll('td');
    expect(secondLine.length).to.equal(Object.keys(value[1]).length);
    expect(secondLine.at(0).text()).to.equalIgnoreCase(Object.values(value[1])[0]);
    expect(secondLine.at(1).text()).to.equalIgnoreCase(Object.values(value[1])[1]);
  });

});
