<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-toolbar color="blue-grey" dense card>
        <v-toolbar-title class="white--text">{{ this.queryTitle }}</v-toolbar-title>
      </v-toolbar>
      <base-results-table v-model="selectResult" v-bind:isLoading="isLoading" v-bind:error="selectError" class="pa-0"></base-results-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { EXECUTE_SELECT, FETCH_QUERY } from 'store/actions.type'

import BaseResultsTable from 'components/BaseResultsTable'

export default {
  name: 'ViewResults',
  components: {
    BaseResultsTable
  },
  data () {
    return {
      isLoading: false
    };
  },
  created () {
    this.loadQueryResults();
  },
  methods: {
    async loadQueryResults () {
      this.isLoading = true;

      try {
        await this.$store.dispatch(FETCH_QUERY, this.paramId);
        await this.$store.dispatch(EXECUTE_SELECT, this.queryBody);
      } catch(err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  computed: {
    ...mapGetters([
      'queryBody',
      'queryTitle',
      'selectResult',
      'selectError',
    ]),
    paramId () {
      return this.$route.params.id;
    }
  },
  watch: {
    paramId: function() {
      this.loadQueryResults();
    }
  }
}
</script>
