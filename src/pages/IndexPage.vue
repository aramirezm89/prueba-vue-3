<template>
  <q-page class="hero">
    <SearchBarComponent @search="handleSearch" class="container"/>
    <HeaderComponent class="container" style="margin-top: 20px;" />
    <div class="container content">
      <q-inner-loading :showing="store.loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>

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

const store = useIntrumentStore()

// Cargar los datos cuando el componente se monte
onMounted(async() => {
  await store.fetchConstituents()
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
}
</style>
