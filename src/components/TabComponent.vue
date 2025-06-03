<template>
  <div class="tab-container">
    <q-tabs
      v-model="selectedTab"
      class="text-primary"
      active-color="primary"
      indicator-color="primary"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <q-tab name="ipsa" label="IPSA" @click="handleTabChange('ipsa')" />
      <q-tab name="igpa" label="IGPA" disable />
      <q-tab name="nasdaq" label="NASDAQ" disable />
    </q-tabs>

    <q-banner v-if="selectedTab !== 'ipsa'" class="bg-warning text-white q-mt-sm">
      Los datos para este índice no están disponibles en este momento.
    </q-banner>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIntrumentStore } from '../stores/intruments'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'ipsa'
  }
})

const store = useIntrumentStore()
const emit = defineEmits(['update:modelValue'])

const selectedTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Cargar datos cuando cambie el tab
const handleTabChange = (tab) => {
  if (tab === 'ipsa') {
    store.fetchIpsa()
  }
  selectedTab.value = tab
}

// Cargar datos del IPSA inicialmente
store.fetchIpsa()
</script>

<style lang="scss" scoped>
.tab-container {
  margin-bottom: 1rem;
}
</style>
