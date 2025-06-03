<template>
  <q-card class="summary-card">
    <q-card-section>
      <div class="text-h6">Resumen de Cotización</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md">
        <!-- Columna 1 -->
        <div class="col-12 col-sm-6">
          <div class="data-group">
            <div class="data-item">
              <div class="data-label">Mercado</div>
              <span>{{ selectedInstrument.marketName }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Horario</div>
              <span>{{ selectedInstrument.hourOpen }} - {{ selectedInstrument.hourClose }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Estado</div>
              <span :class="{ 'text-positive': selectedInstrument.trading, 'text-negative': !selectedInstrument.trading }">
                {{ selectedInstrument.trading ? 'Abierto' : 'Cerrado' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Columna 2 -->
        <div class="col-12 col-sm-6">
          <div class="data-group">
            <div class="data-item">
              <div class="data-label">Máximo del día</div>
              <span>{{ formatNumber(selectedInstrument.maxDay) }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Mínimo del día</div>
              <span>{{ formatNumber(selectedInstrument.minDay) }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Volumen acumulado</div>
              <span>{{ formatNumber(selectedInstrument.accumulatedVolumeInstrument) }}</span>
            </div>
          </div>
        </div>

        <!-- Columna 3 -->
        <div class="col-12">
          <div class="data-group">
            <div class="data-item">
              <div class="data-label">Máximo 52 semanas</div>
              <span class="text-positive">{{ formatNumber(selectedInstrument.max52W) }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Mínimo 52 semanas</div>
              <span class="text-negative">{{ formatNumber(selectedInstrument.min52W) }}</span>
            </div>
            <div class="data-item">
              <div class="data-label">Variación YTD</div>
              <span :class="{ 'text-positive': selectedInstrument.pctCY > 0, 'text-negative': selectedInstrument.pctCY < 0 }">
                {{ formatNumber(selectedInstrument.pctCY) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useIntrumentStore } from '../stores/intruments'

const store = useIntrumentStore()
const { selectedInstrument } = storeToRefs(store)

const formatNumber = (value) => {
  if (!value && value !== 0) return '-'
  return value.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style lang="scss" scoped>
.summary-card {
  width: 100%;
}

.data-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .data-label {
    font-size: 0.875rem;
    color: #666;
  }

  span {
    font-size: 1rem;
    font-weight: 500;
  }
}

.text-positive {
  color: #21ba45;
}

.text-negative {
  color: #c10015;
}
</style>
