<template>
  <v-card>
    <v-toolbar color="blue-grey" dense card>
      <base-icon-button v-on:click="copyQuery" tooltip="Copiar" class="results-query-viewer__copy-button mr-5" color="white" top>content_copy</base-icon-button>
      <base-icon-button v-bind:href="`/edit/${queryId}`" target="_blank" tooltip="Editar" class="results-query-viewer__edit-link" color="white" top>edit</base-icon-button>
    </v-toolbar>
    <base-notepad v-bind:value="queryBody" readonly class="results-query-viewer__body" v-bind:style="{height: '200px'}"></base-notepad>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import NotepadService from 'services/notepad.service'

import BaseIconButton from 'components/BaseIconButton'
import BaseNotepad from 'components/BaseNotepad'

export default {
  name: 'ResultsQueryViewer',
  components: {
    BaseIconButton,
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
