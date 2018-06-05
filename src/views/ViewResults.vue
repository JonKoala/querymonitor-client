<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-toolbar color="blue-grey" dense card>
        <v-toolbar-title class="white--text">{{ this.queryTitle }}</v-toolbar-title>
      </v-toolbar>
      <base-results-table v-bind:value="selectResult" v-bind:isLoading="isLoading" v-bind:error="selectError" class="pa-0"></base-results-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE, LOAD_RESULTS } from 'store/views/results.type'

import BaseResultsTable from 'components/BaseResultsTable'

export default {
  name: 'ViewResults',
  components: {
    BaseResultsTable
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
      this.$store.dispatch(`${NAMESPACE}/${LOAD_RESULTS}`);
    }
  }
}
</script>
