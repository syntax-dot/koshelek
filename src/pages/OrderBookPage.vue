<template>
  <div>
    <div class="order_params">
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
      <!--   Информация по торговой паре выведена для удобства и тестирования, логи при смене не ведутся   -->
      <PairSelect
        v-model="selectedPair"
      />
    </div>
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
import {useDisplay} from "vuetify";

const columns = ['Price', 'Quantity', 'Total']
const limitsOptions = [100, 500, 1000]
const priceDifferenceOptions = [1, 10, 100]

const selectedLimit = ref(100)
const selectedPriceDifference = ref<number | null>(null)

const selectedPair = useSelectedPair()
const {mobile} = useDisplay()

const selectedPairValue = computed(() => {
  return [selectedPair.value.toLowerCase().concat('@depth')]
})
const computedColumns = computed(() => mobile.value ? 1 : 3)

const orderBook = useOrderBook(selectedPairValue)
const askOrders = useGroupedItems(orderBook.askOrders, selectedPriceDifference)
const bidOrders = useGroupedItems(orderBook.bidOrders, selectedPriceDifference)
</script>

<style scoped lang="sass">
.order
  &_wrapper
    min-height: 400px
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 16px

  &_params
    display: grid
    grid-template-columns: repeat(v-bind('computedColumns'), 1fr)
    gap: 0 16px

</style>
