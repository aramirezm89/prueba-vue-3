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
          this.selectedInstrument = {
            name: 'IPSA',
            shortName: 'IPSA',
            codeInstrument: 'IPSA',
            lastPrice: price.lastPrice,
            performanceRelative: price.performanceRelative,
            performanceAbsolute: price.performanceAbsolute,
            pct30D: price.pct30D,
            pctCY: price.pctRelCY,
            maxDay: price.maxDay,
            minDay: price.minDay,
            accumulatedVolumeInstrument: price.accumulatedVolumeInstrument,
            max52W: price.max52W,
            min52W: price.min52W,
            marketName: info.marketName,
            hourOpen: info.hourOpen,
            hourClose: info.hourClose,
            trading: info.trading
          };
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
    async selectInstrument(instrument) {
      try {
        const response = await fetch(`/json-VueJS/resumen/${instrument.codeInstrument}.json`);
        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }

        const jsonData = await response.json();
        if (jsonData?.data) {
          const { info, price } = jsonData.data;
          this.selectedInstrument = {
            name: instrument.name,
            shortName: instrument.shortName,
            codeInstrument: instrument.codeInstrument,
            lastPrice: price.lastPrice,
            performanceRelative: price.performanceRelative,
            performanceAbsolute: price.performanceAbsolute,
            pct30D: price.pct30D,
            pctCY: price.pctRelCY,
            maxDay: price.maxDay,
            minDay: price.minDay,
            accumulatedVolumeInstrument: price.accumulatedVolumeInstrument,
            max52W: price.max52W,
            min52W: price.min52W,
            marketName: info.marketName,
            hourOpen: info.hourOpen,
            hourClose: info.hourClose,
            trading: info.trading
          };
        } else {
          throw new Error('La estructura del JSON no es la esperada');
        }
      } catch (error) {
        console.error('Error al cargar datos del instrumento:', error);
        // En caso de error, mantener los datos básicos del instrumento
        this.selectedInstrument = {
          ...instrument,
          maxDay: 0,
          minDay: 0,
          accumulatedVolumeInstrument: 0,
          max52W: 0,
          min52W: 0,
          marketName: 'No disponible',
          hourOpen: '-',
          hourClose: '-',
          trading: false
        };
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIntrumentStore, import.meta.hot))
}
