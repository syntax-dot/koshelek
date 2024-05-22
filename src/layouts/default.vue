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
      >
        <v-list-item
          class="cursor-pointer"
          v-for="item in items"
          :key="item.path"
          :title="item.title"
          @click="$router.push({ path: item.path })"
        >
          <template #prepend>
            <v-icon :icon="item.icon"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view/>
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {Spot} from '@binance/connector-typescript';

const drawer = ref(false)
const router = useRouter()
const items = [
  {title: 'Settings', path: '/settings', icon: ' mdi-cog-outline'},
  {title: 'Order Book', path: '/orderBook', icon: 'mdi-book-arrow-up-outline'},
]

const API_KEY = '';
const API_SECRET = '';
const BASE_URL = 'https://testnet.binance.vision';

onMounted(async () => {
  const client = new Spot(API_KEY, API_SECRET, {baseURL: BASE_URL});
  client.exchangeInformation().then((res) => {
    console.log(res);
  }).catch(err => {
    console.log(err)
  });
})

</script>
