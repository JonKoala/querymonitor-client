<template>
  <v-app id="app" light>
    <v-toolbar app fixed clipped-left>
      <v-tooltip bottom>
        <span>Home</span>
      </v-tooltip>
      <v-toolbar-title>QUERY MONITOR</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start style="width:100%">
          <v-slide-x-transition mode="out-in">
          </v-slide-x-transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
