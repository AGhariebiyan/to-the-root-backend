<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <p class="login-box__hello">Hello, {{ $auth.user.username }}</p>
      <button @click="logout">log me out</button>
    </template>
    <template v-else>
      <NuxtLink class="login-box__link" to="/login">Login</NuxtLink>
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
      console.log(result)
    }

    console.log($auth.user)
    return { $auth, isLoggedIn, logout }
  },
}
</script>

<style>
.login-box {
}
</style>
