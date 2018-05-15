<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <v-toolbar color="blue-grey" dense card>

            <v-menu v-model="editorMenu" transition="slide-y-transition" bottom offset-y
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
              <query-editor v-model="query" class="pa-0" height="300px"></query-editor>
            </v-menu>

            <v-tooltip top>
              <v-btn slot="activator" v-on:click="runQuery()" v-bind:disabled="!this.isRunnable" icon class="ma-0">
                <v-icon color="white">cached</v-icon>
              </v-btn>
              <span>Testar</span>
            </v-tooltip>

            <v-toolbar-title class="white--text">SANDBOX</v-toolbar-title>

           <v-spacer></v-spacer>

           <v-tooltip top>
             <v-btn slot="activator" v-on:click="saveMenu = true" v-bind:disabled="!this.isRunnable" icon class="ma-0">
               <v-icon color="white">save</v-icon>
             </v-btn>
             <span>Salvar</span>
           </v-tooltip>

          </v-toolbar>

          <results-table v-model="results" v-bind:isLoading="isLoading" v-bind:error="errorMsg" class="pa-0"></results-table>

        </v-card>
      </v-flex>

      <v-dialog v-model="saveMenu" v-bind:persistent="saveMenuLoading" max-width="600px">
        <query-save-menu v-model="query"
          v-on:loading="onSaveLoading"
          v-on:success="onSaveSuccess"
          v-on:error="onSaveError">
        </query-save-menu>
      </v-dialog>

      <v-snackbar v-model="notification" v-bind:timeout="3000" bottom right>{{ notificationText }}</v-snackbar>

    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'
import NotepadService from 'services/notepad.service'

import QueryEditor from 'components/QueryEditor'
import QuerySaveMenu from 'components/QuerySaveMenu'
import ResultsTable from 'components/ResultsTable'

export default {
  name: 'ViewCreate',
  components: {
    QueryEditor,
    QuerySaveMenu,
    ResultsTable
  },
  data() {
    return {

      // query & results
      query: null,
      results: null,
      errorMsg: null,
      isLoading: false,

      // menus
      editorMenu: false,
      saveMenu: false,
      saveMenuLoading: false,

      // notifications
      notification: false,
      notificationText: null
    };
  },
  mounted() {
    window.setTimeout(() => { this.editorMenu = true; }, 200);
  },
  computed: {
    isRunnable() {
      return Boolean(this.query);
    }
  },
  methods: {
    async runQuery() {
      this.isLoading = true;

      try {
        var inlineQuery = NotepadService.inline(this.query);
        this.results = await ApiService.get(`select/${inlineQuery}`);
        this.errorMsg = null;
      } catch(err) {
        this.errorMsg = err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },

    // saveMenu events
    onSaveLoading(isLoading) {
      this.saveMenuLoading = isLoading;
    },
    onSaveSuccess(savedQuery) {
      this.$router.push({name: 'results', params: {id: savedQuery.id}});
    },
    onSaveError(err) {
      this.notificationText = "Ocorreu um erro ao tentar salvar a query...";
      this.saveMenu = false;
      this.notification = true;
      console.log(err);
    }
  }
}
</script>
