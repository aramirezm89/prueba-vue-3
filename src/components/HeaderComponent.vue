<template>
  <div v-if="Object.keys(selectedInstrument).length > 0">
    <h6 class="text-h6">{{ selectedInstrument.name }}</h6>
    <div class="values">
      <div class="value-item">
        <label>Valor actual</label>
        <span>{{ selectedInstrument.lastPrice.toFixed(2) }}</span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual día</label>
        <span>{{ selectedInstrument.performanceRelative.toFixed(2) }}</span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual 30 días</label>
        <span>{{ selectedInstrument.pct30D.toFixed(2) }}</span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual año</label>
        <span>{{ selectedInstrument.pctCY.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIntrumentStore } from 'stores/intruments'
const store = useIntrumentStore()

const selectedInstrument = computed(() => store.selectedInstrument)
</script>

<style lang="scss" scoped>
.values {
  display: flex;
  justify-content: space-between;
}
.value-item {
  display: flex;
  gap: 10px;
}
</style>
