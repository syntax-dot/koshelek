<template>
  <div>
    <v-select
      v-model="selectedLimit"
      variant="outlined"
      label="Limit"
      :items="limits"
    />
    <v-select
      v-model="selectedRound"
      variant="outlined"
      label="Group by"
      :items="roundList"
    />
    <div class="order_wrapper" v-if="askOrders">
      <OrderTable :columns="columns" :orders="askOrders" color="#CA374E"/>
      <OrderTable :columns="columns" :orders="bidOrders" color="#2EBD85"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useOrderBook} from "../hooks/use-order-book";
import {useGroupedItems} from "../hooks/use-grouped-items";
import {useSelectedPair} from "../hooks/use-selected-pair";


const limits = [100, 500, 1000]
const roundList = [100, 500, 1000]
const selectedLimit = ref(100)
const symbols = ref(['btcusdt@depth'])
const selectedRound = ref(1)

const selectedPair = useSelectedPair()

const selectedPairValue = computed(() => {
  return [selectedPair.value.toLowerCase().concat('@depth')]
})

const columns = ['Price', 'Quantity', 'Total']

const orderBook = useOrderBook(selectedPairValue)
const askOrders = useGroupedItems(orderBook.askOrders, selectedRound)
const bidOrders = useGroupedItems(orderBook.bidOrders, selectedRound)
</script>

<style scoped lang="sass">
.order_wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 16px

</style>
