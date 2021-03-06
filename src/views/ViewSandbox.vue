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
              <base-icon-button slot="activator" tooltip="Query" class="sandbox__editor-menu-button" color="white" top>edit</base-icon-button>
              <sandbox-query-editor class="sandbox__editor-menu pa-0" height="300px"></sandbox-query-editor>
            </v-menu>
            <base-icon-button v-on:click="executeQuery" v-bind:disabled="!isRunnable" tooltip="Testar" class="sandbox__execute-button" color="white" top>cached</base-icon-button>
            <v-toolbar-title class="sandbox__title white--text">{{ toolbarTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <base-icon-button v-on:click="showingDeleteMenu = true" v-if="isEditMode" tooltip="Deletar" class="sandbox__delete-menu-button mr-5" color="white" top>delete</base-icon-button>
            <base-icon-button v-on:click="showingSaveMenu = true" v-bind:disabled="!isRunnable" tooltip="Salvar" class="sandbox__save-menu-button" color="white" top>save</base-icon-button>
          </v-toolbar>
          <select-results-table v-bind:isLoading="isExecutingQuery" v-bind:rows="maxTableRows" class="pa-0"></select-results-table>
        </v-card>
      </v-flex>
      <v-dialog v-model="showingSaveMenu" v-bind:persistent="isSaving" max-width="600px">
        <sandbox-save-menu v-on:save="saveQuery" class="sandbox__save-menu"></sandbox-save-menu>
      </v-dialog>
      <v-dialog v-model="showingDeleteMenu" v-if="isEditMode" v-bind:persistent="isDeletingQuery" max-width="350px">
        <sandbox-delete-menu v-on:delete="deleteQuery" class="sandbox__delete-menu"></sandbox-delete-menu>
      </v-dialog>
      <v-snackbar v-model="showingNotification" v-bind:timeout="3000" class="sandbox__notification" bottom right>{{ notificationText }}</v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE, DELETE_LOCAL_QUERY, EXECUTE_QUERY, SAVE_LOCAL_QUERY, START_VIEW } from 'store/views/sandbox.type'

import BaseIconButton from 'components/BaseIconButton'
import SandboxDeleteMenu from 'components/SandboxDeleteMenu'
import SandboxQueryEditor from 'components/SandboxQueryEditor'
import SandboxSaveMenu from 'components/SandboxSaveMenu'
import SelectResultsTable from 'components/SelectResultsTable'

export default {
  name: 'ViewCreate',
  components: {
    BaseIconButton,
    SandboxDeleteMenu,
    SandboxQueryEditor,
    SandboxSaveMenu,
    SelectResultsTable
  },
  data () {
    return {
      showingDeleteMenu: false,
      showingEditorMenu: false,
      showingNotification: false,
      showingSaveMenu: false,

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
      'queryBody',
      'queryId',
      'queryTitle',
    ]),
    ...mapGetters(NAMESPACE, [
      'isDeletingQuery',
      'isExecutingQuery',
      'isSaving',
      'maxTableRows',
      'viewMode'
    ]),
    isRunnable () {
      return Boolean(this.queryBody);
    },
    isEditMode () {
      return this.viewMode === 'edit';
    },
    toolbarTitle () {
      return (this.isEditMode) ? this.queryTitle : 'SANDBOX';
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
    async deleteQuery () {
      try {
        await this.$store.dispatch(`${NAMESPACE}/${DELETE_LOCAL_QUERY}`);
        this.$router.push({ name: 'sandbox' });
      } catch (err) {
        this.showingDeleteMenu = false;
        this.notifyUser('Ocorreu um erro ao tentar deletar a query...');
      }
    },
    async saveQuery () {
      try {
        await this.$store.dispatch(`${NAMESPACE}/${SAVE_LOCAL_QUERY}`);
        this.$router.push({ name: 'results', params: { id: this.queryId } });
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
