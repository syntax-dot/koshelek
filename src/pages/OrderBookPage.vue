<template>
  <div>
    <v-select
      v-model="selectedLimit"
      variant="outlined"
      label="Items limit"
      :items="limitsOptions"
    />
    <v-select
      v-model="selectedPriceDifference"
      variant="outlined"
      clearable
      label="Price difference"
      :items="priceDifferenceOptions"
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

const columns = ['Price', 'Quantity', 'Total']
const limitsOptions = [100, 500, 1000]
const priceDifferenceOptions = [0.01, 0.1, 1, 10, 100]

const selectedLimit = ref(100)
const selectedPriceDifference = ref<number | null>(null)

const selectedPair = useSelectedPair()

const selectedPairValue = computed(() => {
  return [selectedPair.value.toLowerCase().concat('@depth')]
})

const orderBook = useOrderBook(selectedPairValue)
const askOrders = useGroupedItems(orderBook.askOrders, selectedPriceDifference)
const bidOrders = useGroupedItems(orderBook.bidOrders, selectedPriceDifference)
</script>

<style scoped lang="sass">
.order_wrapper
  min-height: 400px
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 16px

</style>
