<template>
  <header class="header">
    <div class="header__content">
      <div class="logo">
        <NuxtLink class="logo__link" to="/">
          <img class="logo__image" src="@/assets/Logo.svg" alt="Logo" />
        </NuxtLink>
      </div>
      <span
        class="material-icons header__menu-button"
        @click="openMobileNavMenu"
        @touch="openMobileNavMenu"
        >menu</span
      >
      <nav class="nav-links--desktop">
        <NuxtLink
          class="nav-links__item"
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          >{{ link.name }}</NuxtLink
        >
      </nav>
      <LoginBox />
      <div class="header__menu--mobile" v-if="headerMobileMenuActive">
        <nav class="nav-links--mobile">
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
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
    const headerMobileMenuActive = ref(false)

    function openMobileNavMenu() {
      headerMobileMenuActive.value = !headerMobileMenuActive.value
    }
    return { links, headerMobileMenuActive, openMobileNavMenu }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background-color: $gray-light;
  padding: 1rem;
  position: sticky;
  top: 0;
}

.header__content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: $nav-max-width;
  margin: 0 auto;
  position: relative;
}

.logo {
  width: $header-item-width;
  margin-right: auto;
  padding-top: 0.5rem;

  &__image {
    height: 2rem;
  }
}

.nav-links--desktop {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.nav-links__item {
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

.header__menu--mobile {
  width: 100vw;
  position: absolute;
  background-color: $gray-light;
  top: 3rem;
  padding: 1rem;
}

.nav-links--mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nav-links__item {
    margin: 0.5rem 0 0.5rem 0;
  }
}

.nav-links--mobile + .login-box {
  width: 100%;
  flex-direction: column;
}

.login-box {
  width: $header-item-width;
  display: flex;
  justify-content: flex-end;
}

.header__menu-button {
  display: none;
}

@include respond(header) {
  .nav-links--desktop {
    display: none;
  }
  .nav-links--desktop + .login-box {
    display: none;
  }
  .header__menu-button {
    width: $header-item-width;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
