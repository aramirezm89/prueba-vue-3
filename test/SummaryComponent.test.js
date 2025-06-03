import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SummaryComponent from '../src/components/SummaryComponent.vue'
import { useIntrumentStore } from '../src/stores/intruments'

describe('SummaryComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('muestra correctamente los datos del IPSA', async () => {
    const store = useIntrumentStore()
    const mockIpsaData = {
      data: {
        info: {
          marketName: 'Bolsa de Santiago',
          hourOpen: '09:30:00',
          hourClose: '16:00:00',
          trading: true
        },
        price: {
          maxDay: 6100.50,
          minDay: 5900.50,
          accumulatedVolumeInstrument: 1000000,
          max52W: 6500.00,
          min52W: 5500.00
        }
      }
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIpsaData)
    })

    // Llamar a fetchIpsa antes de montar el componente
    await store.fetchIpsa()
    const wrapper = mount(SummaryComponent)
    await wrapper.vm.$nextTick()

    // Verificar que los datos se muestran correctamente
    expect(wrapper.text()).toContain('6100.50') // maxDay
    expect(wrapper.text()).toContain('5900.50') // minDay
    expect(wrapper.text()).toContain('1000000') // volumen
    expect(wrapper.text()).toContain('6500.00') // max52W
    expect(wrapper.text()).toContain('5500.00') // min52W
  })

  it('muestra correctamente los datos del instrumento seleccionado', async () => {
    const store = useIntrumentStore()
    const mockInstrumentData = {
      data: {
        info: {
          marketName: 'Bolsa de Santiago',
          hourOpen: '09:30:00',
          hourClose: '16:00:00',
          trading: true
        },
        price: {
          maxDay: 1200.00,
          minDay: 1150.00,
          accumulatedVolumeInstrument: 50000,
          max52W: 1300.00,
          min52W: 1000.00
        }
      }
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockInstrumentData)
    })

    const wrapper = mount(SummaryComponent)
    
    await store.selectInstrument({
      name: 'Banco de Chile',
      shortName: 'CHILE',
      codeInstrument: 'CHILE'
    })

    await wrapper.vm.$nextTick()

    // Verificar datos del instrumento
    expect(wrapper.text()).toContain('1200.00') // maxDay
    expect(wrapper.text()).toContain('1150.00') // minDay
    expect(wrapper.text()).toContain('50000') // volumen
    expect(wrapper.text()).toContain('1300.00') // max52W
    expect(wrapper.text()).toContain('1000.00') // min52W
  })

  it('formatea correctamente los números', () => {
    const wrapper = mount(SummaryComponent)
    
    // Probar el método formatNumber
    expect(wrapper.vm.formatNumber(1234.5678)).toBe('1234.57')
    expect(wrapper.vm.formatNumber(null)).toBe('0')
    expect(wrapper.vm.formatNumber(undefined)).toBe('0')
    expect(wrapper.vm.formatNumber(0)).toBe('0')
  })
})
