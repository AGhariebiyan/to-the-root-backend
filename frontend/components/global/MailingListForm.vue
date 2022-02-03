<template>
  <div class="oops-wrapper">
    <div class="wrapper">
      <slot></slot>

      <p v-if="isLoading">hold on...</p>

      <h3 v-else-if="hasSubscribed">You're on the list!</h3>

      <form v-else ref="form" class="mailing-form" @submit.prevent="sendEmail">
        <ul class="mailing-form error-list">
          <li class="mailing-form error" v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>

        <div class="mailing-form__email">
          <input
            type="text"
            placeholder="subscribe@totheroot.com"
            v-model="email"
          />
        </div>

        <div>
          <button class="new-button" :disabled="!email.length" type="submit">
            Keep me updated
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, useContext } from '@nuxtjs/composition-api'
import emailjs from '@emailjs/browser'
const emailServiceId = process.env.emailJSServiceID
const emailTemplateId = process.env.emailJSTemplateID
const emailUserId = process.env.emailJSUserID

export default defineComponent({
  name: 'MailingListForm',

  props: {
    interest: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $auth } = useContext()

    const initialEmailValue: string = String($auth.user?.email) ?? ''
    const email: Ref<string> = ref(initialEmailValue)
    const errors: Ref<string[]> = ref([])
    const isLoading = ref(false)
    const hasSubscribed = ref(false)

    async function sendEmail() {
      errors.value = []

      if (email.value.trim() === '') {
        errors.value.push('Please enter your email address')
        return
      }

      if (!validateEmail(email.value)) {
        errors.value.push('Please enter a valid email address')
        return
      }

      const templateParams = {
        interest: props.interest,
        email: email.value,
      }

      if (!emailServiceId || !emailUserId) {
        alert('emailJS process variables not defined! Contact the admin.')
        return
      }

      isLoading.value = true

      emailjs
        .send(
          emailServiceId,
          'template_mailing_list',
          templateParams,
          emailUserId,
        )
        .then(
          (result) => {
            console.log('SUCCESS!', result.text)
            hasSubscribed.value = true
          },
          (error) => {
            console.log('FAILED...', error.text)
            errors.value.push(`Something went wrong: ${error.text}`)
          },
        )
        .finally(() => {
          isLoading.value = false
        })
    }

    function validateEmail(email: string) {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    }

    return {
      email,
      sendEmail,
      errors,
      isLoading,
      hasSubscribed,
    }
  },
})
</script>

<style lang="scss" scoped>
.oops-wrapper {
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
  background: $accelerate-blue-primary;
  max-width: 630px;
  margin: 150px auto 0;
  padding: 50px;
  text-align: center;
  color: $white;

  p {
    padding: 30px 0;
  }
}

.mailing-form {
  &__email {
    input {
      width: 20rem;
      padding: 10px;
      margin: 8px 0 30px;
      border: none;
      background-color: $discovery-blue-primary;
      color: $white;
      text-align: center;
      border-left: 0 solid $ordina-orange;
      transition: all 0.2s ease;

      &:focus {
        border-left: 8px solid $ordina-orange;
        padding-left: 2px;
        outline: none;

        &::placeholder {
          color: transparent;
        }
      }

      &::placeholder {
        color: $gray;
      }
    }
  }
}

.error-list {
  margin: 0 auto;
  width: 300px;
}
</style>