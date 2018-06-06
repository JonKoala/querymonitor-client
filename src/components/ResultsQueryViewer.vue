<template>
  <v-card>

    <v-toolbar color="blue-grey" dense card>

      <v-tooltip top>
        <v-btn v-on:click="copyQuery" slot="activator" class="ma-0 mr-5" icon>
          <v-icon color="white">content_copy</v-icon>
        </v-btn>
        <span>Copiar</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn @click="" v-bind:href="`/edit/${queryId}`" target="_blank" slot="activator" class="ma-0" icon>
          <v-icon color="white">edit</v-icon>
        </v-btn>
        <span>Editar</span>
      </v-tooltip>

    </v-toolbar>

    <base-notepad v-bind:value="queryBody" readonly v-bind:style="{height: '200px'}"></base-notepad>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import NotepadService from 'services/notepad.service'

import BaseNotepad from 'components/BaseNotepad'

export default {
  name: 'ResultsQueryViewer',
  components: {
    BaseNotepad
  },
  computed: {
    ...mapGetters([
      'queryId',
      'queryBody',
    ])
  },
  methods: {
    copyQuery () {
      NotepadService.toClipboard(this.queryBody);
    }
  }
}
</script>
