<template>
  <BasePageLayout>
    <BaseContainer>
      <BaseForm @submit="resetPassword">
        <template v-slot:form>
          <h3 class="reset-password__title">Reset password</h3>
          <label class="form__label" for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            v-model.trim="newPassword"
            class="form__input"
            @input="passwordValidation"
            minlength="8"
            :pattern="regex"
          />
          <label class="form__label" for="password2">Confirm password</label>
          <input
            type="password"
            id="password2"
            placeholder="Enter the password again"
            v-model.trim="newPassword2"
            class="form__input"
            @input="passwordValidation"
            minlength="8"
          />
          <p
            class="form__error-message"
            v-if="!isPasswordValid && passwordValidationError"
          >
            {{ passwordValidationError }}
          </p>
          <p class="form__error-message" v-if="error">{{ error }}</p>
          <BaseButton
            buttonType="primary"
            class="reset-password__submit"
            :disabled="isPasswordReset"
            >Reset password</BaseButton
          >
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
  computed,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '~/utils/helpers'
import { passwordRegex } from '~/utils/constants'

export default defineComponent({
  setup() {
    const { $axios, $strapi, query } = useContext()
    const newPassword = ref('')
    const newPassword2 = ref('')
    const isPasswordValid = computed(() => {
      return passwordValidation()
    })
    const isPasswordReset = ref(false)
    const error = ref('')
    const router = useRouter()
    const passwordValidationError = ref('')
    const regex = passwordRegex

    async function resetPassword() {
      if (!isPasswordValid.value || !passwordValidation()) {
        return
      }
      // Request API.
      try {
        isPasswordReset.value = true
        await $axios.post(`${$strapi.options.url}/auth/reset-password`, {
          code: query.value.code, // code contained in the reset link of step 3.
          password: newPassword.value,
          passwordConfirmation: newPassword2.value,
        })
        router.push('/login')
      } catch (err) {
        error.value = errorMessageFromResponse(err)
        isPasswordReset.value = false
        return
      }
    }

    function passwordValidation() {
      if (
        !newPassword.value.match(regex) ||
        !newPassword2.value.match(regex) ||
        newPassword.value === '' ||
        newPassword2.value === ''
      ) {
        passwordValidationError.value =
          'Please enter a valid password. Your password needs to be a minimum of 8 characters long and contain at least one uppercase letter, one lowercase letter, at least one symbol, and at least one number.'
        return false
      } else if (newPassword.value !== newPassword2.value) {
        passwordValidationError.value = "The passwords don't match!"
        return false
      } else {
        passwordValidationError.value = ''
        return true
      }
    }

    return {
      newPassword,
      newPassword2,
      resetPassword,
      isPasswordValid,
      passwordValidation,
      error,
      passwordValidationError,
      isPasswordReset,
      regex,
    }
  },
})
</script>

<style lang="scss" scoped>
.reset-password__title {
  margin-bottom: 1rem;
}
.reset-password__submit {
  margin-top: 1rem;
}
.form-wrapper {
  width: 50vw;
  @include respond(tab-landscape) {
    width: 80vw;
  }
}
</style>
