import { shallowMount, Wrapper } from '@vue/test-utils'
import BaseCard from './BaseCard.vue'

let wrapper: Wrapper<Vue, Element>

afterEach(() => {
  wrapper.destroy()
})

describe('Base card', () => {
  wrapper = shallowMount(BaseCard, { propsData: { cardType: 'article' } })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('renders the correct class name', () => {
    wrapper = shallowMount(BaseCard, { propsData: { cardType: 'article' } })
    const className = wrapper.attributes('class')
    expect(className).toContain('article')
  })

  test('is not valid when using no card type', () => {
    let wrapper: Wrapper<Vue, Element> = shallowMount(BaseCard)
    const props = wrapper?.vm?.$options?.props as {
      cardType: { validator: (a?: string) => boolean }
    }

    const cardType = props.cardType

    expect(cardType.validator()).toBeFalsy()
  })

  test('throws an error when using wrong card type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    let wrapper = shallowMount(BaseCard, { propsData: { cardType: 'a' } })

    expect(spy).toBeCalled()
    spy.mockRestore()
  })
})
