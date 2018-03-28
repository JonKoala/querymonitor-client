<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">QUERY</v-toolbar-title>
          </v-toolbar>
          <v-container fluid grid-list-md fill-height>
            <v-layout row wrap>
              <v-flex xs4>
                <query-editor v-model="query" class="pa-1"></query-editor>
              </v-flex>
              <v-flex xs6>
                <v-btn v-on:click="testClicked()">TESTAR</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card color="white">
          <v-toolbar color="blue-grey" dense card>
            <v-toolbar-title class="white--text">RESULTADO</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            v-bind:items="results"
            v-bind:headers="headers"
            hide-actions>
            <template slot="items" slot-scope="props">
              <td v-for="prop in Object.keys(props.item)" >{{ props.item[prop] }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'

import QueryEditor from 'components/QueryEditor'

export default {
  name: 'QueryCreation',
  components: {
    QueryEditor
  },
  data () {
    return {
      query: null,

      headers: [],
      results: []
    };
  },
  methods: {
    testClicked() {
      if (!this.query)
        return;

      ApiService.get(`select/${this.query}`).then(results => {
        this.results = results;
        this.headers = Object.keys(results[0]).map((label) => {
          return {text: label.toUpperCase(), value: label};
        });
      });
    }
  }
}
</script>
