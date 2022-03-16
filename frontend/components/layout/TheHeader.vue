<template>
  <header class="header">
    <template v-if="isMounted">
      <div
        v-if="isLargeScreen"
        class="header__container header__container--desktop"
      >
        <nav
          role="navigation"
          aria-label="Main"
          class="header__menu header__menu--desktop"
        >
          <TheLogo />

          <div class="header__links">
            <NuxtLink
              v-for="link in links"
              :key="link.name"
              :to="link.to"
              class="header__link"
              >{{ link.name }}</NuxtLink
            >
            <LoginBox role="navigation" aria-label="Log in" />
          </div>
        </nav>
        <HeaderSlashes class="header__slashes" />
      </div>

      <!-- Mobile menu starts here -->
      <div v-else class="header__container--mobile">
        <span
          role="navigation"
          aria-label="open mobile menu"
          v-if="!isMobileMenuActive"
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

        <nav role="navigation" aria-label="Main" class="header__menu--mobile">
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
    </template>
    <div v-else>Loading header</div>
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
import HeaderSlashes from './HeaderSlashes.vue'
import TheLogo from './TheLogo.vue'

export default defineComponent({
  components: { LoginBox, HeaderSlashes, TheLogo },

  setup() {
    const isMounted = ref(false)
    const largeScreenSize = 872
    const isLargeScreen = ref(true)

    function resizeHandler() {
      isLargeScreen.value = window.innerWidth >= largeScreenSize
    }

    onMounted(() => {
      isMounted.value = true
      window.addEventListener('resize', resizeHandler)
      isLargeScreen.value = window.innerWidth >= 872
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const links = [
      {
        name: 'Explore',
        to: '/',
      },
      {
        name: 'Events',
        to: '/events',
      },
      {
        name: 'About',
        to: '/about',
      },
    ]

    const isMobileMenuActive = ref(false)

    function openMobileNavMenu() {
      isMobileMenuActive.value = true
    }

    function closeMobileNavMenu() {
      isMobileMenuActive.value = false
    }

    return {
      links,
      isLargeScreen,
      isMobileMenuActive,
      isMounted,
      openMobileNavMenu,
      closeMobileNavMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #262626;
  position: sticky;
  top: 0;
  z-index: 50;

  &__container {
    position: relative;

    &--desktop {
      max-width: $desktop-max-width;
      height: 261px;
      margin: 0 auto;
      flex-direction: row;
    }

    &--mobile {
    }
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--desktop {
    }

    &--mobile {
    }
  }

  &__links {
    display: flex;
    align-items: center;
  }

  &__link {
    text-decoration: none;
    color: white;
  }
}

.header__slashes {
  position: absolute;
  bottom: 0px;
  left: -41px;
  height: 385px;
  width: calc(100% + 41px);
}

// breaking at 872px to avoid weird underline issues
// @media only screen and (max-width: 54.5em) {
//   .nav-links--desktop {
//     display: none;
//   }

//   .nav-links--desktop + .login-box {
//     display: none;
//   }

//   .header__mobile-menu-button {
//     display: flex;
//   }
// }
</style>
