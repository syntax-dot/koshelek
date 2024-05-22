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
          v-for="item in navItems"
          :key="item.path"
          :title="item.title"
          @click="router.push({ path: item.path })"
        >
          <template #prepend>
            <v-icon :icon="item.icon"/>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <div class="pa-md-4">
        <router-view/>
      </div>
    </v-main>

    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {RestMarketTypes, Spot} from '@binance/connector-typescript';
import {webSocket} from "rxjs/webSocket";

const drawer = ref(false)
const router = useRouter()
const navItems = [
  {title: 'Settings', path: '/settings', routeName: 'Settings', icon: ' mdi-cog-outline'},
  {title: 'Order Book', path: '/orderBook', routeName: 'OrderBook', icon: 'mdi-book-arrow-up-outline'},
]

const BASE_URL = '/binance';

onMounted(async () => {
  const client = new Spot('', '', {
    baseURL: BASE_URL,
  });

  const options: RestMarketTypes.orderBookOptions = {
    limit: 100,
  };

  client.orderBook('BNBUSDT', options).then((res: RestMarketTypes.orderBookResponse) => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });


  let reqID = 0

  const binance$ = webSocket({
    url: 'wss://fstream.binance.com/ws/stream',
    // serializer: (value) => JSON.stringify(value),
    // deserializer: (value) => JSON.parse(value.data),
  });

  function getPair(params: string[]) {

    return binance$.multiplex(
      () => (
        {
          method: "SUBSCRIBE",
          params,
          id: ++reqID
        }
      ),
      () => (
        {
          method: "UNSUBSCRIBE",
          params,
          id: ++reqID
        }
      ),
      msg => msg.e === 'depthUpdate'
    )
  }

  const pair$ = getPair(['btcusdt@depth'])

  pair$.subscribe((res) => {
    console.log('res', res)
  })

  binance$.subscribe((msg) => {
    console.log('binance msg', msg)
  })

})

</script>
