import '~/test/jest.setup'
import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import LoginBox from './LoginBox.vue'

let wrapper: Wrapper<Vue>
const logoutHandler = jest.fn()

const nuxtMock = (isLoggedIn: boolean) => ({
  context: {
    $auth: {
      logout: logoutHandler,
      $state: {
        loggedIn: isLoggedIn,
      },
    },
  },
})

describe('User is not logged in', () => {
  beforeEach(() => {
    wrapper = shallowMount(LoginBox, {
      stubs: {
        BaseButton: { template: '<button><slot /></button>' },
        NuxtLink: { template: '<a><slot /></a>' },
      },
      mocks: {
        $nuxt: nuxtMock(false),
        $route: { name: 'login' },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('Component is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('Component shows a link to the login page', () => {
    wrapper = mount(LoginBox, {
      stubs: {
        BaseButton: { template: '<button><slot /></button>' },
        NuxtLink: { template: '<a><slot /></a>' },
      },
      mocks: {
        $nuxt: nuxtMock(false),
        $route: { params: { name: 'home' } },
      },
    })

    expect(wrapper.find('[to="/login"]').exists()).toBe(true)
  })

  test("Component doesn't show a link to the login page", () => {
    expect(wrapper.find('[to="/login"]').exists()).toBe(false)
  })

  test('Component shows a link to the signup page', () => {
    expect(wrapper.find('[to="/signup"]').exists()).toBe(true)
  })
})

describe('User is logged in', () => {
  beforeEach(() => {
    wrapper = shallowMount(LoginBox, {
      stubs: {
        BaseButton: { template: '<button><slot /></button>' },
        NuxtLink: { template: '<a><slot /></a>' },
      },
      mocks: {
        $nuxt: nuxtMock(true),
        $auth: { user: { username: 'johndoe' } },
        $route: { params: { name: 'login' } },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('Component shows a logout button when user is logged in', () => {
    const logOutButton = wrapper.find('button.login-box__logout')
    expect(logOutButton.text()).toBe('Log out')
  })

  test('Component emits closeMobileMenu when logout button is clicked', () => {
    const emitted = wrapper.emitted()

    const logOutButton = wrapper.find('button.login-box__logout')
    logOutButton.trigger('click')

    expect(emitted.closeMobileMenu?.length).toBe(1)
  })

  test('Component logs the user out when logout button is clicked', () => {
    const logOutButton = wrapper.find('button.login-box__logout')
    logOutButton.trigger('click')

    expect(logoutHandler).toBeCalled()
  })

  test("Component shows a link to the user's profile", () => {
    const profileLink = wrapper.find('.login-box__link')
    expect(profileLink.attributes('to')).toBe('/profile')
  })
})
