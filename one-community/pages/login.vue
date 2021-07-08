<template>
  <BaseContainer>
    <template v-if="isLoggedIn">
      <p>already logged in! redirect to profile!</p>
    </template>
    <template v-else>
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
        <button class="btn btn-secondary" @click="goTo('signup')">
          Sign up instead
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
  useStore,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'

export default defineComponent({
  setup() {
    const store = useStore()
    const { $auth, redirect } = useContext()
    const error = ref('')

    const identifier = ref('')
    const password = ref('')

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    const validateLogin = computed(() => {
      return !!identifier.value && !!password.value
    })

    const resetLoginValues = () => {
      identifier.value = ''
      password.value = ''
    }
    async function loginUser() {
      error.value = ''
      try {
        const test = await $auth.loginWith('local', {
          data: {
            identifier: identifier.value,
            password: password.value,
          },
        })

        console.log(test)
        // this.$router.push('/')
      } catch (e) {
        error.value = e.response.data.message[0].messages[0].message
      }
    }

    function goTo(page) {
      redirect(`/${page}`)
    }

    return {
      goTo,
      identifier,
      isLoggedIn,
      loginUser,
      password,
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
  cursor: pointer;
  &-secondary {
    background-color: transparent;
    border: none;
  }
  &:hover {
    text-decoration: underline;
  }
}
</style>
