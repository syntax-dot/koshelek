<template>
  <div>
    <v-select
      v-model="selectedPair"
      variant="outlined"
      label="Symbols"
      :items="symbols"
    ></v-select>

    <div class="logs_wrapper">
      <template v-if="userLogs.length">
        <div v-for="log in userLogs" :key="log.timestamp">
          {{ log }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSelectedPair} from "../hooks/use-selected-pair";
import {LogTransaction, useIndexedDb} from "../hooks/use-indexed-db";
import {onMounted, ref, watch} from "vue";

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
const {getAll, addTransaction} = useIndexedDb()

const userLogs = ref<LogTransaction[]>([])

watch(selectedPair, (newValue, oldValue) => {
  const changeLog: LogTransaction = {
    timestamp: Date.now(),
    newValue,
    oldValue
  }
  addTransaction(changeLog)
})

onMounted(async () => {
  const logs = await getAll()
  console.log('logs', logs)
  userLogs.value = logs
})
</script>

<style scoped lang="sass">

</style>
