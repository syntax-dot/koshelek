<template>
  <div>
    <v-select
      v-model="selectedLimit"
      variant="outlined"
      label="Limit"
      :items="limits"
    />

  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const limits = [100, 500, 1000]
const selectedLimit = ref(100)
</script>

<style scoped lang="sass">

</style>
