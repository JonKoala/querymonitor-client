<template>
  <v-container fluid>
    <v-data-table
      v-bind:items="value"
      v-bind:headers="headers"
      hide-actions>
      <template slot="items" slot-scope="props">
        <td v-for="prop in Object.keys(props.item)" >{{ props.item[prop] }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'QueryResults',
  props: {
    value: { type: Array }
  },
  computed: {
    headers () {
      if (!this.value || this.value.length === 0)
        return [];

      var sample = this.value[0];
      return Object.keys(sample).map(label => {
        return {text: label.toUpperCase(), value: label};
      });
    }
  }
}
</script>
