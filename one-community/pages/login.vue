<template>
  <BaseContainer>
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
    <div class="github">
      <button @click="loginWithGithub">Login with Github</button>
    </div>
    <a href="http://dd29726e86d3.ngrok.io/connect/github">Github with link</a>
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
        error.value = errorMessage
      }
    }

    async function loginWithGithub() {
      console.log('before loginwith')
      const response = await $auth.loginWith('github')
      console.log('after loginwith')
    }

    return {
      error,
      identifier,
      isLoggedIn,
      loginUser,
      loginWithGithub,
      password,
      resetError,
    }
  },
})
</script>

<style lang="scss" scoped>
.btn {
  padding: 0.5rem 1rem;
  cursor: pointer;
  &-secondary {
    background-color: transparent;
    border: none;
    & > a {
      &:link,
      &:visited {
        color: black;
        text-decoration: none;
      }
    }
  }
  &:hover {
    text-decoration: underline;
  }
}
</style>
