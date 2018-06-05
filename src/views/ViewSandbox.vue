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
            <sandbox-query-editor class="pa-0" height="300px"></sandbox-query-editor>
          </v-menu>

          <v-tooltip top>
            <v-btn slot="activator" v-on:click="runQuery" v-bind:disabled="!this.isRunnable" icon class="ma-0">
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

          <base-results-table v-model="selectResult" v-bind:isLoading="isLoading" v-bind:error="selectError" class="pa-0"></base-results-table>

        </v-card>
      </v-flex>

      <v-dialog v-model="saveMenu" v-bind:persistent="saveMenuLoading" max-width="600px">
        <sandbox-save-menu v-on:loading="onSaveLoading" v-on:success="onSaveSuccess" v-on:error="onSaveError"></sandbox-save-menu>
      </v-dialog>

      <v-snackbar v-model="notification" v-bind:timeout="3000" bottom right>{{ notificationText }}</v-snackbar>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { EXECUTE_SELECT } from 'store/actions.type'
import { RESET_QUERY_STATE, RESET_SELECT_STATE, SET_QUERY_BODY } from 'store/mutations.type'

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

      // loading
      isLoading: false,
      saveMenuLoading: false,

      // menus
      editorMenu: false,
      saveMenu: false,

      // notifications
      notification: false,
      notificationText: null
    };
  },
  created () {
    this.$store.commit(RESET_QUERY_STATE);
    this.$store.commit(RESET_SELECT_STATE);
  },
  mounted () {
    window.setTimeout(() => { this.editorMenu = true; }, 200);
  },
  computed: {
    ...mapGetters([
      'queryId',
      'queryBody',
      'selectResult',
      'selectError',
    ]),
    isRunnable () {
      return Boolean(this.queryBody);
    }
  },
  methods: {
    async runQuery () {
      this.isLoading = true;

      try {
        await this.$store.dispatch(EXECUTE_SELECT, this.queryBody);
      } catch(err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    // saveMenu events
    onSaveLoading (isLoading) {
      this.saveMenuLoading = isLoading;
    },
    onSaveSuccess () {
      this.$router.push({name: 'results', params: {id: this.queryId}});
    },
    onSaveError (err) {
      this.notificationText = "Ocorreu um erro ao tentar salvar a query...";
      this.saveMenu = false;
      this.notification = true;
      console.log(err);
    }
  }
}
</script>
