<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <NuxtLink
        to="/profile"
        class="profile"
        :title="`Logged in as ${$auth.user.username}`"
      >
        <span class="material-icons">person_outline</span>
      </NuxtLink>
      <BaseButton
        buttonType="primary"
        :title="$auth.user.username"
        class="login-box__logout"
        @click="logout"
      >
        Log out
      </BaseButton>
    </template>

    <template v-else>
      <NuxtLink class="login-box__link" to="/login">Login</NuxtLink>
      <BaseButton class="header__button" buttonType="primary">
        <NuxtLink class="login-box__link" to="/signup">Sign up</NuxtLink>
      </BaseButton>
    </template>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { $auth } = useContext()

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    // Logout
    async function logout() {
      try {
        await $auth.logout()
      } catch {}
    }

    return { isLoggedIn, logout }
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
  margin-right: 1rem;
  color: $discovery-blue-primary;
  &:active,
  &:hover {
    color: $gray-darkest;
  }
}

.material-icons {
  display: inline-block;
  margin-top: 0.375rem;
}

.header__button:not(:first-child) {
  margin-left: 1rem;
}

@media only screen and (max-width: 54.5em) {
  .header__button.primary {
    margin-left: 0;
    margin-top: 3rem;
  }
}
</style>
