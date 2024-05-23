<template>
  <div>
    <v-select
      v-model="selectedPair"
      variant="outlined"
      label="Symbols"
      :items="symbols"
    ></v-select>

    <div>
      USER LOGS
    </div>

    <div class="log_list">
      <template v-if="userLogs.length">
        <div class="log_item" v-for="log in userLogs" :key="log.timestamp">
          <div>
            {{ formatTimestamp(log.timestamp) }}
          </div>
          <div>
            {{ log.oldValue }} &#8658; {{ log.newValue }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSelectedPair} from "../hooks/use-selected-pair";
import {LogTransaction, useIndexedDb} from "../hooks/use-indexed-db";
import {onMounted, ref, watch} from "vue";
import {formatTimestamp} from "../utils/date-time/format-timestamp";

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
  try {
    addTransaction(changeLog)
    userLogs.value.push(changeLog)
  } catch (error) {
    console.error('addTransaction error', error)
  }
})

onMounted(async () => {
  userLogs.value = await getAll()
})
</script>

<style scoped lang="sass">
.log
  background-color: red

  &_list
    display: flex
    flex-direction: column
    gap: 8px
    border: 1px #ccc solid
    border-radius: 16px
    padding: 8px
    background-color: #161A1E

  &_item
    display: flex
    flex-wrap: nowrap
    gap: 8px
    cursor: pointer
    color: #ADB2BB
    transition: color .3s ease-in-out

    &:hover
      color: white
</style>
