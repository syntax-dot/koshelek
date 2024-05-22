<template>
  <div>
    <v-select
      class="pa-md-4"
      v-model="selectedSymbols"
      variant="outlined"
      label="Select"
      :items="symbols"
    ></v-select>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const symbols = [
  {title: 'BTC-USDT'},
  {title: 'BNB-BTC'},
  {title: 'ETH-BTC'},
]

const selectedSymbols = ref(symbols[0])

</script>

<style scoped lang="sass">

</style>
