<template>
  <v-select
    v-model="selectedPair"
    variant="outlined"
    label="Symbols"
    :items="symbols"
  />

</template>

<script setup lang="ts">
interface Symbol {
  title: string
  value: string
}

const symbols: Symbol[] = [
  {title: 'BTC-USDT', value: 'BTCUSDT'},
  {title: 'BNB-USDT', value: 'BNBUSDT'},
  {title: 'ETH-BTC', value: 'ETHBTC'},
]
</script>
