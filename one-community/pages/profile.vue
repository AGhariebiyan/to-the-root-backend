<template>
  <BaseContainer>
    <h1>Logged in as {{ $auth.user.username }}</h1>

    <button class="login-box__logout" @click="logout">Logout</button>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { $auth } = useContext()

    // Logout
    async function logout() {
      try {
        await $auth.logout()
      } catch {}
    }

    return { logout }
  },
})
</script>

<style lang="scss" scoped></style>
