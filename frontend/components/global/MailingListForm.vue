<template>
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
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  Ref,
  useContext,
} from '@nuxtjs/composition-api'
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

      if (!emailServiceId || !emailTemplateId || !emailUserId) {
        alert('emailJS process variables not defined! Contact the admin.')
        return
      }

      isLoading.value = true

      emailjs
        // .send(
        //     'service_hc5nyhf',
        //     'template_mailing_list',
        //     templateParams,
        //     'user_lvX2tiz33iKi07vdvM7a4',

        // )
        .send(emailServiceId, emailTemplateId, templateParams, emailUserId)
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

    function validateEmail(email: any) {
      return String(email)
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
.mailing-form {
  &__email {
    input {
      width: 300px;
      padding: 10px 10px;
      margin: 8px 0 30px;
      box-sizing: border-box;
      border: none;
      background-color: $discovery-blue-primary;
      color: $white;
      text-align: center;

      &:focus {
        border-bottom: 4px solid $ordina-orange;
        padding: 8px 10px;
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
</style>