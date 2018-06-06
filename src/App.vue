<template>
  <v-app id="app" light>
    <v-toolbar app fixed clipped-left>
      <base-icon-button v-on:click="showMenu = !showMenu" tooltip="Menu" bottom>menu</base-icon-button>
      <v-toolbar-title>QUERY MONITOR</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="showMenu" clipped fixed app absolute temporary class="pr-3">
      <app-vertical-menu v-bind:visible="showMenu"></app-vertical-menu>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout style="max-width:100%" justify-center align-start>
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
import BaseIconButton from 'components/BaseIconButton'

export default {
  name: 'App',
  components: {
    AppVerticalMenu,
    BaseIconButton
  },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>
