<template>
  <div class="chart-container">
    <div class="period-selector">
      <q-btn-group flat>
        <q-btn
          v-for="period in periods"
          :key="period.value"
          :label="period.label"
          :color="selectedPeriod === period.value ? 'primary' : 'grey'"
          @click="selectedPeriod = period.value"
          flat
        />
      </q-btn-group>
    </div>

    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIntrumentStore } from 'stores/intruments'

const store = useIntrumentStore()
const selectedPeriod = ref('1M')

const periods = [
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1A', value: '1A' }
]

// Simulación de datos para el gráfico
// TODO: Reemplazar con datos históricos del índice cuando estén disponibles
const generateMockData = (days) => {
  const data = []
  const today = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      x: date.getTime(),
      y: Math.floor(Math.random() * 1000) + 4000 // Simula valores entre 4000 y 5000
    })
  }
  return data
}

const series = computed(() => {
  const daysMap = {
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1A': 365
  }
  
  return [{
    name: store.selectedInstrument.name || 'IPSA',
    data: generateMockData(daysMap[selectedPeriod.value])
  }]
})

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    zoom: {
      enabled: true
    },
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  title: {
    text: 'Evolución del Índice',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM \'yy',
        day: 'dd MMM',
        hour: 'HH:mm'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Valor'
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  }
}))
</script>

<style lang="scss" scoped>
.chart-container {
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.period-selector {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
