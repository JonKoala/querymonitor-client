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
    <v-text-field v-model="query" multi-line hide-details no-resize class="editor pa-2 blue-grey lighten-5"></v-text-field>
  </v-container>
</template>

<script>
import copyToClipboard from 'copy-to-clipboard'
import sqlFormatter from 'sql-formatter'

import RegexCollection from 'services/regex.collection'

export default {
  name: 'QueryEditor',
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
  },
  methods: {
    indentQuery() {
      this.query = (this.query) ? sqlFormatter.format(this.query) : null;
    },
    inlineQuery(query) {
      var toInline = query || this.query;

      toInline = (toInline) ? toInline.replace(RegexCollection.newline, ' ').replace(RegexCollection.unquotedSpaces, ' ') : null;

      if (query)
        return toInline;
      else
        this.query = toInline;
    },
    copyQuery() {
      copyToClipboard(this.query);
    },
    clearQuery() {
      this.copyQuery();
      this.query = null;
    }
  },
  watch: {
    query: function(val) {
      this.$emit('input', this.inlineQuery(this.query));
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

  .editor >>> .input-group__details {
    display: none;
  }

</style>
