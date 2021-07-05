<template>
  <header class="header">
    <div class="box logo">
      <img src="@/assets/Logo.svg" alt="Logo" />
    </div>
    <nav class="box nav-links">
      <NuxtLink class="nav-link" to="/">Community</NuxtLink>
      <NuxtLink class="nav-link" to="/content">Content</NuxtLink>
      <NuxtLink class="nav-link" to="/events">Events</NuxtLink>
      <NuxtLink class="nav-link" to="/contact">Get in touch</NuxtLink>
    </nav>
    <div class="box login-box">
      <span class="login">Login</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background-color: $gray-light;
}

.box {
  &:last-child {
    flex: 0 0 14rem;
    display: flex;
    justify-content: flex-end;
  }
}

.logo {
  flex: 0 0 14rem;
  margin-right: auto;
}

.nav-links {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.login {
}

.nav-link {
  padding: 0.5rem;
}

.nuxt-link-active {
  color: red;
}
</style>
