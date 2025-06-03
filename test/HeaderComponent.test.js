import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HeaderComponent from '../src/components/HeaderComponent.vue'
import { useIntrumentStore } from '../src/stores/intruments'

describe('HeaderComponent', () => {
  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada prueba
    setActivePinia(createPinia())
  })

  it('muestra los datos del IPSA correctamente', async () => {
    const store = useIntrumentStore()
    const mockData = {
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
          pctRelCY: 5.2
        }
      }
    }

    // Mock de la respuesta del fetch para IPSA
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    })

    // Llamar a fetchIpsa antes de montar el componente
    await store.fetchIpsa()
    const wrapper = mount(HeaderComponent)
    await wrapper.vm.$nextTick()

    // Verificar que los datos se muestran correctamente
    expect(wrapper.text()).toContain('IPSA')
    expect(wrapper.text()).toContain('6000.50')
    expect(wrapper.text()).toContain('1.50%')
    expect(wrapper.text()).toContain('2.30%')
    expect(wrapper.text()).toContain('5.20%')
  })

  it('muestra los datos del instrumento seleccionado', async () => {
    const store = useIntrumentStore()
    const wrapper = mount(HeaderComponent)

    // Mock de la respuesta del fetch para un instrumento
    global.fetch = vi.fn().mockResolvedValue({
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
            lastPrice: 1000.25,
            performanceRelative: -0.5,
            pct30D: 1.2,
            pctRelCY: 3.4
          }
        }
      })
    })

    // Simular la selección de un instrumento
    await store.selectInstrument({
      name: 'Banco de Chile',
      shortName: 'CHILE',
      codeInstrument: 'CHILE'
    })

    // Esperar a que se actualice el componente
    await wrapper.vm.$nextTick()

    // Verificar que los datos del instrumento se muestran
    expect(wrapper.text()).toContain('Banco de Chile')
    expect(wrapper.text()).toContain('1000.25')
    expect(wrapper.text()).toContain('-0.50%')
    expect(wrapper.text()).toContain('1.20%')
    expect(wrapper.text()).toContain('3.40%')
  })

  it('aplica las clases correctas para valores positivos y negativos', async () => {
    const wrapper = mount(HeaderComponent)
    const store = useIntrumentStore()

    // Establecer datos con valores positivos y negativos
    store.selectedInstrument = {
      name: 'Test',
      lastPrice: 100,
      performanceRelative: 1.5,
      pct30D: -2.3,
      pctCY: 0
    }

    await wrapper.vm.$nextTick()

    // Verificar las clases CSS
    expect(wrapper.find('.text-positive').exists()).toBe(true)
    expect(wrapper.find('.text-negative').exists()).toBe(true)
  })
})
