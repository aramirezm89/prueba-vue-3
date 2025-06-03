<template>
  <div>
    <h6 class="text-h6">{{ displayData.name || 'IPSA' }}</h6>
    <div class="values">
      <div class="value-item">
        <label>Valor actual</label>
        <span>{{ formatNumber(displayData.lastPrice) }}</span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual día</label>
        <span :class="{ 'text-positive': displayData.performanceRelative > 0, 'text-negative': displayData.performanceRelative < 0 }">
          {{ formatNumber(displayData.performanceRelative) }}%
        </span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual 30 días</label>
        <span :class="{ 'text-positive': displayData.pct30D > 0, 'text-negative': displayData.pct30D < 0 }">
          {{ formatNumber(displayData.pct30D) }}%
        </span>
      </div>
      <div class="value-item">
        <label>Variacion porcentual año</label>
        <span :class="{ 'text-positive': displayData.pctCY > 0, 'text-negative': displayData.pctCY < 0 }">
          {{ formatNumber(displayData.pctCY) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useIntrumentStore } from '../stores/intruments'

const store = useIntrumentStore()
const { selectedInstrument } = storeToRefs(store)

// Cargar datos del IPSA al montar el componente
onMounted(async () => {
  await store.fetchIpsa()
})

// Computar los datos a mostrar
const displayData = computed(() => {
  if (!selectedInstrument.value || Object.keys(selectedInstrument.value).length === 0) {
    return {
      name: 'IPSA',
      lastPrice: 0,
      performanceRelative: 0,
      pct30D: 0,
      pctCY: 0
    }
  }
  return selectedInstrument.value
})

const formatNumber = (value) => {
  if (!value && value !== 0) return '0.00'
  return Number(value).toFixed(2)
}
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
.text-positive {
  color: #21ba45;
}
.text-negative {
  color: #c10015;
}
</style>
