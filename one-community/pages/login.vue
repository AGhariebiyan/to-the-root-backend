<template>
  <BaseContainer>
    <BaseForm class="form" @submit="loginUser">
      <h1 class="heading">Login</h1>
      <label for="identifier">Username or Email</label>
      <input
        type="text"
        name="identifier"
        id="identifier"
        @input="resetError"
        required
        :disabled="isLoggedIn"
        v-model="identifier"
      />

      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        :disabled="isLoggedIn"
        @input="resetError"
        required
      />

      <p class="error-message" v-if="error">{{ error }}</p>

      <div class="buttons">
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="isLoggedIn || error.length > 0"
        >
          Login
        </button>
        <button class="btn btn-secondary">
          <NuxtLink class="login-box__link" to="/signup"
            >Sign up instead</NuxtLink
          >
        </button>
      </div>
    </BaseForm>
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

export default defineComponent({
  name: 'PageLogin',

  components: { BaseForm },

  setup() {
    const { $auth } = useContext()

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    const error = ref('')
    const isLoading = ref(false)

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
      isLoading.value = true
      try {
        await $auth.loginWith('local', {
          data: {
            identifier: identifier.value,
            password: password.value,
          },
        })
        setTimeout(() => {
          isLoading.value = false
        }, 5000)

        resetInput()
      } catch (e) {
        const errorMessage = errorMessageFromResponse(e)
        error.value = errorMessage
        isLoading.value = false
      }
    }

    return {
      error,
      identifier,
      isLoggedIn,
      loginUser,
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
