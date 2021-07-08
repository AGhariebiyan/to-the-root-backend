<template>
  <header class="header">
    <div class="logo-box">
      <NuxtLink to="/">
        <img class="logo" src="@/assets/Logo.svg" alt="Logo" />
      </NuxtLink>
    </div>
    <nav class="nav-links">
      <NuxtLink class="nav-link" to="/">Community</NuxtLink>
      <NuxtLink class="nav-link" to="/content">Content</NuxtLink>
      <NuxtLink class="nav-link" to="/events">Events</NuxtLink>
      <NuxtLink class="nav-link" to="/contact">Get in touch</NuxtLink>
    </nav>
    <LoginBox />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LoginBox from '../global/LoginBox.vue'

export default defineComponent({
  components: { LoginBox },
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

.logo-box {
  flex: 0 0 $header-item-width;
  margin-right: auto;
  padding-top: 0.5rem;
}

.logo {
  height: 2rem;
}

.nav-links {
  flex-grow: 1;
  display: flex;
  justify-content: center;
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

.login-box {
  flex: 0 0 $header-item-width;
  display: flex;
  justify-content: flex-end;
}
</style>
