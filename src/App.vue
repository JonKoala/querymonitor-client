<template>
  <v-app id="app" light>
    <v-toolbar app fixed clipped-left>
      <v-tooltip bottom>
        <v-btn @click.stop="showMenu = !showMenu" slot="activator" class="mx-0" icon>
          <v-icon>menu</v-icon>
        </v-btn>
        <span>Menu</span>
      </v-tooltip>
      <v-toolbar-title>QUERY MONITOR</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="showMenu" clipped fixed app absolute temporary class="pr-3">
      <app-vertical-menu v-bind:visible="showMenu"></app-vertical-menu>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-slide-x-transition mode="out-in">
            <router-view class="mt-0"></router-view>
          </v-slide-x-transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppVerticalMenu from 'components/AppVerticalMenu'

export default {
  name: 'App',
  components: {
    AppVerticalMenu
  },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>
