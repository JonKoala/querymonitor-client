<template>
  <v-container fluid>
    <v-progress-linear v-show="showLoadingBar" class="results-table__progress my-0" color="blue" indeterminate></v-progress-linear>
    <v-data-table class="results-table__data-table"
      v-show="showTable"
      v-bind:items="items"
      v-bind:headers="headers"
      hide-actions>
      <template slot="items" slot-scope="props">
        <td v-for="prop in Object.keys(props.item)" >{{ props.item[prop] }}</td>
      </template>
    </v-data-table>
    <v-alert v-bind:value="showEmptyDataAlert" class="results-table__alert-empty my-0" color="warning" icon="priority_high">Nenhum dado encontrado</v-alert>
    <v-alert v-bind:value="showErrorAlert" class="results-table__alert-error my-0" color="error" icon="warning">{{ error }}</v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'BaseResultsTable',
  props: {
    value: { type: Array },
    isLoading: { type: Boolean },
    error: { type: String }
  },
  computed: {
    isNull () {
      return this.value == null;
    },
    isEmpty () {
      return this.value instanceof Array && this.value.length === 0;
    },

    showTable () {
      return !this.error && !this.isNull && !this.isEmpty;
    },
    showLoadingBar () {
      return this.isLoading;
    },
    showErrorAlert () {
      return Boolean(this.error);
    },
    showEmptyDataAlert () {
      return !this.error && this.isEmpty;
    },

    items () {
      return (this.isNull) ? [] : this.value;
    },
    headers () {
      if (this.isNull || this.isEmpty)
        return [];

      var sample = this.value[0];
      return Object.keys(sample).map(label => {
        return {text: label.toUpperCase(), value: label};
      });
    }
  }
}
</script>
