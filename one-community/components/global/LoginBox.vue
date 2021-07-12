<template>
  <div class="login-box">
    <template v-if="isLoggedIn">
      <NuxtLink
        to="/profile"
        class="profile"
        :title="`Logged in as ${$auth.user.username}`"
      >
        <span class="material-icons">account_circle</span>
      </NuxtLink>
      <button
        :title="$auth.user.username"
        class="login-box__logout"
        @click="logout"
      >
        Log out
      </button>
    </template>

    <template v-else>
      <button>
        <NuxtLink class="login-box__link" to="/login">Login</NuxtLink>
      </button>
      <button>
        <NuxtLink class="login-box__link" to="/signup">Sign up</NuxtLink>
      </button>
    </template>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { $auth, $toast } = useContext()

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    // Logout
    async function logout() {
      try {
        await $auth.logout()
        $toast.show(`Logout successful`, {
          type: 'success',
        })
      } catch {
        $toast.show('Something went wrong logging you out', {
          type: 'error',
        })
      }
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

  &__hello {
    margin-right: 0.5rem;
  }

  &__logout {
    cursor: pointer;
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
</style>
