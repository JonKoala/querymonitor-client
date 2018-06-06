<template>
  <v-tooltip v-bind="{top, right, bottom, left}" v-bind:disabled="!hasTooltip">
    <v-btn v-on="$listeners" v-bind="{disabled, flat, href, target}" slot="activator" class="ma-0" icon>
      <v-icon v-bind="{color}"><slot></slot></v-icon>
    </v-btn>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BaseIconButton',
  props: {
    disabled: { type: Boolean },
    color: { type: String },
    flat: { type: Boolean },
    tooltip: { type: String },

    // Link
    href: { type: String },
    target: { type: String },

    // Position
    top: { type: String },
    right: { type: String },
    bottom: { type: String },
    left: { type: String },
  },
  computed: {
    hasTooltip () {
      return Boolean(this.tooltip);
    }
  }
}
</script>
