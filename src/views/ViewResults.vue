<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-toolbar color="blue-grey" dense card>
        <v-toolbar-title class="results__title white--text">{{ queryTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <base-icon-button v-on:click="showingQueryViewer = true" tooltip="Query" class="results__query-viewer-button" color="white" top>code</base-icon-button>
      </v-toolbar>
      <select-results-table v-bind:isLoading="isLoading" v-bind:rows="maxTableRows" class="results__table pa-0"></select-results-table>
    </v-card>
    <v-dialog v-model="showingQueryViewer" max-width="400px">
      <results-query-viewer class="results__query-viewer"></results-query-viewer>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE, LOAD_RESULTS } from 'store/views/results.type'

import BaseIconButton from 'components/BaseIconButton'
import ResultsQueryViewer from 'components/ResultsQueryViewer'
import SelectResultsTable from 'components/SelectResultsTable'

export default {
  name: 'ViewResults',
  components: {
    BaseIconButton,
    ResultsQueryViewer,
    SelectResultsTable
  },
  data () {
    return {
      showingQueryViewer: false
    };
  },
  created () {
    this.$store.dispatch(`${NAMESPACE}/${LOAD_RESULTS}`);
  },
  computed: {
    ...mapGetters([
      'queryTitle'
    ]),
    ...mapGetters(NAMESPACE, [
      'paramId',
      'isLoading',
      'maxTableRows'
    ])
  },
  watch: {
    paramId: function() {
      this.$store.dispatch(`${NAMESPACE}/${LOAD_RESULTS}`);
    }
  }
}
</script>
