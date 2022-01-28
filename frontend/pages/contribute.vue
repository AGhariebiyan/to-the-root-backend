<template>
  <BasePageLayout>
    <div class="contribute-wrapper">
      <div class="wrapper">
        <h1>Contribute</h1>

        <p>We're working on this...</p>

        <form ref="form" class="mailing-form" @submit.prevent="sendEmail">
          <ul class="mailing-form__error-list">
            <li
              class="mailing-form__error"
              v-for="error in errors"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
          <div>
            <textarea class="mailing-form__email" v-model="email" />
          </div>
          <div>
            <button type="submit">Keep me updated</button>
          </div>
        </form>
      </div>
    </div>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@nuxtjs/composition-api'
import emailjs from '@emailjs/browser'
// const emailServiceId = process.env.EMAILJS_SERVICE_ID
// const emailTemplateId = process.env.EMAILJS_TEMPLATE_ID
// const emailUserId = process.env.EMAILJS_USER_ID

export default defineComponent({
  setup() {
    const email = ref('')
    const errors: Ref<string[]> = ref([])

    async function sendEmail() {
      errors.value = []

      if (email.value.trim() === '') {
        errors.value.push('Enter a valid email address!')
        return
      }

      const templateParams = {
        interest: 'Contribute',
        email: email.value,
      }

      emailjs
        .send(
          'service_hc5nyhf',
          'template_mailing_list',
          templateParams,
          'user_lvX2tiz33iKi07vdvM7a4',
        )
        .then(
          (result) => {
            console.log('SUCCESS!', result.text)
          },
          (error) => {
            console.log('FAILED...', error.text)
          },
        )
    }

    return {
      email,
      sendEmail,
      errors,
    }
  },
})
</script>

<style lang="scss" scoped>
.contribute-wrapper {
  background: linear-gradient(
      0deg,
      rgba($accelerate-blue-primary, 0.5),
      rgba($accelerate-blue-primary, 0.5)
    ),
    url('https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2420&q=80');
  background-size: cover;
  height: 100vh;
}

.wrapper {
  background: crimson;
  padding: 150px;
  max-width: 630px;
  height: 100%;
  margin: 0 auto;
  justify-content: center;

  text-align: center;
}

.mailing-form {
  &__error {
    margin: 1rem 0;
    color: red;
  }
}
</style>
