import '~/test/jest.setup'
import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Reset from './reset.vue'
import Vue from 'vue'

type ResetComponent = Vue & { resetPassword?: () => Promise<void> }

let wrapper: Wrapper<ResetComponent>
const logoutHandler = jest.fn()
const axiosPostHandler = jest.fn()

describe('User is not logged in', () => {
  beforeEach(() => {
    wrapper = mount(Reset, {
      stubs: {
        NuxtLink: true,
        BaseForm: true,
        BasePageLayout: true,
        BaseContainer: true,
      },
      mocks: {
        $nuxt: {
          context: {
            $strapi: { options: { url: 'http://127.0.0.1' } },
            $axios: { post: axiosPostHandler },
            $auth: { logout: logoutHandler },
          },
        },
        $route: { name: 'login', query: { code: '1234567890' } },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('Component is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test("Password 1 isn't valid when too short", () => {
    wrapper.setData({
      newPassword1: 'welkom01',
    })

    expect(wrapper.vm.$data.isPassword1Valid).toBe(false)
  })

  test("Error is given when password 1 isn't long enough", () => {
    wrapper.setData({
      newPassword1: 'welkom01',
    })

    expect(wrapper.vm.$data.passwordValidationError).toBe(
      'Please enter a valid password. Your password needs to be a minimum of 10 characters long.',
    )
  })

  test("Password 2 isn't valid when not equal to password 1", () => {
    wrapper.setData({
      newPassword1: 'welkom01',
      newPassword2: 'qwertyuiopqwertyuiop',
    })

    expect(wrapper.vm.$data.isPassword2Valid).toBe(false)
  })

  test("Error is given when passwords don't match", () => {
    wrapper.setData({
      newPassword1: 'welkombijordina01',
      newPassword2: 'welkombijordina02',
    })

    expect(wrapper.vm.$data.passwordValidationError).toBe(
      "The passwords don't match!",
    )
  })

  test('Passwords and reset code are being send to strapi', async () => {
    wrapper.setData({
      newPassword1: 'welkombijordina01',
      newPassword2: 'welkombijordina01',
    })

    wrapper.vm.resetPassword && (await wrapper.vm.resetPassword())

    const resetUrl = 'http://127.0.0.1/auth/reset-password'
    const postData = {
      code: '1234567890',
      password: 'welkombijordina01',
      passwordConfirmation: 'welkombijordina01',
    }
    expect(axiosPostHandler).toBeCalledWith(resetUrl, postData)
  })

  test('User is being logged out after resetting password', async () => {
    wrapper.setData({
      newPassword1: 'welkombijordina01',
      newPassword2: 'welkombijordina01',
    })

    wrapper.vm.resetPassword && (await wrapper.vm.resetPassword())

    expect(logoutHandler).toBeCalled()
  })
})
