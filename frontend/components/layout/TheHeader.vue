<template>
  <header class="header">
    <div class="header__content">
      <div class="logo">
        <NuxtLink class="logo__link" to="/">
          <img class="logo__image" src="@/assets/logo.svg" alt="home" />
        </NuxtLink>
      </div>
      <span
        role="navigation"
        aria-label="open mobile menu"
        v-if="!isHeaderMobileMenuActive"
        class="material-icons header__mobile-menu-button"
        @click="openMobileNavMenu"
        @touch="openMobileNavMenu"
        >menu</span
      >
      <span
        role="navigation"
        aria-label="close mobile menu"
        v-else
        class="material-icons header__mobile-menu-button"
        @click="closeMobileNavMenu"
        @touch="closeMobileNavMenu"
        >close</span
      >
      <nav role="navigation" aria-label="Main" class="nav-links--desktop">
        <NuxtLink
          class="nav-links__item"
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          >{{ link.name }}</NuxtLink
        >
      </nav>
      <LoginBox role="navigation" aria-label="Login" />
      <div class="header__menu--mobile" v-if="isHeaderMobileMenuActive">
        <nav role="navigation" aria-label="Main" class="nav-links--mobile">
          <NuxtLink
            class="nav-links__item"
            v-for="link in links"
            @click.native="closeMobileNavMenu"
            :key="link.name"
            :to="link.to"
            >{{ link.name }}</NuxtLink
          >
        </nav>
        <LoginBox @closeMobileMenu="closeMobileNavMenu" :isMobile="true" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from '@nuxtjs/composition-api'
import LoginBox from '../global/LoginBox.vue'

export default defineComponent({
  components: { LoginBox },

  setup() {
    function resizeHandler() {
      let resizeInterval
      if (isHeaderMobileMenuActive.value) {
        resizeInterval = setInterval(closeMobileMenuOnResize, 300)
      } else if (resizeInterval) {
        clearInterval(resizeInterval)
      }
    }

    function closeMobileMenuOnResize() {
      if (window.innerWidth >= 872) {
        isHeaderMobileMenuActive.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('resize', resizeHandler)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const links = [
      {
        name: 'Learn',
        to: '/',
      },
      {
        name: 'Connect',
        to: '/contact',
      },
      {
        name: 'About Us',
        to: '/about',
      },
    ]

    const isHeaderMobileMenuActive = ref(false)

    function openMobileNavMenu() {
      isHeaderMobileMenuActive.value = true
    }

    function closeMobileNavMenu() {
      isHeaderMobileMenuActive.value = false
    }

    return {
      links,
      isHeaderMobileMenuActive,
      openMobileNavMenu,
      closeMobileNavMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background-color: $white;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header__content {
  display: flex;
  align-items: center;
  max-width: $desktop-max-width;
  margin: 0 auto;
  position: relative;
}

.logo {
  width: $header-item-width;
  margin-right: auto;
  padding: 2rem;

  &__link {
    line-height: 0;
  }

  &__image {
    height: 6rem;
  }
}

.nav-links--desktop {
  display: flex;
  justify-content: center;
  margin-right: 3rem;
}

.nav-links__item {
  text-decoration: none;
  position: relative;
  text-transform: uppercase;
  font-family: 'Poppins-Bold';
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:not(:last-child) {
    margin-right: 2.5rem;
  }

  &:link,
  &:visited {
    color: $gray-darkest;
  }

  &:hover {
    color: $ordina-orange;
  }

  &.nuxt-link-exact-active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.35rem;
    background-color: $gray;
    top: $default-font-size * 2;
    left: 0;
  }
}

.header__menu--mobile {
  background-color: $gray-light;
  border-top: 1px solid $gray;
  height: calc(100% - 4.5rem);
  padding: 1rem;
  position: fixed;
  overflow-y: scroll;
  top: 4.5rem;
  width: 100%;
  z-index: 50;
}

.nav-links--mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;

  .nav-links__item {
    margin: 1.5rem 0;
  }
}

.nav-links--mobile + .login-box {
  width: 60%;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 3rem;
  border-top: 1px solid $gray;
}

.login-box {
  display: flex;
  justify-content: flex-end;
}

.header__mobile-menu-button {
  display: none;
  cursor: pointer;
}

// breaking at 872px to avoid weird underline issues
@media only screen and (max-width: 54.5em) {
  .nav-links--desktop {
    display: none;
  }

  .nav-links--desktop + .login-box {
    display: none;
  }

  .header__mobile-menu-button {
    display: flex;
  }
}
</style>
