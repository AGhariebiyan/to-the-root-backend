<template>
  <BaseContainer>
    <template v-if="isRegistering">
      <h1>Register</h1>
      <form class="login-form" @submit.prevent="registerUser">
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

        <button type="submit">Register</button>
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
    const isRegistering = ref(true)

    const validatePassword = function () {
      return true
    }

    const validateUser = computed(() => {
      return !!email.value && !!username.value && validatePassword()
    })

    const { $axios } = useContext()
    function registerUser() {
      if (!validateUser.value) {
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

    return { email, username, password, registerUser, isRegistering }
  },
})
</script>

<style lang="scss" scoped>
.login-form {
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
</style>
