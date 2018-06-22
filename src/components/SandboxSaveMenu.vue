<template>
  <v-card>
    <v-toolbar color="blue" dense card>
      <v-toolbar-title class="white--text">SALVAR QUERY</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear v-bind:active="isSaving" class="sandbox-save-menu__progress my-0" color="blue" indeterminate></v-progress-linear>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs7>
          <base-notepad v-bind:value="queryBody" readonly class="sandbox-save-menu__query-body" v-bind:style="{height: '200px'}"></base-notepad>
        </v-flex>
        <v-flex xs5>
          <v-container fill-height class="pa-0">
            <v-layout column>
              <v-flex xs10>
                <v-text-field v-bind:value="queryTitle" v-bind:disabled="isSaving" v-on:input="onTitleInput" label="Título" hide-details class="sandbox-save-menu__query-title pb-4"></v-text-field>
              </v-flex>
              <v-flex xs2 class="pb-0">
                <v-btn v-on:click="onSaveClick" v-bind:disabled="!isSavable" class="sandbox-save-menu__save-button" color="ma-0 blue white--text">
                  <v-icon left color="white">save</v-icon>salvar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import { NAMESPACE } from 'store/views/sandbox.type'
import { SET_QUERY_TITLE } from 'store/mutations.type'

import BaseNotepad from 'components/BaseNotepad'

export default {
  name: 'SandboxSaveMenu',
  components: {
    BaseNotepad
  },
  computed: {
    ...mapGetters([
      'queryTitle',
      'queryBody',
    ]),
    ...mapGetters(NAMESPACE, [
      'isSaving'
    ]),
    isSavable () {
      return Boolean(this.queryBody) && Boolean(this.queryTitle) && !this.isSaving;
    }
  },
  methods: {
    onSaveClick () {
      this.$emit('save');
    },
    onTitleInput (newTitle) {
      this.$store.commit(SET_QUERY_TITLE, newTitle);
    }
  }
}
</script>
