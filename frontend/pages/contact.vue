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
          <div>
            <p class="form__heading">Let's talk</p>

            <ul class="error-list">
              <li v-for="(error, index) in errors" :key="index" class="error">
                {{ error }}
              </li>
            </ul>
            <ul class="warning-list">
              <li
                v-for="(warning, index) in warnings"
                :key="index"
                class="warning"
              >
                {{ warning }}
              </li>
            </ul>
            <ul class="success-list">
              <li
                v-for="(success, index) in successes"
                :key="index"
                class="success"
              >
                {{ success }}
              </li>
            </ul>

            <label class="form__label" for="firstname">First name*</label>
            <input
              :disabled="isLoading"
              class="form__input"
              type="text"
              name="firstname"
              v-model="firstName"
            />

            <label class="form__label" for="lastname">Last name</label>
            <input
              :disabled="isLoading"
              class="form__input"
              type="text"
              name="lastname"
              v-model="lastName"
            />

            <label class="form__label" for="email">Email address*</label>
            <input
              :disabled="isLoading"
              class="form__input"
              type="text"
              name="email"
              v-model="email"
            />

            <label class="form__label" for="message">Message*</label>
            <textarea
              :disabled="isLoading"
              class="form__input contact__textarea"
              type="text"
              name="message"
              v-model="message"
            ></textarea>

            <div class="contact__accept">
              <input
                :disabled="isLoading"
                type="checkbox"
                name="accept"
                v-model="accept"
              />
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
    const warnings: Ref<string[]> = ref([])
    const successes: Ref<string[]> = ref([])

    const isLoading = ref(false)
    const hasSentMessage = ref(false)

    async function sendMessage() {
      if (!validateForm()) return

      isLoading.value = true
      warnings.value.push('Sending message...')

      const templateParams = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value,
      }

      const emailResponse = await sendEmail(
        'template_contact_form',
        templateParams,
      )

      if (emailResponse) {
        if (emailResponse.status === 200) {
          hasSentMessage.value = true
          displaySuccessMessage()
        } else {
          errors.value.push(`Something went wrong: ${emailResponse.text}`)
        }
      }

      warnings.value = []
      isLoading.value = false
    }

    function validateForm() {
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

      if (errors.value.length) {
        return false
      }

      return true
    }

    function displaySuccessMessage() {
      successes.value.push('Your message has been sent!')
      setTimeout(() => {
        successes.value = []
      }, 3000)
    }

    return {
      firstName,
      lastName,
      email,
      message,
      accept,
      errors,
      warnings,
      successes,
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
