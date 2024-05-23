<template>
  <div class="table_wrapper">
    <div
      class="table"
    >
      <div class="table_grid table_head__wrapper">
        <div v-for="(column, index) in columns.slice(0, !mobile ? columns.length : 2)"
             :key="column + index"
             class="text-left">
          {{ column }}
        </div>
      </div>

      <div>
        <div
          v-for="(order, index) in orders"
          class="table_grid"
          :key="index"
        >
          <div :style="{color}">
            {{ order[0] }}
          </div>
          <div>
            {{ order[1] }}
          </div>
          <div v-if="!mobile">
            {{ getTotal(order[0], order[1]) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {round} from "lodash";
import {useDisplay} from 'vuetify'
import {computed} from "vue";

const {mobile} = useDisplay()

type Order = any

interface OrderTableProps {
  columns: string[],
  orders: Order[],
  color?: string,
}

defineProps<OrderTableProps>()

const computedColumns = computed(() => mobile.value ? 2 : 3)

function getTotal(price: number, amount: number) {
  return round(price * amount, 2)
}

</script>


<style scoped lang="sass">
.table
  height: 100%
  overflow-y: auto
  overflow-x: hidden !important
  color: #ADB2BB

  &::-webkit-scrollbar
    width: 4px

  &::-webkit-scrollbar-thumb
    background: white
    border-radius: 16px

  &_wrapper
    max-height: 80vh
    border: 1px #ccc solid
    background-color: #161A1E

  &_grid
    display: grid
    grid-template-columns: repeat(v-bind('computedColumns'), 1fr)
    padding: 0 8px

  &_head__wrapper
    border-bottom: #ededed 1px solid
    position: sticky
    top: 0
    background-color: #161A1E
</style>
