<template>
  <div>
    <v-select
      v-model="selectedLimit"
      variant="outlined"
      label="Limit"
      :items="limits"
    />
    <div class="order_wrapper" v-if="asksOrders">
      <OrderTable :columns="columns" :orders="asksOrders"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {binanceWsInjectable} from "../external-api/binance-ws.injectable";
import {isObject} from "lodash";

const limits = [100, 500, 1000]
const selectedLimit = ref(100)
const asksOrders = ref<any[] | null>(null)

const columns = ['Price', 'Quantity', 'Total']

const {subscribeForSymbols} = binanceWsInjectable.inject()

const pair$ = subscribeForSymbols(['btcusdt@depth'])

pair$.subscribe((res) => {
  console.log('res', res)
  if (isObject(res) && Object.prototype.hasOwnProperty.call(res, 'a')) {
    // for (let [price, amount] of Object.entries(res.a)) {
    //   console.log('price, amount', price, amount)
    // }
    asksOrders.value = res.a
  }

})
</script>

<style scoped lang="sass">
.order_wrapper
  display: grid
  grid-template-columns: 1fr 1fr
</style>
