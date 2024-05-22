<template>
  <v-app>
    <MainLayout/>
  </v-app>
</template>

<script lang="ts" setup>
import {binanceWsInjectable} from "./external-api/binance-ws.injectable";
import {binanceApiInjectable} from "./external-api/binance-api.injectable";
import MainLayout from "./layouts/MainLayout.vue";

binanceWsInjectable.provide()
binanceApiInjectable.provide()
</script>
