import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TabComponent from '../src/components/TabComponent.vue'

describe('TabComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza correctamente las pestañas', () => {
    const wrapper = mount(TabComponent)

    // Verificar que se renderizan las pestañas
    const tabs = wrapper.findAll('.q-tab')
    expect(tabs.length).toBeGreaterThan(0)
  })

  it('emite evento al hacer clic en una pestaña', async () => {
    const wrapper = mount(TabComponent, {
      props: {
        modelValue: 'ipsa'
      }
    })

    // Debug para ver el HTML generado
    console.log('Wrapper HTML:', wrapper.html())
    console.log('Tabs:', wrapper.findAll('.q-tab').map(tab => ({ name: tab.attributes('name'), class: tab.classes() })))

    // Obtener la pestaña IPSA
    const ipsaTab = wrapper.find('.q-tab:not(.disabled)')
    expect(ipsaTab.find('.q-tab__label').text()).toBe('IPSA')

    // Simular clic
    await ipsaTab.trigger('click')
    await wrapper.vm.$nextTick()

    // Verificar que se emitió el evento
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['ipsa'])
  })

  it('mantiene la pestaña activa resaltada', async () => {
    const wrapper = mount(TabComponent, {
      props: {
        modelValue: 'ipsa'
      }
    })

    await wrapper.vm.$nextTick()

    // Verificar que la pestaña activa tiene la clase correcta
    const activeTab = wrapper.find('.q-tab--active .q-tab__label')
    expect(activeTab.text()).toBe('IPSA')
    expect(activeTab.element.closest('.q-tab').classList.contains('q-tab--active')).toBe(true)
  })
})
