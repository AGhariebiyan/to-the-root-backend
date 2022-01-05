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
            v-model.trim="newPassword1"
            class="form__input"
            minlength="10"
          />
          <label class="form__label" for="password2">Confirm password</label>
          <input
            type="password"
            id="password2"
            placeholder="Enter the password again"
            v-model.trim="newPassword2"
            class="form__input"
            minlength="10"
          />
          <p
            :class="{
              'form__error-message': newPassword1 && passwordValidationError,
            }"
          >
            {{ passwordValidationError }}
          </p>
          <p class="form__error-message" v-if="error">{{ error }}</p>
          <BaseButton
            buttonType="primary"
            class="reset-password__submit"
            :disabled="isResetClicked"
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

export default defineComponent({
  setup() {
    const { $auth, $axios, $strapi, query } = useContext()
    const newPassword1 = ref('')
    const newPassword2 = ref('')
    const isPassword1Valid = computed(() => {
      return newPassword1.value.length >= 10
    })
    const isPassword2Valid = computed(() => {
      return newPassword2.value === newPassword1.value
    })
    const isResetClicked = ref(false)
    const error = ref('')
    const router = useRouter()
    const passwordValidationError = computed(() => {
      if (!isPassword1Valid.value) {
        return 'Please enter a valid password. Your password needs to be a minimum of 10 characters long.'
      }

      if (!isPassword2Valid.value) {
        return "The passwords don't match!"
      }
    })

    async function resetPassword() {
      if (!isPassword1Valid || !isPassword2Valid) {
        return
      }
      // Request API.
      try {
        isResetClicked.value = true
        await $axios.post(`${$strapi.options.url}/auth/reset-password`, {
          code: query.value.code, // code contained in the reset link of step 3.
          password: newPassword1.value,
          passwordConfirmation: newPassword2.value,
        })
        await $auth.logout()
        router.push('/login')
      } catch (err: any) {
        error.value = errorMessageFromResponse(err)
        isResetClicked.value = false
        return
      }
    }

    return {
      newPassword1,
      newPassword2,
      resetPassword,
      isPassword1Valid,
      isPassword2Valid,
      error,
      passwordValidationError,
      isResetClicked,
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
