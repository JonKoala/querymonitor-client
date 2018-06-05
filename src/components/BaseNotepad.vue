<template>
  <v-text-field v-bind="{value, readonly}" v-on:input="onInput" multi-line hide-details no-resize class="editor pa-2 blue-grey lighten-5"></v-text-field>
</template>

<script>
export default {
  name: 'BaseNotepad',
  props: {
    value: { type: String },
    readonly: { type: Boolean }
  },
  methods: {
    onInput (newText) {
      this.$emit('input', newText);
    }
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
