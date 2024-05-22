<template>
  <div>
    <v-table
      height="300px"
      fixed-header
      class="table"
    >
      <thead>
      <tr>
        <th v-for="(column, index) in columns.slice(0, !mobile ? columns.length : 2)" :key="column + index"
            class="text-left">
          {{ column }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in orders"
        :key="item.name"
      >
        <td>
          {{ item[0] }}
        </td>
        <td>
          {{ item[1] }}
        </td>
        <td v-if="!mobile">
          {{ getTotal(item[0], item[1]) }}
        </td>
        <!--        <template v-for="(field, index) in fields" :key="field + index">-->
        <!--          <template v-if="item.hasOwnProperty(field)">-->
        <!--            <td>-->
        <!--              {{ item[field] }}-->
        <!--            </td>-->
        <!--          </template>-->
        <!--        </template>-->
      </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">
import {round} from "lodash";
import {useDisplay} from 'vuetify'

const {mobile} = useDisplay()

type Order = any

interface OrderTableProps {
  columns: string[],
  // fields: string[],
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

  &_head
    display: grid
    grid-auto-flow: column
</style>
