<template>
  <BasePageLayout>
    <BaseContainer
      containerType="narrow"
      containerDirection="row"
      class="profile__section-nav"
    >
      <p
        class="profile__section-link"
        :class="{ active: currentSection === 'profile' }"
        @click="setCurrentSection('profile')"
      >
        My Profile
      </p>
      <p
        class="profile__section-link"
        :class="{ active: currentSection === 'content' }"
        @click="setCurrentSection('content')"
      >
        My Content
      </p>
      <p
        class="profile__section-link"
        :class="{ active: currentSection === 'projects' }"
        @click="setCurrentSection('projects')"
      >
        My Projects
      </p>
    </BaseContainer>
    <BaseContainer containerType="narrow" class="profile__section">
      <template v-if="currentSection === 'profile'">
        <h3 class="profile__section--title">{{ $auth.user.username }}</h3>
        <p class="profile__section--text">{{ $auth.user.email }}</p>

        <label for="allows-cookies">Allows cookies</label>
        <input
          type="checkbox"
          id="allows-cookies"
          :checked="allowsCookies"
          @input="toggleAllowsCookies"
        />

        <p class="profile__reset-link">
          Click here to <NuxtLink to="/password">reset your password</NuxtLink>
        </p>

        <BaseButton buttonType="secondary" @click.native="logout"
          >Logout</BaseButton
        >
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

    const { $auth, $cookies, $gtm } = useContext()
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
.profile__section-nav.container {
  padding-bottom: 0;
  border-bottom: 2px solid $discovery-blue-5;
}
.profile__section {
  &--title {
    margin: 0 0 1rem;
  }
  &--text {
    font-family: Poppins-Light, sans-serif;
  }
  button {
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
.profile__section-link {
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
.profile__reset-link {
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid $gray;
  border-bottom: 1px solid $gray;
}
</style>
