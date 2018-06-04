<template>
  <v-card>
    <v-toolbar color="blue-grey" dense card>
      <v-toolbar-title class="white--text">{{ menuTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear v-bind:active="isLoading" class="my-0" color="blue" indeterminate></v-progress-linear>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs7>
          <base-notepad v-bind:value="queryBody" readonly v-bind:style="{height: '200px'}"></base-notepad>
        </v-flex>
        <v-flex xs5>
          <v-container fill-height class="pa-0">
            <v-layout column>
              <v-flex xs10>
                <v-text-field v-model="title" v-bind:disabled="isLoading" label="Título" hide-details class="pb-4"></v-text-field>
              </v-flex>
              <v-flex xs2 class="pb-0">
                <v-btn v-on:click="save" v-bind:disabled="!isSavable || isLoading" color="ma-0 blue white--text">
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

import { SAVE_QUERY } from 'store/actions.type'
import { SET_QUERY_TITLE } from 'store/mutations.type'

import BaseNotepad from 'components/BaseNotepad'

export default {
  name: 'SandboxSaveMenu',
  props: {
    edit: { type: Boolean }
  },
  components: {
    BaseNotepad
  },
  data() {
    return {
      title: null,
      isLoading: false
    };
  },
  created () {
    this.title = this.queryTitle

    this.$watch('title', newTitle => { this.$store.commit(SET_QUERY_TITLE, newTitle); });
  },
  computed: {
    ...mapGetters([
      'queryTitle',
      'queryBody',
    ]),
    menuTitle() {
      return (this.edit) ? 'EDITAR QUERY' : 'SALVAR QUERY';
    },
    isSavable() {
      return Boolean(this.queryBody) && Boolean(this.queryTitle);
    }
  },
  methods: {
    async save() {
      this.isLoading = true;
      this.$emit('loading', true);

      try {
        await this.$store.dispatch(SAVE_QUERY);
        this.$emit('success');
      } catch(err) {
        this.$emit('error', err);
      } finally {
        this.isLoading = false;
        this.$emit('loading', false);
      }
    }
  }
}
</script>
