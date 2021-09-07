<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <NuxtLink
        class="login-box__link button-link button-link--transparent"
        to="/profile"
        :title="`Logged in as ${$auth.user.username}`"
        @click.native="$emit('closeMobileMenu')"
      >
        <span class="material-icons">person_outline</span>
      </NuxtLink>

      <BaseButton
        buttonType="primary"
        class="header__button login-box__logout"
        @click.native="logoutHandler"
      >
        Log out
      </BaseButton>
    </template>

    <template v-else>
      <template v-if="routeName !== 'login'">
        <NuxtLink
          class="login-box__link button-link"
          to="/login"
          @click.native="$emit('closeMobileMenu')"
          >Login</NuxtLink
        >
      </template>
      <template v-if="routeName !== 'signup'">
        <NuxtLink
          class="login-box__link button-link"
          to="/signup"
          @click.native="$emit('closeMobileMenu')"
          >Sign up</NuxtLink
        >
      </template>
    </template>
  </div>
</template>

<script>
import { computed, useContext, useRoute } from '@nuxtjs/composition-api'
export default {
  emits: ['closeMobileMenu'],
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
}

.material-icons {
  display: inline-block;
}

.header__button:not(:first-child),
.button-link:not(:first-child) {
  margin-left: 1rem;
}

@media only screen and (max-width: 54.5em) {
  .header__button.primary {
    margin-left: 0;
    margin-top: 3rem;
  }
  .profile {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
}
</style>
