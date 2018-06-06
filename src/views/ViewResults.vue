<template>
  <v-container fluid grid-list-md>
    <v-card>

      <v-toolbar color="blue-grey" dense card>

        <v-toolbar-title class="white--text">{{ queryTitle }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip top>
          <v-btn slot="activator" v-on:click="showingQueryViewer = true" icon class="ma-0">
            <v-icon color="white">code</v-icon>
          </v-btn>
          <span>Query</span>
        </v-tooltip>

      </v-toolbar>

      <base-results-table v-bind:value="selectResult" v-bind:isLoading="isLoading" v-bind:error="selectError" class="pa-0"></base-results-table>

      <v-dialog v-bind:value="showingQueryViewer" max-width="400px">
        <results-query-viewer></results-query-viewer>
      </v-dialog>

    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE, LOAD_RESULTS } from 'store/views/results.type'

import BaseResultsTable from 'components/BaseResultsTable'
import ResultsQueryViewer from 'components/ResultsQueryViewer'

export default {
  name: 'ViewResults',
  components: {
    BaseResultsTable,
    ResultsQueryViewer
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
      'queryTitle',
      'selectResult',
      'selectError',
    ]),
    ...mapGetters(NAMESPACE, [
      'paramId',
      'isLoading'
    ])
  },
  watch: {
    paramId: function() {
      this.showingQueryViewer = false;
      this.$store.dispatch(`${NAMESPACE}/${LOAD_RESULTS}`);
    }
  }
}
</script>
