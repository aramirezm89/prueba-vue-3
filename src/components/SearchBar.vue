<template>
    <q-input
      v-model="searchText"
      @update:model-value="onSearch"
      label="Busca un instrumento"
      color="primary"
      filled
      debounce="500"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search'])
const searchText = ref('')

const onSearch = (value) => {
  emit('search', value)
}
</script>

<style lang="scss" scoped>

</style>
