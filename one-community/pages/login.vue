<template>
  <BaseContainer class="narrow-grid">
    <BaseForm @submit="loginUser">
      <h4 class="form__heading">Login</h4>
      <label class="form__label" for="identifier">Username or Email</label>
      <input
        class="form__input"
        type="text"
        name="identifier"
        id="identifier"
        @input="resetError"
        required
        :disabled="isLoggedIn"
        v-model="identifier"
      />

      <label class="form__label" for="password">Password</label>
      <input
        class="form__input"
        type="password"
        name="password"
        id="password"
        v-model="password"
        :disabled="isLoggedIn"
        @input="resetError"
        required
      />

      <p class="form__error-message" v-if="error">{{ error }}</p>

      <div class="form__buttons">
        <BaseButton
          class="form__button"
          buttonType="primary"
          type="submit"
          :disabled="isLoggedIn || error.length > 0"
        >
          Login
        </BaseButton>
        <NuxtLink class="form__button secondary-link" to="/signup"
          >Sign up instead</NuxtLink
        >
      </div>
    </BaseForm>
    <a :href="loginWithGithubUrl">Test</a>
  </BaseContainer>
</template>

<script lang="ts">
import {
  useContext,
  ref,
  defineComponent,
  computed,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'
import BaseForm from '../components/base/BaseForm.vue'
import BaseButton from '../components/base/BaseButton.vue'

export default defineComponent({
  name: 'PageLogin',

  components: { BaseForm, BaseButton },

  setup() {
    const { $axios, $auth } = useContext()
    const loginWithGithubUrl = `${process.env.STRAPI_URL}/connect/github`

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    const error = ref('')

    const identifier = ref('')
    const password = ref('')

    const validateLogin = computed(() => {
      return !!identifier.value && !!password.value
    })

    const resetInput = () => {
      identifier.value = ''
      password.value = ''
    }
    const resetError = () => {
      error.value = ''
    }
    async function loginUser() {
      if (!validateLogin.value) {
        return
      }
      error.value = ''
      try {
        await $auth.loginWith('local', {
          data: {
            identifier: identifier.value,
            password: password.value,
          },
        })

        resetInput()
      } catch (e) {
        const errorMessage = errorMessageFromResponse(e)
        error.value = errorMessage.replace('Identifier', 'Username or Email')
      }
    }

    return {
      error,
      identifier,
      isLoggedIn,
      loginUser,
      loginWithGithubUrl,
      password,
      resetError,
    }
  },
})
</script>

<style lang="scss" scoped></style>
