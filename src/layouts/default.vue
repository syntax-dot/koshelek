<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const sidebar = ref(false)
const menuItems = [
  {title: 'Home', path: '/home', icon: 'home'},
  {title: 'Sign Up', path: '/signup', icon: 'face'},
  {title: 'Sign In', path: '/signin', icon: 'lock_open'}
]
</script>
