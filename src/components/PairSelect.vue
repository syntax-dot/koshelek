<template>
  <v-select
    :modelValue="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    variant="outlined"
    label="Symbols"
    :items="symbols"
  />

</template>

<script setup lang="ts">
const symbols = [
  {title: 'BTC-USDT', value: 'BTCUSDT'},
  {title: 'BNB-USDT', value: 'BNBUSDT'},
  {title: 'ETH-BTC', value: 'ETHBTC'},
]

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (emit: 'update:modelValue', value: string): void }>()
</script>
