import { config } from '@vue/test-utils'
import { Quasar } from 'quasar'
import { afterEach, vi } from 'vitest'

// Configuración global para Vue Test Utils
config.global.plugins = [Quasar]

// Mock de fetch global
global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    data: {
      info: {
        marketName: 'Bolsa de Santiago',
        hourOpen: '09:30:00',
        hourClose: '16:00:00',
        trading: true
      },
      price: {
        lastPrice: 6000.50,
        performanceRelative: 1.5,
        pct30D: 2.3,
        pctRelCY: 5.2,
        maxDay: 6100.50,
        minDay: 5900.50,
        accumulatedVolumeInstrument: 1000000,
        max52W: 6500.00,
        min52W: 5500.00
      }
    }
  })
}))

// Limpiar mocks después de cada prueba
afterEach(() => {
  vi.clearAllMocks()
})
