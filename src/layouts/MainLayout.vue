<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"/>
      <div class="d-flex align-center flex-row pl-6 cursor-pointer ga-4"
           @click="router.push({name: 'Home'})"
      >
        <v-icon x-large icon="mdi-bitcoin"/>
        <v-app-bar-title>Koshelek</v-app-bar-title>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list
      >
        <v-list-item
          class="cursor-pointer"
          v-for="item in navItems"
          :key="item.path"
          :title="item.title"
          @click="router.push({ path: item.routeName })"
        >
          <template #prepend>
            <v-icon :icon="item.icon"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <div class="pa-4">
        <router-view/>
      </div>
    </v-main>

  </v-app>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const drawer = ref(false)
const router = useRouter()
const navItems = [
  {title: 'Settings', path: '/settings', routeName: 'Settings', icon: ' mdi-cog-outline'},
  {title: 'Order Book', path: '/orderBook', routeName: 'OrderBook', icon: 'mdi-book-arrow-up-outline'},
]
</script>
