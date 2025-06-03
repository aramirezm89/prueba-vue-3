import { defineStore, acceptHMRUpdate } from 'pinia'

export const useIntrumentStore = defineStore('counter', {
  state: () => ({
    constituents: [],
    allConstituents: [],
    loading: false,
    selectedInstrument: {}
  }),

  getters: {
    getConstituents: (state) => state.constituents
  },

  actions: {
    async fetchConstituents() {
      this.loading = true;
      try {
        const response = await fetch('/json-VueJS/constituyentes/constituensList.json');
        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }

        const jsonData = await response.json()
        console.log('Datos JSON recibidos:', jsonData);

        if (jsonData?.data?.constituents) {
          this.constituents = jsonData.data.constituents;
          this.allConstituents = jsonData.data.constituents;
        } else {
          throw new Error('La estructura del JSON no es la esperada o no contiene constituyentes.')
        }
      } catch (error) {
        console.error('Error al cargar los constituyentes:', error)
        this.constituents = [] // Opcional: resetear en caso de error
      } finally {
        this.loading = false
      }
    },
    async fetchIpsa(){
      try {
        const response = await fetch('/json-VueJS/resumen/IPSA.json');
        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }

        const jsonData = await response.json()

        if (jsonData?.data) {
          const { info, price } = jsonData.data;
          const ipsa = {
            marketName: info.marketName,
            hourOpen: info.hourOpen,
            hourClose: info.hourClose,
            trading: info.trading,
            maxDay: price.maxDay,
            minDay: price.minDay,
            accumulatedVolumeInstrument: price.accumulatedVolumeInstrument,
            max52W: price.max52W,
            min52W: price.min52W,
            pctCY: price.pctRelCY
          }
          this.selectedInstrument = ipsa;
        } else {
          throw new Error('La estructura del JSON no es la esperada')
        }
      } catch (error) {
        console.error('Error al cargar datos del IPSA:', error)
        this.selectedInstrument = {}
      } finally {
        this.loading = false
      }

    },

    filterConstituents(query) {
        if(!query){
            this.constituents = this.allConstituents
            return
        }
        this.constituents = this.constituents.filter(constituent =>
        constituent.name.toLowerCase().includes(query.toLowerCase()) ||
        constituent.shortName.toLowerCase().includes(query.toLowerCase()) ||
        constituent.codeInstrument.toLowerCase().includes(query.toLowerCase())
      )
    },
    selectInstrument(instrument) {
      console.log('Store action: selectInstrument', instrument)
      this.selectedInstrument = instrument
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIntrumentStore, import.meta.hot))
}
