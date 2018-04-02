<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card>
          <query-editor v-model="query" class="pa-0"></query-editor>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-btn v-on:click="test()" v-bind:disabled="!this.isTestable" class="mt-1" color="blue white--text">
          <v-icon left color="white">cached</v-icon>testar
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-text-field v-model="titulo" label="Título" hide-details class="ml-2" style="width:70%"></v-text-field>
        <v-btn v-on:click="save()" v-bind:disabled="!this.isSavable" class="mt-3" color="green white--text">
          <v-icon left color="white">save</v-icon>salvar
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">RESULTADO</v-toolbar-title>
          </v-toolbar>
          <query-results v-model="results" class="pa-0"></query-results>
        </v-card>
      </v-flex>
      <v-snackbar v-model="note" v-bind:timeout="3000" bottom right>Query salva com sucesso!</v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'

import QueryEditor from 'components/QueryEditor'
import QueryResults from 'components/QueryResults'

export default {
  name: 'QueryCreation',
  components: {
    QueryEditor,
    QueryResults
  },
  data () {
    return {
      query: null,
      titulo: null,
      results: [],

      note: false
    };
  },
  computed: {
    isTestable() {
      return Boolean(this.query);
    },
    isSavable() {
      return this.isTestable && Boolean(this.titulo);
    }
  },
  methods: {
    test() {
      ApiService.get(`select/${this.query}`).then(results => { this.results = results; });
    },
    save() {
      ApiService.post('queries', { titulo: this.titulo, corpo: this.query }).then(() => { this.note = true; });
    }
  }
}
</script>
