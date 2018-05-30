<template>
  <v-text-field v-model="query" v-bind="{readonly}" multi-line hide-details no-resize class="editor pa-2 blue-grey lighten-5"></v-text-field>
</template>

<script>
export default {
  name: 'BaseNotepad',
  props: {
    value: { type: String },
    readonly: { type: Boolean }
  },
  data () {
    return {
      query: null
    };
  },
  created () {
    this.query = this.value;

    this.$watch('value', newValue => this.query = newValue);
    this.$watch('query', newQuery => this.$emit('input', newQuery));
  }
}
</script>

<style scoped>

  .editor {
    font-weight: bold;
    font-family: 'Inconsolata', sans-serif;
  }

  .editor >>> .input-group__details {
    display: none;
  }

</style>
