<template>
  <v-text-field v-bind="{value, readonly}" v-on="$listeners" multi-line hide-details no-resize class="editor pa-2 blue-grey lighten-5"></v-text-field>
</template>

<script>
export default {
  name: 'BaseNotepad',
  props: {
    value: { type: String },
    readonly: { type: Boolean }
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
