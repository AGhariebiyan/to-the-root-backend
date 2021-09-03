import { mount, Wrapper } from '@vue/test-utils'
import BaseForm from './BaseForm.vue'

let wrapper: Wrapper<Vue>

afterEach(() => {
  wrapper.destroy()
})

describe('Base form', () => {
  beforeEach(() => {
    wrapper = mount(BaseForm, {
      slots: {
        form: '<button type="submit">Submit</button>',
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('the submit event will not reload the page', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
