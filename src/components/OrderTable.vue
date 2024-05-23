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
          <div>
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

const {mobile} = useDisplay()

type Order = any

interface OrderTableProps {
  columns: string[],
  orders: Order[]
}

const props = defineProps<OrderTableProps>()

function getTotal(price: string, amount: string) {
  return round(+price * +amount, 2)
}

</script>


<style scoped lang="sass">
.table
  border-radius: 16px
  height: 100%
  overflow-y: scroll
  padding: 0 8px

  &_wrapper
    max-height: 80vh

  &_grid
    display: grid
    grid-template-columns: repeat(3, 1fr)

  &_head__wrapper
    border-bottom: 1px solid red
    position: sticky
    top: 0
    background-color: red
</style>
