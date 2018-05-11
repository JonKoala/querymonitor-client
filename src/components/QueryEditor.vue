<template>
  <v-container>
    <v-toolbar dense dark card color="brown darken-1">
      <v-toolbar-items>
        <v-tooltip top class="tool-btn">
          <v-btn v-on:click="indentQuery()" flat slot="activator">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <span>Indentar</span>
        </v-tooltip>
        <v-tooltip top class="tool-btn">
          <v-btn v-on:click="inlineQuery()" flat slot="activator">
            <v-icon>vertical_align_center</v-icon>
          </v-btn>
          <span>Comprimir</span>
        </v-tooltip>
        <v-tooltip top class="ml-5 tool-btn">
          <v-btn v-on:click="copyQuery()" flat slot="activator">
            <v-icon>content_copy</v-icon>
          </v-btn>
          <span>Copiar</span>
        </v-tooltip>
        <v-tooltip top class="tool-btn">
          <v-btn v-on:click="clearQuery()" flat slot="activator">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Limpar</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
    <query-notepad v-model="query" class="editor"></query-notepad>
  </v-container>
</template>

<script>
import NotepadService from 'services/notepad.service'

import QueryNotepad from 'components/QueryNotepad'

export default {
  name: 'QueryEditor',
  components: {
    QueryNotepad
  },
  props: {
    value: { type: String }
  },
  data () {
    return {
      query: null
    };
  },
  created () {
    this.query = this.value;

    this.$watch('query', newQuery => { this.$emit('input', NotepadService.inline(newQuery)); });
  },
  methods: {
    indentQuery() {
      this.query = NotepadService.indent(this.query);
    },
    inlineQuery() {
      this.query = NotepadService.inline(this.query);
    },
    copyQuery() {
      NotepadService.toClipboard(this.query);
    },
    clearQuery() {
      this.copyQuery();
      this.query = null;
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
