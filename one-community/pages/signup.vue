<template>
  <BaseContainer>
    <BaseForm class="form" @submit="registerUser">
      <h1 class="heading">Sign up</h1>

      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="username"
        @input="resetError"
        required
      />

      <label for="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        v-model="email"
        @input="resetError"
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        @input="resetError"
        required
      />

      <p class="error-message" v-if="error">{{ error }}</p>

      <div class="buttons">
        <button class="btn btn-primary" type="submit">Sign up</button>
        <NuxtLink class="login-box__link" to="/login">Log in instead</NuxtLink>
      </div>
    </BaseForm>
  </BaseContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'

export default defineComponent({
  setup() {
    const email = ref('')
    const error = ref('')
    const username = ref('')
    const password = ref('')

    const { $auth, $axios } = useContext()

    const validatePassword = function () {
      return true
    }

    const validateRegister = computed(() => {
      return !!email.value && !!username.value && validatePassword()
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

        await $auth.loginWith('local', {
          data: {
            identifier: username.value,
            password: password.value,
          },
        })

        resetInput()
      } catch (e) {
        error.value = errorMessageFromResponse(e)
      }
    }

    return {
      email,
      error,
      password,
      registerUser,
      resetError,
      username,
    }
  },
})
</script>

<style lang="scss" scoped></style>
