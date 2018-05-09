import { mount, createLocalVue } from '@vue/test-utils'
import chai from 'chai'
import chaiString from 'chai-string'
import Vuetify from 'vuetify'

import ResultsTable from 'components/ResultsTable'

chai.use(chaiString);
const expect = chai.expect;

const localVue = createLocalVue();
localVue.use(Vuetify);


describe('ResultsTable.vue', function() {

  var wrapper;

  beforeEach(function() {
    wrapper = mount(ResultsTable, { localVue });
    return wrapper.vm.$nextTick();
  });

  it('Should display an empty header if an empty array is passed', function() {
    var dataToShow = []
    wrapper.setProps({value: dataToShow});

    var header = wrapper.find('thead tr');
    expect(header.isEmpty()).to.be.true;
  });

  it('Should display an empty body if an empty array is passed', function() {
    var dataToShow = []
    wrapper.setProps({value: dataToShow});

    var lines = wrapper.findAll('tbody tr');
    expect(lines.length).to.equal(1);
    expect(lines.at(0).text()).to.equal('No data available');
  });

  it('Should name the header columns after the passed array objecs\' keys', function() {
    var dataToShow = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}]
    wrapper.setProps({ value: dataToShow });

    var columns = wrapper.find('thead tr').findAll('th');
    expect(columns.length).to.equal(2);
    expect(columns.at(0).text()).to.containIgnoreCase('col 1');
    expect(columns.at(1).text()).to.containIgnoreCase('col 2');
  });

  it('Should display a line for each entry in the passed array', function() {
    var dataToShow = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}]
    wrapper.setProps({ value: dataToShow });

    var lines = wrapper.findAll('tbody tr');
    expect(lines.length).to.equal(2);
  });

  it('Should display the values of each object in the passed array', function() {
    var dataToShow = [{'col 1': 'val a', 'col 2': 'val b'}, {'col 1': 'val c', 'col 2': 'val d'}]
    wrapper.setProps({ value: dataToShow });

    var lines = wrapper.findAll('tbody tr');
    expect(lines.length).to.equal(2);

    var firstLineColumns = lines.at(0).findAll('td');
    expect(firstLineColumns.length).to.equal(2);
    expect(firstLineColumns.at(0).text()).to.equalIgnoreCase('val a');
    expect(firstLineColumns.at(1).text()).to.equalIgnoreCase('val b');

    var secondLineColumns = lines.at(1).findAll('td');
    expect(secondLineColumns.length).to.equal(2);
    expect(secondLineColumns.at(0).text()).to.equalIgnoreCase('val c');
    expect(secondLineColumns.at(1).text()).to.equalIgnoreCase('val d');
  });

});
