import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import InstrumentItemComponent from '../src/components/InstrumentItemComponent.vue'
import { useIntrumentStore } from '../src/stores/intruments'

describe('InstrumentItemComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockInstrument = {
    name: 'Banco de Chile',
    codeInstrument: 'CHILE',
    lastPrice: 100.50,
    pctDay: 1.5,
    pct30D: 2.3,
    pctCY: -1.2
  }

  it('muestra correctamente los datos del instrumento', () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: {
        instrument: mockInstrument
      }
    })

    // Verificar que se muestran los datos básicos
    expect(wrapper.text()).toContain('Banco de Chile')
    expect(wrapper.text()).toContain('CHILE')
    expect(wrapper.text()).toContain('100.50')
    expect(wrapper.text()).toContain('1.50%')
    expect(wrapper.text()).toContain('2.30%')
    expect(wrapper.text()).toContain('-1.20%')
  })

  it('aplica las clases CSS correctamente para valores positivos y negativos', () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: {
        instrument: mockInstrument
      }
    })

    // Verificar clases CSS para valores positivos y negativos
    const positiveValues = wrapper.findAll('.text-positive')
    const negativeValues = wrapper.findAll('.text-negative')

    expect(positiveValues.length).toBe(3) // lastPrice, pctDay y pct30D son positivos
    expect(negativeValues.length).toBe(1) // pctCY es negativo
  })

  it('emite el evento de selección al hacer clic', async () => {
    const store = useIntrumentStore()
    const selectInstrumentSpy = vi.spyOn(store, 'selectInstrument')

    const wrapper = mount(InstrumentItemComponent, {
      props: {
        instrument: mockInstrument
      }
    })

    // Simular clic en el componente
    await wrapper.find('.list-item').trigger('click')

    // Verificar que se llamó a selectInstrument con el instrumento correcto
    expect(selectInstrumentSpy).toHaveBeenCalledWith(mockInstrument)
  })

  it('formatea correctamente los números', () => {
    const wrapper = mount(InstrumentItemComponent, {
      props: {
        instrument: {
          ...mockInstrument,
          lastPrice: 1234.5678,
          pctDay: 0.123456
        }
      }
    })

    // Verificar el formato de números
    expect(wrapper.text()).toContain('1234.57')
    expect(wrapper.text()).toContain('0.12%')
  })
})
