<template>
  <div class="login-box" :class="{ 'is-mobile': isMobile }">
    <template v-if="isLoggedIn">
      <button
        class="login-box__link login-box__link--logout"
        @click="logoutHandler"
      >
        Log out
      </button>
      <NuxtLink
        to="/profile"
        :title="`Logged in as ${$auth.user.username}`"
        @click.native="$emit('closeMobileMenu')"
      >
        <img
          :src="require(`~/assets/icons/profile.svg`)"
          alt=""
          class="login-box__profile"
        />
      </NuxtLink>
    </template>

    <template v-else>
      <NuxtLink
        class="login-box__link"
        to="/login"
        @click.native="$emit('closeMobileMenu')"
        >Log in
      </NuxtLink>
      <NuxtLink
        class="login-box__link"
        to="/signup"
        @click.native="$emit('closeMobileMenu')"
        >Sign up
      </NuxtLink>
    </template>
  </div>
</template>

<script>
import { computed, useContext, useRoute } from '@nuxtjs/composition-api'
export default {
  emits: ['closeMobileMenu'],
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { $auth } = useContext()
    const route = useRoute()
    const routeName = computed(() => route.value.name)

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    // Logout
    async function logout() {
      try {
        await $auth.logout()
      } catch {}
    }

    function logoutHandler() {
      emit('closeMobileMenu')
      logout()
    }

    return { isLoggedIn, routeName, logoutHandler }
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__logout {
    cursor: pointer;
  }

  &__link {
    background: $ordina-orange;
    padding: 0.75rem 2rem;
    color: #252525;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background-color: $ordina-orange-hover;
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }

    &:link,
    &:visited {
      text-decoration: none;
    }

    &--logout {
      border: none;
      outline: none;
      margin-right: 2rem;

      &:hover {
        background-color: $ordina-orange-hover;
      }
    }
  }

  &__profile {
    height: 3rem;
    margin-top: 7px;

    &:hover {
      background-color: $ordina-orange;
    }
  }
}

.nuxt-link-exact-active {
  background-color: $accelerate-blue-primary;
  color: white;

  &:hover {
    background-color: $accelerate-blue-primary;
  }
}

.is-mobile {
  flex-direction: column;

  &.login-box {
    margin-top: 1rem;
    margin-right: 0;
  }

  & > .login-box__link {
    margin-bottom: 1rem;
  }

  & > .login-box__link--logout {
    margin-right: 0;
  }
}

.is-mobile > .login-box__link:not(:first-child) {
  margin-left: 0;
  margin-top: 2rem;
}

@media (max-width: $desktop-max-width) {
  .login-box {
    margin-right: 1rem;
  }
}

@media only screen and (max-width: 54.5em) {
  .profile {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
}
</style>
