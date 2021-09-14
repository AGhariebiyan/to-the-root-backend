import { shallowMount, Wrapper } from '@vue/test-utils'
import BaseContainer from './BaseContainer.vue'

let wrapper: Wrapper<Vue>

afterEach(() => {
  wrapper.destroy()
})

describe('Base container', () => {
  test('is a Vue instance', () => {
    wrapper = shallowMount(BaseContainer, {
      propsData: { containerType: 'color' },
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('has class to add a background color to the container', () => {
    wrapper = shallowMount(BaseContainer, {
      propsData: { containerType: 'color' },
    })
    expect(wrapper.attributes().class).toContain('container--color')
  })

  test('always contains a container__inner div', () => {
    wrapper = shallowMount(BaseContainer, {
      propsData: {},
    })
    expect(wrapper.find('.container__inner').exists()).toBe(true)
  })
})
