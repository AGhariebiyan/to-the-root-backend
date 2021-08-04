<template>
  <BasePageLayout>
    <BaseContainer class="profile__section--nav">
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
    <BaseContainer
      containerType="narrow"
      class="profile__section"
      v-if="currentSection === 'profile'"
    >
      <h2>Welcome {{ $auth.user.username }}</h2>
      <p>
        This is your profile page where you can logout and view your profile
        info
      </p>

      <BaseButton buttonType="primary" @click.native="logout"
        >Logout</BaseButton
      >
    </BaseContainer>
    <BaseContainer
      containerType="narrow"
      class="profile__section"
      v-else-if="currentSection === 'content'"
    >
      <p>
        This is an overview of the content you have produced so far
      </p></BaseContainer
    >

    <BaseContainer
      containerType="narrow"
      class="profile__section"
      v-else-if="currentSection === 'projects'"
    >
      <p>This is an overview of the projects you have participated in so far</p>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { $auth } = useContext()
    const currentSection = ref('profile')

    // Logout
    async function logout() {
      try {
        await $auth.logout()
      } catch {}
    }

    function setCurrentSection(section: string) {
      currentSection.value = section
    }

    return { logout, currentSection, setCurrentSection }
  },
})
</script>

<style lang="scss" scoped>
.profile__section--nav.container {
  padding-bottom: 0;
  border-bottom: 2px solid $discovery-blue-5;
}
.profile__section {
  flex-direction: column;
  button {
    width: fit-content;
  }
  p {
    margin: 1rem 0;
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
</style>
