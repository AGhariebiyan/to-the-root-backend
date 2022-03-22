<template>
  <BasePageLayout>
    <BaseContainer
      containerType="narrow"
      containerDirection="row"
      class="navigation"
    >
      <p
        class="navigation__tab"
        :class="{ active: currentSection === 'profile' }"
        @click="setCurrentSection('profile')"
      >
        My Profile
      </p>
      <p
        class="navigation__tab"
        :class="{ active: currentSection === 'content' }"
        @click="setCurrentSection('content')"
      >
        My Content
      </p>
      <p
        class="navigation__tab"
        :class="{ active: currentSection === 'projects' }"
        @click="setCurrentSection('projects')"
      >
        My Projects
      </p>
    </BaseContainer>
    <BaseContainer containerType="narrow" class="profile">
      <template v-if="currentSection === 'profile'">
        <h3 class="profile__name">{{ $auth.user.username }}</h3>
        <p class="profile__email">{{ $auth.user.email }}</p>

        <label class="profile__cookie-toggle-label" for="allows-cookies"
          >Allow cookies for analysis</label
        >
        <input
          class="profile__cookie-toggle-input"
          type="checkbox"
          id="allows-cookies"
          :checked="allowsCookies"
          @input="toggleAllowsCookies"
        />

        <p class="profile__reset-password">
          Click here to <NuxtLink to="/password">reset your password</NuxtLink>
        </p>

        <button
          class="btn btn-secondary profile__logout"
          type="button"
          @click="logout"
        >
          Log out
        </button>
      </template>
      <template v-else-if="currentSection === 'content'">
        <p>This is an overview of the content you have produced so far</p>
      </template>

      <template v-else-if="currentSection === 'projects'">
        <p>
          This is an overview of the projects you have participated in so far
        </p>
      </template>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  middleware: 'auth',
  head: {},
  setup() {
    useMeta(() => ({ title: composePageTitle('Profile') }))

    const context: any = useContext()
    const { $auth, $cookies, $gtm } = context
    const currentSection = ref('profile')

    const allowsCookies = $cookies.get('allowsCookies')

    function toggleAllowsCookies() {
      const newAllowsCookies = !$cookies.get('allowsCookies')
      $cookies.set('allowsCookies', newAllowsCookies)

      if (!newAllowsCookies) {
        // Reload the page when we disable cookies
        location.reload()
      } else {
        // Start GTM when we enable cookies
        $gtm.init()
      }
    }

    // Logout
    async function logout() {
      try {
        await $auth.logout()
      } catch {}
    }

    function setCurrentSection(section: string) {
      currentSection.value = section
    }

    return {
      allowsCookies,
      logout,
      currentSection,
      setCurrentSection,
      toggleAllowsCookies,
    }
  },
})
</script>

<style lang="scss" scoped>
.navigation {
  &.container {
    padding-bottom: 0;
    border-bottom: 2px solid $discovery-blue-5;
  }

  &__tab {
    cursor: pointer;
    padding: 1rem;
    font-size: $default-font-size * 1.2;
    border-radius: 3px 3px 0 0;

    &:hover {
      color: $discovery-blue-primary;
    }

    &.active {
      background-color: $discovery-blue-5;
    }
  }
}

.profile {
  &__name {
    margin-bottom: 1rem;
  }

  &__email {
    margin-bottom: 1rem;
  }

  &__cookie-toggle {
    &-label {
      margin-bottom: 0.5rem;
    }
    &-input {
      position: relative;
      transform: scale(1.5);
      left: 0.25rem;
    }
  }

  &__reset-password {
    padding: 1rem 0;
    margin: 1rem 0;
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;
  }

  &__logout {
    width: fit-content;
    margin-top: 2rem;
  }

  &.container--narrow {
    @include respond(phone) {
      margin: 1rem;
      button {
        margin-top: 1rem;
      }
    }
  }
}
</style>
