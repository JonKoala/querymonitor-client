<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <v-toolbar color="blue-grey" dense card>

            <v-menu v-model="editor" transition="slide-y-transition" bottom offset-y
              v-bind:close-on-content-click="false"
              v-bind:nudge-width="400"
              v-bind:nudge-bottom="10"
              v-bind:nudge-right="10">
              <v-tooltip top slot="activator">
                <v-btn icon flat slot="activator">
                  <v-icon color="white">edit</v-icon>
                </v-btn>
                <span>Query</span>
              </v-tooltip>
              <query-editor v-model="query" class="pa-0" v-bind:height="300"></query-editor>
            </v-menu>

            <v-tooltip top>
              <v-btn slot="activator" v-on:click="test()" v-bind:disabled="!this.isTestable" icon class="ma-0">
                <v-icon color="white">cached</v-icon>
              </v-btn>
              <span>Testar</span>
            </v-tooltip>

            <v-toolbar-title class="white--text">SANDBOX</v-toolbar-title>

          </v-toolbar>

          <results-table v-model="results" v-bind:isLoading="isLoading" v-bind:error="errorMsg" class="pa-0"></results-table>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'

import QueryEditor from 'components/QueryEditor'
import ResultsTable from 'components/ResultsTable'

export default {
  name: 'ViewCreate',
  components: {
    QueryEditor,
    ResultsTable
  },
  data() {
    return {
      query: null,
      results: [],
      errorMsg: null,
      isLoading: false,

      editor: false
    };
  },
  mounted() {
    window.setTimeout(() => { this.editor = true; }, 200);
  },
  computed: {
    isTestable() {
      return Boolean(this.query);
    }
  },
  methods: {
    async test() {
      this.isLoading = true;
      try {
        this.results = await ApiService.get(`select/${this.query}`);
        this.errorMsg = null;
      } catch(err) {
        this.errorMsg = err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
