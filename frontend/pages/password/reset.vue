<template>
  <BasePageLayout>
    <BaseContainer>
      <BaseForm @submit="resetPassword">
        <template v-slot:form>
          <h3>Reset password</h3>
          <label class="form__label" for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            v-model.trim="newPassword"
            class="form__input"
            @blur="validateInput"
            minlength="8"
            maxlength="30"
          />
          <p
            class="form__error-message"
            v-if="newPasswordValidity === 'invalid'"
          >
            Please enter a valid password. Your password needs to be between 8
            and 30 characters long and contain one uppercase letter, one symbol,
            and a number.
          </p>
          <input
            type="password"
            name="password"
            placeholder="Enter the password again"
            v-model.trim="newPassword2"
            class="form__input"
            @blur="validateInput"
            minlength="8"
            maxlength="30"
          />
          <p
            class="form__error-message"
            v-if="!arePasswordsMatching() && newPassword2.length > 0"
          >
            The passwords don't match!
          </p>
          <p class="form__error-message" v-if="error">{{ error }}</p>
          <BaseButton buttonType="primary">Reset password</BaseButton>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '~/utils/helpers'

export default defineComponent({
  setup() {
    const { $axios, $strapi, query } = useContext()
    const newPassword = ref('')
    const newPassword2 = ref('')
    let newPasswordValidity = 'pending'
    const error = ref('')
    const router = useRouter()

    async function resetPassword() {
      if (!arePasswordsMatching()) {
        return
      }
      // Request API.
      try {
        await $axios.post(`${$strapi.options.url}/auth/reset-password`, {
          code: query.value.code, // code contained in the reset link of step 3.
          password: newPassword.value,
          passwordConfirmation: newPassword2.value,
        })
        console.log('redirect please')
        router.push('/login')
      } catch (err) {
        error.value = errorMessageFromResponse(err)
        console.log('An error occurred: ', errorMessageFromResponse(err))
        return
      }
    }

    function arePasswordsMatching() {
      return newPassword.value === newPassword2.value
    }

    function validateInput() {
      if (newPassword.value === '') {
        newPasswordValidity = 'invalid'
      } else {
        newPasswordValidity = 'valid'
      }
    }

    return {
      newPassword,
      newPassword2,
      resetPassword,
      validateInput,
      newPasswordValidity,
      arePasswordsMatching,
      error,
    }
  },
})
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 1rem;
}
button {
  margin-top: 1rem;
}
.form-wrapper {
  width: 50vw;
  @include respond(tab-landscape) {
    width: 80vw;
  }
}
</style>
