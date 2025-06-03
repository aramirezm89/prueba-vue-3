<template>
<div @click="selectInstrument" class="list-item" >
  <q-item  >
    <q-item-section>
      <q-item-label>{{ instrument.name }}</q-item-label>
      <q-item-label caption>{{ instrument.codeInstrument }}</q-item-label>
    </q-item-section>
    <q-item-section style="display: flex; flex-direction: column; gap: 5px">
      <q-item-label>Instrument last price</q-item-label>
      <q-item-label>{{ Number(instrument.lastPrice).toFixed(2) }}</q-item-label>
      <q-item-label>Instrument pctDay</q-item-label>
      <q-item-label :class="{'text-positive': instrument.pctDay > 0, 'text-negative': instrument.pctDay < 0}">
        {{ Number(instrument.pctDay).toFixed(2) }}%
      </q-item-label>
    </q-item-section>
    <q-item-section style="display: flex; flex-direction: column; gap: 5px">
      <q-item-label>Instrument pct30D</q-item-label>
      <q-item-label>{{ Number(instrument.pct30D).toFixed(2) }}%</q-item-label>
      <q-item-label>Instrument pctCY</q-item-label>
      <q-item-label :class="{'text-positive': instrument.pctCY > 0, 'text-negative': instrument.pctCY < 0}">
        {{ Number(instrument.pctCY).toFixed(2) }}%
      </q-item-label>
    </q-item-section>
  </q-item>
</div>
</template>

<script setup>
import { useIntrumentStore } from 'stores/intruments'

const props = defineProps({
  instrument: {
    type: Object,
    required: true
  }
})
const store = useIntrumentStore()
const intrumentItem = props.instrument

const selectInstrument = () => {
  store.selectInstrument(intrumentItem)
}

</script>

<style lang="scss" scoped>

.list-item{

  cursor: pointer;
  &:hover{
    background-color: #4e4e4e;
  }

}
</style>
