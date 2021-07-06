<template>
  <BaseContainer>
    <template v-if="isRegistering">
      <h1 class="heading">Register</h1>
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

        <button class="btn btn-primary" type="submit">Register</button>
        <button class="btn btn-secondary" @click="isRegistering = false">
          Log in
        </button>
      </form>
    </template>

    <template v-if="!isRegistering">
      <h1 class="heading">Login</h1>
      <form class="form" @submit.prevent="loginUser">
        <div class="form-input">
          <label for="identifier">Username or Email</label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            v-model="identifier"
          />
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

        <button class="btn btn-primary" type="submit">Login</button>
        <button class="btn btn-secondary" @click="isRegistering = true">
          Sign up
        </button>
      </form>
    </template>
  </BaseContainer>
</template>

<script lang="ts">
import {
  useContext,
  ref,
  defineComponent,
  computed,
  // useStore,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'

export default defineComponent({
  setup() {
    const email = ref('')
    const username = ref('')
    const password = ref('')
    const identifier = ref('')
    const isRegistering = ref(true)

    const validatePassword = function () {
      return true
    }

    const validateRegister = computed(() => {
      return !!email.value && !!username.value && validatePassword()
    })

    const validateLogin = computed(() => {
      return !!identifier.value && validatePassword()
    })

    const resetRegisterValues = () => {
      username.value = ''
      email.value = ''
      password.value = ''
    }
    const resetLoginValues = () => {
      identifier.value = ''
      password.value = ''
    }

    const { $axios } = useContext()
    function registerUser() {
      if (!validateRegister.value) {
        // TODO show errors / toast
        return
      }
      $axios
        .$post(`/auth/local/register`, {
          username: username.value,
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          // TODO store the token somewhere
          // TODO show logged in message and redirect
          resetRegisterValues()
          console.log(res)
        })
        .catch((err) => {
          // TODO show error message
          console.log(errorMessageFromResponse(err))
        })
    }

    function loginUser() {
      if (!validateLogin.value) {
        // TODO show errors / toast
        return
      }
      $axios
        .$post(`/auth/local`, {
          identifier: identifier.value,
          password: password.value,
        })
        .then((res) => {
          // TODO store the token somewhere
          // TODO show logged in message and redirect
          resetLoginValues()
          console.log(res)
        })
        .catch((err) => {
          // TODO show error message
          console.log(errorMessageFromResponse(err))
        })
    }
    // const store = useStore()
    // const registerUser = async function () {
    //   if (!validateUser) {
    //     return
    //   }
    //   const res = await store.dispatch('registerUser', {
    //     username: username.value,
    //     email: email.value,
    //     password: password.value,
    //   })
    //   console.log(res)
    // }

    return {
      email,
      identifier,
      isRegistering,
      loginUser,
      password,
      registerUser,
      username,
    }
  },
})
</script>

<style lang="scss" scoped>
.heading {
  align-self: flex-start;
}
.form {
  width: 20rem;
  padding: 1rem;
  border: 0.125rem solid $gray-dark;
  border-radius: 0.375rem;
  margin: 1rem 0;
}
.form-input {
  margin-bottom: 1rem;
}
input {
  width: 100%;
}
.btn {
  padding: 0.5rem 1rem;
}
</style>
