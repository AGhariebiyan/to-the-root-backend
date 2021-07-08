<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <p class="login-box__hello">Hello, {{ $auth.user.username }}</p>
      <button class="login-box__logout" @click="logout">Log out</button>
    </template>

    <template v-else>
      <button>
        <NuxtLink class="login-box__link" to="/login">Login</NuxtLink>
      </button>
      <button>
        <NuxtLink class="login-box__link" to="/register">Sign up</NuxtLink>
      </button>
    </template>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
export default {
  setup() {
    const { $auth } = useContext()
    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    // Logout
    async function logout() {
      const result = await $auth.logout()
    }

    return { $auth, isLoggedIn, logout }
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__hello {
    margin-right: 0.5rem;
  }

  &__logout {
    cursor: pointer;
  }
}
</style>
