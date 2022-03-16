<template>
  <div class="login-box" :class="{ isMobile: isMobile }">
    <template v-if="isLoggedIn">
      <NuxtLink
        to="/profile"
        :title="`Logged in as ${$auth.user.username}`"
        @click.native="$emit('closeMobileMenu')"
      >
        <img :src="require(`~/assets/icons/profile.svg`)" />
      </NuxtLink>

      <button
        class="btn-outline btn-outline--gray login-box__link"
        @click="logoutHandler"
      >
        Log out
      </button>
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

    &:not(:first-child) {
      margin-left: 1rem;
    }

    &:link,
    &:visited {
      text-decoration: none;
    }
  }
}

.nuxt-link-exact-active {
  background-color: $accelerate-blue-primary;
  color: white;
}

.isMobile > .login-box__link:not(:first-child) {
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
