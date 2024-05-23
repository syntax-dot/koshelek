<template>
  <div>
    <v-select
      v-model="selectedLimit"
      variant="outlined"
      label="Limit"
      :items="limits"
    />
    <div class="order_wrapper" v-if="askOrders">
      <OrderTable :columns="columns" :orders="askOrders" color="#CA374E"/>
      <OrderTable :columns="columns" :orders="bidOrders" color="#2EBD85"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {binanceWsInjectable} from "../external-api/binance-ws.injectable";
import {isObject} from "lodash";

const limits = [100, 500, 1000]
const selectedLimit = ref(100)
const askOrders = ref<any[] | null>(null)
const bidOrders = ref<any[] | null>(null)

const columns = ['Price', 'Quantity', 'Total']

const {subscribeForSymbols} = binanceWsInjectable.inject()

const pair$ = subscribeForSymbols(['btcusdt@depth'])

pair$.subscribe((res) => {
  console.log('res', res)
  if (!isObject(res)) return
  if (
    !Object.prototype.hasOwnProperty.call(res, 'b')
    || !Object.prototype.hasOwnProperty.call(res, 'a')
  ) return

  // for (let [price, amount] of Object.entries(res.a)) {
  //   console.log('price, amount', price, amount)
  // }
  const {a, b} = res || {}

  if (!Array.isArray(a) || !Array.isArray(b)) return

  askOrders.value = a.slice(0, selectedLimit.value)
  bidOrders.value = b.slice(0, selectedLimit.value)
})
</script>

<style scoped lang="sass">
.order_wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 16px

</style>
