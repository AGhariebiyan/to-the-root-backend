<template>
  <header class="header">
    <template v-if="isLargeScreen">
      <div
        class="header__container header__container--desktop"
        :class="{ 'header__container--flat': hasScrolledDown }"
      >
        <nav
          role="navigation"
          aria-label="Main"
          class="header__navigation header__navigation--desktop"
        >
          <TheLogo :isFlat="hasScrolledDown" />

          <div class="header__links">
            <HeaderMenuLink
              v-for="link in links"
              :key="link.name"
              :link="link"
              :has-scrolled-down="hasScrolledDown"
              class="header__link"
            />
            <LoginBox :is-mobile="false" />
          </div>
        </nav>
      </div>
      <transition name="slide">
        <HeaderSlashes v-if="!hasScrolledDown" class="header__slashes" />
      </transition>
    </template>

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

    <transition name="fade">
      <div
        class="mobile-menu-wrapper"
        v-if="isMobileMenuActive"
        @click="closeMobileNavMenu"
      >
        <nav
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
      </div>
    </transition>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import LoginBox from '../global/LoginBox.vue'
import HeaderSlashes from './HeaderSlashes.vue'
import TheLogo from './TheLogo.vue'
import HeaderMenuLink from '../HeaderMenuLink.vue'

export default defineComponent({
  components: { LoginBox, HeaderMenuLink, HeaderSlashes, TheLogo },
  props: {
    hasScrolledDown: {
      type: Boolean,
      required: true,
    },
    isLargeScreen: {
      type: Boolean,
      required: true,
    },
  },

  setup() {
    const links = [
      {
        name: 'Explore',
        icon: 'explore',
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
      isMobileMenuActive,
      openMobileNavMenu,
      closeMobileNavMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #262626;
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;

  &__container {
    position: relative;

    &--desktop {
      max-width: $desktop-max-width;
      padding: 1rem 0 3rem;
      margin: 0 auto;
      flex-direction: row;
      transition: padding $header-transition-time ease;
    }

    &--flat {
      padding: 0;
    }

    &--mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 2rem;
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
      top: $header-height-mobile;
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

.mobile-menu-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(#262626, 0.4);
  left: 0;
  top: $header-height-mobile;
}

.slide-enter-active,
.slide-leave-active {
  transition: height $header-transition-time;
}

.slide-enter,
.slide-leave-to {
  height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $header-transition-time;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
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
