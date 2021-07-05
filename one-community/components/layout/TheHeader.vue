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
  align-items: center;
  padding: 1rem;
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
  text-decoration: none;
  position: relative;
  &:not(:last-child) {
    margin-right: 2.5rem;
  }
  &:link,
  &:visited {
    color: $gray-darkest;
  }
}

.nuxt-link-exact-active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.1875rem;
  background-color: $ordina-orange;
  top: $default-font-size * 1.25;
  left: 0;
}
</style>
