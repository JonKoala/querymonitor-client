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
import NotepadService from 'services/notepad.service'

import ResultsTable from 'components/ResultsTable'

export default {
  name: 'ViewResults',
  components: {
    ResultsTable
  },
  data () {
    return {
      queryObj: null,
      results: []
    };
  },
  created () {
    this.loadQueryResults();
  },
  methods: {
    async loadQueryResults () {
      this.queryObj = await ApiService.get(`queries/${this.paramId}`);

      var inlineQuery = NotepadService.inline(this.queryObj.corpo);
      this.results = await ApiService.get(`select/${inlineQuery}`);
    }
  },
  computed: {
    paramId () {
      return this.$route.params.id;
    },
    title () {
      return (this.queryObj) ? this.queryObj.titulo : null;
    }
  },
  watch: {
    paramId: function() {
      this.loadQueryResults();
    }
  }
}
</script>
