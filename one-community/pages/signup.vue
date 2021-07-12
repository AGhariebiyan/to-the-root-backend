<template>
  <BaseContainer>
    <h1 class="heading">Sign up</h1>
    <form class="form" @submit.prevent="registerUser">
      <div class="form-input">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username" />
      </div>

      <div class="form-input">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email" />
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>

      <button class="btn btn-primary" type="submit">Sign up</button>
      <NuxtLink class="login-box__link" to="/login">Log in instead</NuxtLink>
    </form>
  </BaseContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'

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

    const resetRegisterValues = () => {
      username.value = ''
      email.value = ''
      password.value = ''
    }

    async function registerUser() {
      try {
        if (!validateRegister.value) {
          // TODO show errors / toast
          return
        }
        await $axios.post('/auth/local/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        })

        const loginResult = await $auth.loginWith('local', {
          data: {
            identifier: username.value,
            password: password.value,
          },
        })

        resetRegisterValues()

        console.log(loginResult)
      } catch (e) {
        error.value = e.response.data.message[0].messages[0].message
      }
      // TODO show error message
    }

    return {
      email,
      password,
      registerUser,
      username,
    }
  },
})
</script>

<style lang="scss" scoped></style>
