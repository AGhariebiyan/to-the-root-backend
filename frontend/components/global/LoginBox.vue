<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <BaseButton buttonType="transparent" class="header__button">
        <NuxtLink
          class="login-box__link profile"
          to="/profile"
          :title="`Logged in as ${$auth.user.username}`"
          @click.native="$emit('closeMobileMenu')"
        >
          <span class="material-icons">person_outline</span>
        </NuxtLink>
      </BaseButton>
      <BaseButton
        buttonType="primary"
        :title="$auth.user.username"
        class="header__button login-box__logout"
        @click.native="logoutHandler"
      >
        Log out
      </BaseButton>
    </template>

    <template v-else>
      <template v-if="routeName !== 'login'">
        <BaseButton buttonType="primary" class="header__button">
          <NuxtLink
            class="login-box__link"
            to="/login"
            @click.native="$emit('closeMobileMenu')"
            >Login</NuxtLink
          >
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton buttonType="primary" class="header__button">
          <NuxtLink
            class="login-box__link"
            to="/signup"
            @click.native="$emit('closeMobileMenu')"
            >Sign up</NuxtLink
          >
        </BaseButton>
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

  &__link {
    text-decoration: none;
    color: inherit;
  }
}

.profile {
  color: $discovery-blue-primary;
  &:active,
  &:hover {
    color: $gray-darkest;
  }
}

.material-icons {
  display: inline-block;
}

.header__button:not(:first-child) {
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
