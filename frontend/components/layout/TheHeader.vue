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
          class="header__navigation header__navigation--desktop"
        >
          <TheLogo />

          <div class="header__links">
            <HeaderMenuLink
              v-for="link in links"
              :key="link.name"
              :link="link"
              class="header__link"
            />
            <LoginBox :is-mobile="false" />
          </div>
        </nav>
        <HeaderSlashes class="header__slashes" />
      </div>

      <!-- Mobile menu starts here -->
      <div v-else class="header__container header__container--mobile">
        <TheLogo :is-flat="true" />

        <div class="header__menu-toggle">
          <span
            v-if="!isMobileMenuActive"
            @click="openMobileNavMenu"
            @touch="openMobileNavMenu"
            class="material-icons header__mobile-menu-button"
            aria-label="open mobile menu"
            role="navigation"
            >menu</span
          >
          <span
            v-else
            @click="closeMobileNavMenu"
            @touch="closeMobileNavMenu"
            class="material-icons header__mobile-menu-button"
            aria-label="close mobile menu"
            role="navigation"
            >close</span
          >
        </div>
      </div>

      <nav
        v-if="isMobileMenuActive"
        role="navigation"
        aria-label="Main"
        class="header__navigation header__navigation--mobile"
      >
        <div class="header__links header__links--mobile">
          <HeaderMenuLink
            v-for="link in links"
            :key="link.name"
            :link="link"
            :is-mobile="true"
            @click.native="closeMobileNavMenu"
            class="header__link"
          />
          <LoginBox @closeMobileMenu="closeMobileNavMenu" :is-mobile="true" />
        </div>
      </nav>
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
import HeaderMenuLink from '../HeaderMenuLink.vue'

export default defineComponent({
  components: { LoginBox, HeaderMenuLink, HeaderSlashes, TheLogo },

  setup() {
    const largeScreenSize = 1000
    const isMounted = ref(false)
    const isLargeScreen = ref(true)

    function resizeHandler() {
      isLargeScreen.value = window.innerWidth >= largeScreenSize
    }

    onMounted(() => {
      isMounted.value = true
      window.addEventListener('resize', resizeHandler)
      isLargeScreen.value = window.innerWidth >= largeScreenSize
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const links = [
      {
        name: 'Explore',
        icon: 'sign-up',
        to: '/',
      },
      {
        name: 'Events',
        icon: 'events',
        to: '/events',
      },
      {
        name: 'About',
        icon: 'about',
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 2rem;
      height: $mobile-header-height;
    }
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--desktop {
    }

    &--mobile {
      position: fixed;
      flex-direction: column;
      background: #282828;
      right: 0;
      top: $mobile-header-height;
    }
  }

  &__links {
    display: flex;
    align-items: center;

    &--mobile {
      flex-direction: column;
      padding: 3rem 4rem 2rem;

      & > .header__link {
        margin-right: 0;
        margin-bottom: 2rem;
      }
    }
  }

  &__link {
    margin-right: 6rem;
  }

  &__menu-toggle {
    color: white;

    &:hover {
      cursor: pointer;
    }
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
