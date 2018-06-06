<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>

          <v-toolbar color="blue-grey" dense card>

            <v-menu v-model="showingEditorMenu" transition="slide-y-transition" bottom offset-y
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
              <sandbox-query-editor class="pa-0" height="300px"></sandbox-query-editor>
            </v-menu>

            <v-tooltip top>
              <v-btn slot="activator" v-on:click="executeQuery" v-bind:disabled="!this.isRunnable" icon class="ma-0">
                <v-icon color="white">cached</v-icon>
              </v-btn>
              <span>Testar</span>
            </v-tooltip>

            <v-toolbar-title class="white--text">SANDBOX</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip top>
              <v-btn slot="activator" v-on:click="showingSaveMenu = true" v-bind:disabled="!this.isRunnable" icon class="ma-0">
                <v-icon color="white">save</v-icon>
              </v-btn>
              <span>Salvar</span>
            </v-tooltip>

          </v-toolbar>

          <base-results-table v-model="selectResult"  v-bind:error="selectError" v-bind:isLoading="isExecutingQuery" class="pa-0"></base-results-table>

        </v-card>
      </v-flex>

      <v-dialog v-model="showingSaveMenu" v-bind:persistent="isSaving" max-width="600px">
        <sandbox-save-menu v-on:save="saveQuery"></sandbox-save-menu>
      </v-dialog>

      <v-snackbar v-model="showingNotification" v-bind:timeout="3000" bottom right>{{ notificationText }}</v-snackbar>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'

import BaseResultsTable from 'components/BaseResultsTable'
import SandboxQueryEditor from 'components/SandboxQueryEditor'
import SandboxSaveMenu from 'components/SandboxSaveMenu'

export default {
  name: 'ViewCreate',
  components: {
    BaseResultsTable,
    SandboxQueryEditor,
    SandboxSaveMenu
  },
  data () {
    return {
      showingEditorMenu: false,
      showingSaveMenu: false,
      showingNotification: false,

      notificationText: null
    };
  },
  created () {
    this.$store.dispatch(`${NAMESPACE}/${START_VIEW}`);
  },
  mounted () {
    window.setTimeout(() => { this.showingEditorMenu = true; }, 200);
  },
  computed: {
    ...mapGetters([
      'queryId',
      'queryBody',
      'selectResult',
      'selectError',
    ]),
    ...mapGetters(NAMESPACE, [
      'isExecutingQuery',
      'isSaving',
      'viewMode'
    ]),
    isRunnable () {
      return Boolean(this.queryBody);
    }
  },
  methods: {
    notifyUser (text) {
      this.notificationText = text;
      this.showingNotification = true;
    },
    async executeQuery () {
      try {
        await this.$store.dispatch(`${NAMESPACE}/${EXECUTE_QUERY}`);
      } catch(err) {
        this.notifyUser('Ocorreu um erro ao tentar executar a query...');
      }
    },
    async saveQuery () {
      try {
        await this.$store.dispatch(`${NAMESPACE}/${SAVE_LOCAL_QUERY}`);
        this.$router.push({name: 'results', params: {id: this.queryId}});
      } catch(err) {
        this.showingSaveMenu = false;
        this.notifyUser('Ocorreu um erro ao tentar salvar a query...');
      }
    }
  },
  watch: {
    viewMode: function() {
      this.$store.dispatch(`${NAMESPACE}/${START_VIEW}`);
      window.setTimeout(() => { this.showingEditorMenu = true; }, 200);
    }
  }
}
</script>
