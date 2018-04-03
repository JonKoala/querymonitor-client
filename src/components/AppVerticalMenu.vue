<template>
  <v-list dense>
    <v-subheader inset>Navegação</v-subheader>
    <template v-for="link in generalLinks">
      <v-list-tile v-bind:to="link.href" @click="">
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ link.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <v-divider inset></v-divider>
    <v-subheader inset>Queries</v-subheader>
    <template v-for="link in queryLinks">
      <v-list-tile v-bind:to="link.href" @click="">
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ link.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import ApiService from 'services/api.service'

export default {
  name: 'AppVerticalMenu',
  props: {
    visible: { type: Boolean }
  },
  data () {
    return {
      generalLinks: [
        { text: 'HOME', icon: 'home', href: '/' },
        { text: 'NOVA QUERY', icon: 'note_add', href: '/create' }
      ],
      queryLinks: []
    }
  },
  methods: {
    loadQueryLinks() {
      ApiService.get('queries').then((queries) => {
        this.queryLinks = queries.map((query) => {
          return { text: query.titulo, icon: 'bookmark', href: '/results/' + query.id }
        });
      });
    }
  },
  watch: {
    visible: function(visible) {
      if (visible)
        this.loadQueryLinks();
    }
  }
}
</script>
