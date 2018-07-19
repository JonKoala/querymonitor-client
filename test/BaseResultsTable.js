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

  it('Should display only the results if prop lines is not empty', function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ lines });
    expect(wrapper.find('.results-table__progress').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__data-table').element.style.display).to.not.equal('none');
    expect(wrapper.find('.results-table__alert-empty').element.style.display).to.equal('none');
    expect(wrapper.find('.results-table__alert-error').element.style.display).to.equal('none');
  });

  it('Should display only a warning alert if prop lines is empty', function() {

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ lines: [] });
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

  it('Should name the header columns after prop lines\' keys', function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ lines });
    var columns = wrapper.find('.results-table__data-table thead tr').findAll('th');
    expect(columns.length).to.equal(2);
    expect(columns.at(0).text()).to.containIgnoreCase(Object.keys(lines[0])[0]);
    expect(columns.at(1).text()).to.containIgnoreCase(Object.keys(lines[0])[1]);
  });

  it('Should display a row for each entry in prop lines', function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ lines });
    expect(wrapper.findAll('.results-table__data-table tbody tr').length).to.equal(lines.length);
  });

  it('Should display the values of each entry in prop lines', function() {
    var lines = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}];

    var wrapper = mount(BaseResultsTable, { localVue });
    wrapper.setProps({ lines });

    var tableRows = wrapper.findAll('.results-table__data-table tbody tr');

    var firstTableRow = tableRows.at(0).findAll('td');
    expect(firstTableRow.length).to.equal(Object.keys(lines[0]).length);
    expect(firstTableRow.at(0).text()).to.equalIgnoreCase(Object.values(lines[0])[0]);
    expect(firstTableRow.at(1).text()).to.equalIgnoreCase(Object.values(lines[0])[1]);

    var secondTableRow = tableRows.at(1).findAll('td');
    expect(secondTableRow.length).to.equal(Object.keys(lines[1]).length);
    expect(secondTableRow.at(0).text()).to.equalIgnoreCase(Object.values(lines[1])[0]);
    expect(secondTableRow.at(1).text()).to.equalIgnoreCase(Object.values(lines[1])[1]);
  });

  describe('Events', function() {

    it('Should emit the \'input\' event when a header column is clicked');

    it('Should send an object as \'input\' payload');

    it('Should send a boolean \'descending\' as part of \'input\' payload');

    it('Should send a string \'sortBy\' as part of \'input\' payload');

  });

});
