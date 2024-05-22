<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list
        :items="items"
      ></v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view/>
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const drawer = ref(false)
const items = [
  {title: 'Settings', path: '/settings', icon: 'settings'},
  {title: 'Order Book', path: '/orderBook', icon: 'face'},
]
</script>
