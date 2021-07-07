<template>
  <header class="header">
    <div class="logo">
      <NuxtLink class="logo__link" to="/">
        <img class="logo__image" src="@/assets/Logo.svg" alt="Logo" />
      </NuxtLink>
    </div>
    <nav class="nav-links">
      <NuxtLink class="nav-links__item" to="/">Community</NuxtLink>
      <NuxtLink class="nav-links__item" to="/content">Content</NuxtLink>
      <NuxtLink class="nav-links__item" to="/events">Events</NuxtLink>
      <NuxtLink class="nav-links__item" to="/contact">Get in touch</NuxtLink>
    </nav>
    <div class="login">
      <NuxtLink class="login__link" to="/login">Login</NuxtLink>
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

.logo {
  flex: 0 0 $header-item-width;
  margin-right: auto;
  padding-top: 0.5rem;
  &__image {
    height: 2rem;
  }
}

.nav-links {
  flex-grow: 1;
  display: flex;
  justify-content: center;

  &__item {
    text-decoration: none;
    position: relative;
    &:not(:last-child) {
      margin-right: 2.5rem;
    }
    &:link,
    &:visited {
      color: $gray-darkest;
    }

    &.nuxt-link-exact-active::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.1875rem;
      background-color: $ordina-orange;
      top: $default-font-size * 1.375;
      left: 0;
    }
  }
}

.login {
  flex: 0 0 $header-item-width;
  display: flex;
  justify-content: flex-end;
}
</style>
