<template>
  <v-container fluid grid-list-md>
    <base-results-table v-model="sortObj" v-bind:lines="selectResult" v-bind:isLoading="isLoading" v-bind:error="selectError" v-on:input="refreshResults" class="results__table pa-0"></base-results-table>
    <v-divider v-if="showingPagination"></v-divider>
    <div v-if="showingPagination" class="select-results-table__pagination text-xs-center pt-3 pb-2">
      <v-pagination v-model="page" v-bind:length="pages" v-on:input="refreshResults"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { EXECUTE_PAGINATED_SELECT } from 'store/actions.type'

import BaseResultsTable from 'components/BaseResultsTable'
import SelectResultsTable from 'components/SelectResultsTable'

export default {
  name: 'SelectResultsTable',
  components: {
    BaseResultsTable,
    SelectResultsTable
  },
  props: {
    isLoading: { type: Boolean },
    rows: { type: Number }
  },
  data () {
    return {
      page: 1,
      sortObj: { descending: false, sortBy: null }
    };
  },
  computed: {
    ...mapGetters([
      'queryBody',
      'selectResult',
      'selectError',
      'selectTotal'
    ]),
    pages () {
      return (this.selectTotal > 0) ? Math.ceil(this.selectTotal / this.rows) : 0;
    },
    showingPagination () {
      return this.pages > 1;
    },
    selectParams () {
      return {
        query: this.queryBody,
        rowsPerPage: this.rows,
        page: this.page,
        descending: this.sortObj.descending,
        sortBy: this.sortObj.sortBy
      }
    }
  },
  methods: {
    refreshResults () {
      this.$store.dispatch(EXECUTE_PAGINATED_SELECT, this.selectParams);
    }
  }
}
</script>
