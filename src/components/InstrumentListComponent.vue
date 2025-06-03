<template>
  <div class="constituents-list">
    <q-list bordered separator>
      <InstrumentItemComponent
        v-for="constituent in store.constituents"
        :key="constituent.codeInstrument"
        :instrument="constituent"
      />
    </q-list>
  </div>
</template>

<script setup>
import { useIntrumentStore } from 'stores/intruments'
import InstrumentItemComponent from './InstrumentItemComponent.vue'

const store = useIntrumentStore()
</script>

<style lang="scss" scoped>
.constituents-list {
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .text-positive {
    color: #21ba45;
  }

  .text-negative {
    color: #c10015;
  }
}
</style>

