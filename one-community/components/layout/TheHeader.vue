<template>
  <header class="header">
    <div class="header__content">
      <div class="logo">
        <NuxtLink class="logo__link" to="/">
          <img class="logo__image" src="@/assets/Logo.svg" alt="Logo" />
        </NuxtLink>
      </div>
      <nav class="nav-links">
        <NuxtLink
          class="nav-links__item"
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          >{{ link.name }}</NuxtLink
        >
      </nav>
      <LoginBox />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LoginBox from '../global/LoginBox.vue'

export default defineComponent({
  components: { LoginBox },
  setup() {
    const links = [
      {
        name: 'Community',
        to: '/',
      },
      {
        name: 'Content',
        to: '/content',
      },
      {
        name: 'Events',
        to: '/events',
      },
      {
        name: 'Get in touch',
        to: '/contact',
      },
    ]
    return { links }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background-color: $gray-light;
  padding: 1rem;
}

.header__content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: $nav-max-width;
  margin: 0 auto;
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
      background-color: $discovery-blue-primary;
      top: $default-font-size * 1.375;
      left: 0;
    }
  }
}

.login-box {
  flex: 0 0 $header-item-width;
  display: flex;
  justify-content: flex-end;
}
</style>
