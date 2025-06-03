<template>
  <q-page class="hero">
    <div class="container">
      <SearchBarComponent @search="handleSearch"/>
      <HeaderComponent style="margin-top: 20px;" />
      <div class="content">
        <q-inner-loading :showing="store.loading">
          <q-spinner-dots size="50px" color="primary" />
        </q-inner-loading>
        <TabComponent class="q-mt-md q-mr-auto" />
        <div class="chart-resume-container q-mt-md">
          <ChartComponent   />
          <SummaryComponent />
        </div>

      </div>
      <InstrumentListComponent v-if="!store.loading" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useIntrumentStore } from 'stores/intruments'
import SearchBarComponent from 'components/SearchBar.vue'
import HeaderComponent from 'components/HeaderComponent.vue'
import InstrumentListComponent from 'components/InstrumentListComponent.vue'
import TabComponent from 'components/TabComponent.vue'
import ChartComponent from 'components/ChartComponent.vue'
import SummaryComponent from 'components/SummaryComponent.vue'

const store = useIntrumentStore()

// Cargar los datos cuando el componente se monte
onMounted(async() => {
  await store.fetchConstituents()
  store.fetchIpsa()
})

const handleSearch = (value) => {
  store.filterConstituents(value)

}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hero{
  width: 100%;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.header{
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}



.chart-resume-container {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}
</style>
