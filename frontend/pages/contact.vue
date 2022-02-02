<template>
  <BasePageLayout>
    <BaseContainer containerType="narrow">
      <h2 class="contact__title">Get in touch</h2>
      <p class="contact__paragraph">
        Have you got questions about this project? Ask them in the form below.
        We’d love to get your feature requests! We always appreciate
        constructive feedback as well.
      </p>

      <BaseForm @submit="sendMessage">
        <template v-slot:form>
          <p v-if="isLoading">hold on...</p>

          <h3 v-else-if="hasSentMessage">Your message has been sent!</h3>

          <div v-else>
            <p class="form__heading">Let's talk</p>

            <ul class="error-list">
              <li v-for="(error, index) in errors" :key="index" class="error">
                {{ error }}
              </li>
            </ul>

            <label class="form__label" for="firstname">First name*</label>
            <input
              class="form__input"
              type="text"
              name="firstname"
              v-model="firstName"
            />

            <label class="form__label" for="lastname">Last name</label>
            <input
              class="form__input"
              type="text"
              name="lastname"
              v-model="lastName"
            />

            <label class="form__label" for="email">Email address*</label>
            <input
              class="form__input"
              type="text"
              name="email"
              v-model="email"
            />

            <label class="form__label" for="message">Message*</label>
            <textarea
              class="form__input contact__textarea"
              type="text"
              name="message"
              v-model="message"
            ></textarea>

            <div class="contact__accept">
              <input type="checkbox" name="accept" v-model="accept" />
              <label for="accept"
                >I allow Ordina to store my email address and send me
                communications (no spam, we promise!)</label
              >
            </div>

            <BaseButton buttonType="primary" class="contact__submit-button"
              >Send message</BaseButton
            >
          </div>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, useContext } from '@nuxtjs/composition-api'
import { validateEmail, sendEmail } from '~/utils/email'

export default defineComponent({
  setup() {
    const { $auth } = useContext()

    const firstName = ref('')
    const lastName = ref('')
    const initialEmailValue: string =
      $auth.user?.email !== undefined ? String($auth.user?.email) : ''
    const email = ref(initialEmailValue)
    const message = ref('')
    const accept = ref(false)

    const errors: Ref<string[]> = ref([])

    const isLoading = ref(false)
    const hasSentMessage = ref(false)

    function sendMessage() {
      errors.value = []

      if (!firstName.value.trim().length) {
        errors.value.push('Please enter your first name')
      }

      if (!validateEmail(email.value)) {
        errors.value.push('Please enter a valid email address')
      }

      if (!message.value.trim().length) {
        errors.value.push('Please enter a message')
      }

      if (!accept.value) {
        errors.value.push('Please accept the terms and conditions')
      }

      if (errors.value.length) {
        return
      }

      const templateParams = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value,
      }

      isLoading.value = true

      sendEmail('template_contact_form', templateParams)
        .then((result) => {
          console.log('SUCCESS!', result)
          hasSentMessage.value = true
        })
        .catch((error) => {
          console.log('FAILED...', error)
          errors.value.push(`Something went wrong: ${error}`)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    return {
      firstName,
      lastName,
      email,
      message,
      accept,
      errors,
      isLoading,
      hasSentMessage,
      sendMessage,
    }
  },
})
</script>

<style lang="scss" scoped>
.contact {
  &__title {
    margin-bottom: 1rem;
  }

  &__paragraph {
    margin-bottom: 2rem;
  }
}

.contact__textarea {
  resize: vertical;
}

.contact__accept {
  display: flex;

  input {
    margin-right: 1rem;
    position: relative;
    top: 0.2rem;
  }
}

.contact__submit-button {
  margin-top: 2rem;
}
</style>
