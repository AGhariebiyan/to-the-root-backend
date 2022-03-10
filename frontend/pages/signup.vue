<template>
  <BasePageLayout>
    <BaseContainer containerType="narrow">
      <h2 class="signup__title">Sign up</h2>

      <BaseForm v-if="!isRegistrationComplete" @submit="registerUser">
        <template v-slot:socials>
          <LoginSocials divider-text="Or signup with email" />
        </template>

        <template v-slot:form>
          <label class="form__label" for="username">Username</label>
          <input
            class="form__input"
            type="text"
            name="username"
            id="username"
            v-model="username"
            @input="resetError"
            required
          />

          <label class="form__label" for="email">Email</label>
          <input
            class="form__input"
            type="text"
            name="email"
            id="email"
            v-model="email"
            @input="resetError"
            required
          />

          <label class="form__label" for="password">Password</label>
          <input
            class="form__input"
            type="password"
            name="password"
            id="password"
            v-model="password"
            required
            minlength="10"
          />

          <p
            :class="{
              'form__error-message': password && passwordValidationError,
            }"
          >
            {{ passwordValidationError }}
          </p>

          <p class="form__error-message" v-if="error">{{ error }}</p>

          <div class="form__buttons">
            <button class="btn btn-primary form__button" type="submit">
              Sign up
            </button>
            <NuxtLink
              class="form__button button-link button-link--transparent"
              to="/login"
              >Login instead</NuxtLink
            >
          </div>
        </template>
      </BaseForm>

      <BaseForm v-else>
        <template #form>
          <h3 class="email-verification-pending__header">
            Thank you for signing up!
          </h3>
          <p class="email-verification-pending__paragraph">
            Please verify your email address before logging in.
          </p>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse, composePageTitle } from '@/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    useMeta(() => ({ title: composePageTitle('Sign up') }))

    const email = ref('')
    const error = ref('')
    const username = ref('')
    const password = ref('')
    const passwordValidationError = computed(() => {
      if (!isPasswordValid.value) {
        return 'Please enter a valid password. Your password needs to be a minimum of 10 characters long.'
      }
    })
    const isRegistrationComplete = ref(false)
    const isPasswordValid = computed(() => {
      return password.value.length >= 10
    })

    const { $auth, $axios } = useContext()

    const validateRegister = computed(() => {
      return !!email.value && !!username.value && isPasswordValid
    })

    const resetInput = () => {
      username.value = ''
      email.value = ''
      password.value = ''
    }

    const resetError = () => {
      error.value = ''
    }

    async function registerUser() {
      try {
        if (!validateRegister.value) {
          return
        }
        await $axios.post('/auth/local/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        })

        isRegistrationComplete.value = true
        resetInput()
      } catch (e: any) {
        error.value = errorMessageFromResponse(e)
      }
    }

    return {
      isRegistrationComplete,
      email,
      error,
      password,
      registerUser,
      resetError,
      username,
      isPasswordValid,
      passwordValidationError,
    }
  },
})
</script>

<style lang="scss" scoped>
.signup__title {
  margin-bottom: 2rem;
}

.email-verification-pending {
  &__header {
    margin-bottom: 1rem;
  }
}
</style>
