<template>
  <div>
    <v-select
      v-model="selectedPair"
      variant="outlined"
      label="Symbols"
      :items="symbols"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
import {useSelectedPair} from "../hooks/use-selected-pair";

interface Symbol {
  title: string
  value: string
}

const symbols: Symbol[] = [
  {title: 'BTC-USDT', value: 'BTCUSDT'},
  {title: 'BNB-USDT', value: 'BNBUSDT'},
  {title: 'ETH-BTC', value: 'ETHBTC'},
]

const selectedPair = useSelectedPair()

</script>

<style scoped lang="sass">

</style>
