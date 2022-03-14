import { shallowMount, Wrapper } from '@vue/test-utils'
import LoginSocials from './LoginSocials.vue'

let wrapper: Wrapper<Vue>

afterEach(() => {
  wrapper.destroy()
})

describe('Login socials', () => {
  beforeEach(() => {
    wrapper = shallowMount(LoginSocials, {
      propsData: {
        dividerText: 'Lorem ipsum',
      },
      mocks: {
        $nuxt: {
          context: {
            $config: { strapiUrl: 'http://127.0.0.1:1234' },
          },
        },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('contains a valid github login url', () => {
    const loginLink = wrapper.find('.auth-providers__link')
    expect(loginLink.attributes('href')).toBe(
      'http://127.0.0.1:1234/connect/github',
    )
  })

  test('shows a divider text from prop', () => {
    const divider = wrapper.find('.divider__text')
    expect(divider.text()).toBe('Lorem ipsum')
  })
})
