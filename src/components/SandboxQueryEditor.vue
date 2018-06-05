<template>
  <v-container>
    <v-toolbar dense dark card color="brown darken-1">
      <v-toolbar-items>
        <v-tooltip top>
          <v-btn v-on:click="indentQuery" flat slot="activator">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <span>Indentar</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn v-on:click="inlineQuery" flat slot="activator">
            <v-icon>vertical_align_center</v-icon>
          </v-btn>
          <span>Comprimir</span>
        </v-tooltip>
        <v-tooltip top class="ml-5">
          <v-btn v-on:click="copyQuery" flat slot="activator">
            <v-icon>content_copy</v-icon>
          </v-btn>
          <span>Copiar</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn v-on:click="clearQuery" flat slot="activator">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Limpar</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
    <base-notepad v-bind:value="queryBody" v-on:input="onInput" class="editor" v-bind:style="{height:height}"></base-notepad>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import NotepadService from 'services/notepad.service'

import { SET_QUERY_BODY } from 'store/mutations.type'

import BaseNotepad from 'components/BaseNotepad'

export default {
  name: 'SandboxQueryEditor',
  components: {
    BaseNotepad
  },
  props: {
    height: { type: String, default: '140px' }
  },
  computed: {
    ...mapGetters([
      'queryBody'
    ]),
  },
  methods: {
    indentQuery () {
      this.$store.commit(SET_QUERY_BODY, NotepadService.indent(this.queryBody));
    },
    inlineQuery () {
      this.$store.commit(SET_QUERY_BODY, NotepadService.inline(this.queryBody));
    },
    copyQuery () {
      NotepadService.toClipboard(this.queryBody);
    },
    clearQuery () {
      this.copyQuery();
      this.$store.commit(SET_QUERY_BODY, null);
    },

    // EVENTS
    onInput (newQuery) {
      this.$store.commit(SET_QUERY_BODY, newQuery);
    }
  }
}
</script>

<style scoped>

  .btn {
    min-width: 0px;
  }

  .editor {
    border-radius: 0px 0px 5px 5px;
  }

</style>
