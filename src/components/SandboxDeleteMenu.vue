<template>
  <v-card>
    <v-toolbar color="red" dense card>
      <v-toolbar-title class="white--text">DELETAR QUERY</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear v-bind:active="isDeletingQuery" class="my-0" color="blue" indeterminate></v-progress-linear>
    <v-card-text>Tem certeza de que deseja deletar a query atual?</v-card-text>
    <v-card-actions class="px-3 pb-3">
      <v-btn v-on:click="onDeleteClick" class="sandbox-delete-menu__delete-button" color="ma-0 red white--text">
        <v-icon left color="white">delete_forever</v-icon>deletar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE } from 'store/views/sandbox.type'

export default {
  name: 'SandboxDeleteMenu',
  computed: {
    ...mapGetters(NAMESPACE, [
      'isDeletingQuery'
    ]),
  },
  methods: {
    onDeleteClick () {
      this.$emit('delete');
    }
  }
}
</script>
