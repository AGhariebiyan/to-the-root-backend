<template>
  <p v-if="isLoading">hold on...</p>

  <h3 v-else-if="hasSubscribed">You're on the list!</h3>

  <form
    v-else
    ref="form"
    class="mailing-form"
    @submit.prevent="applyForMailingList"
  >
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
import { defineComponent, ref, Ref, useContext } from '@nuxtjs/composition-api'
import { validateEmail, sendEmail } from '~/utils/email'

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

    const initialEmailValue: string =
      $auth.user?.email !== undefined ? String($auth.user?.email) : ''
    const email: Ref<string> = ref(initialEmailValue)
    const errors: Ref<string[]> = ref([])
    const isLoading = ref(false)
    const hasSubscribed = ref(false)

    async function applyForMailingList() {
      errors.value = []

      if (email.value.trim() === '') {
        errors.value.push('Please enter your email address')
        return
      }

      if (!validateEmail(email.value)) {
        errors.value.push('Please enter a valid email address')
        return
      }

      isLoading.value = true

      const templateParams = {
        interest: props.interest,
        email: email.value,
      }

      const emailResponse = await sendEmail(
        'template_mailing_list',
        templateParams,
      )

      if (emailResponse) {
        if (emailResponse.status === 200) {
          hasSubscribed.value = true
        } else {
          errors.value.push(`Something went wrong: ${emailResponse.text}`)
        }
      }

      isLoading.value = false
    }

    return {
      email,
      applyForMailingList,
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