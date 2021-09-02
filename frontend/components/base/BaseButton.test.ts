import { shallowMount, Wrapper } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

let wrapper: Wrapper<Vue>

beforeEach(() => {
  wrapper = shallowMount(BaseButton, {
    propsData: {
      buttonType: 'primary',
    },
    mocks: {},
    stubs: {},
    methods: {},
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Base button', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('renders the correct class name', () => {
    const className = wrapper.attributes('class')
    expect(className).toContain('primary')
  })

  test('throws an error when using no button type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    let wrapper = shallowMount(BaseButton)

    expect(spy).toBeCalled()
    spy.mockRestore()
  })

  test('throws an error when using wrong button type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    let wrapper = shallowMount(BaseButton, { propsData: { buttonType: 'a' } })

    expect(spy).toBeCalled()
    spy.mockRestore()
  })
})
