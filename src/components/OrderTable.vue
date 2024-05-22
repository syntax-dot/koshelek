<template>
  <div>
    <v-table
      height="300px"
      fixed-header
    >
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Calories
        </th>
        <th class="text-left">
          Calories
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.calories }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">

interface OrderTableColumn {
  head: string,
  field: string
}

interface Order {
  head: string,
}

interface OrderTableProps {
  columns: OrderTableColumn[]
  order: Order[]
}

const props = defineProps<OrderTableProps>()

</script>


<style scoped lang="sass">

</style>
