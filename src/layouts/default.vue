<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
