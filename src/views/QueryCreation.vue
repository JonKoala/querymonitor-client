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
              <v-flex class="pa-2" xs8>
                <v-text-field v-model="query" multi-line hide-details no-resize></v-text-field>
              </v-flex>
              <v-flex xs4>
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
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'

export default {
  name: 'QueryCreation',
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

      var query = this.query.replace(/(?:\r\n|\r|\n)/g, ' ');

      ApiService.get(`select/${query}`).then(results => {
        this.results = results;
        this.headers = Object.keys(results[0]).map((label) => {
          return {text: label.toUpperCase(), value: label};
        });
      });
    }
  }
}
</script>
