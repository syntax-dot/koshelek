<template>
  <div>
    <v-select
      v-model="selectedSymbol"
      @update:model-value="onUpdateSelectedSymbols"
      variant="outlined"
      label="Symbols"
      :items="symbols"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {binanceApiInjectable} from "../external-api/binance-api.injectable";
import {RestMarketTypes} from "@binance/connector-typescript";

interface Symbol {
  title: string
  value: string
}

const symbols: Symbol[] = [
  {title: 'BTC-USDT', value: 'BTCUSDT'},
  {title: 'BNB-BTC', value: 'BNBBTC'},
  {title: 'ETH-BTC', value: 'ETHBTC'},
]

const selectedSymbol = ref(symbols[0])

const {client} = binanceApiInjectable.inject()

const options: RestMarketTypes.orderBookOptions = {
  limit: 100,
};

function onUpdateSelectedSymbols(symbol: string) {
  console.log('symbol', symbol)
  client.orderBook(symbol, options)
    .then((res: RestMarketTypes.orderBookResponse) => {
      console.log(res);
    }).catch(err => {
    console.log(err);
  });
}

</script>

<style scoped lang="sass">

</style>
