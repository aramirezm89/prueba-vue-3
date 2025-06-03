<template>
  <div class="tab-container">
    <q-tabs
      v-model="selectedTab"
      class="text-primary"
      active-color="primary"
      indicator-color="primary"

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
import { ref } from 'vue'
import { useIntrumentStore } from 'stores/intruments'

const store = useIntrumentStore()
const selectedTab = ref('ipsa')

// Cargar datos cuando cambie el tab
const handleTabChange = (tab) => {
  if (tab === 'ipsa') {
    store.fetchIpsa()
  }
}

// Cargar datos del IPSA inicialmente
store.fetchIpsa()
</script>

<style lang="scss" scoped>
.tab-container {
  margin-bottom: 1rem;
}
</style>
