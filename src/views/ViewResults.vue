<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-toolbar color="blue-grey" dense card>
        <v-toolbar-title class="white--text">{{ this.title }}</v-toolbar-title>
      </v-toolbar>
      <results-table v-model="this.results" class="pa-0"></results-table>
    </v-card>
  </v-container>
</template>

<script>
import ApiService from 'services/api.service'

import ResultsTable from 'components/ResultsTable'

export default {
  name: 'ViewResults',
  components: {
    ResultsTable
  },
  props: {
    paramId: { type: String }
  },
  data () {
    return {
      query: null,
      results: [],
    };
  },
  created() {
    ApiService.get(`queries/${this.paramId}`).then((query) => {
      this.query = query;
      ApiService.get(`select/${this.query.corpo}`).then(results => { this.results = results; });
    });
  },
  computed: {
    title() {
      return (this.query) ? this.query.titulo : null;
    }
  }
}
</script>
