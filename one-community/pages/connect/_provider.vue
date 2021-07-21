<template>
  <BasePageLayout>
    <base-container>
      <ClipLoader color="#3da4bf" />
    </base-container>
  </BasePageLayout>
</template>

<script>
import BasePageLayout from '~/components/base/BasePageLayout.vue'
import BaseContainer from '~/components/base/BaseContainer.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: { BaseContainer, BasePageLayout, ClipLoader },
  data() {
    return {
      provider: this.$route.params.provider,
      access_token: this.$route.query.access_token,
      isLoading: true,
    }
  },
  async mounted() {
    const res = await this.$axios.$get(
      `/auth/${this.provider}/callback?access_token=${this.access_token}`,
    )
    const { jwt, user } = res

    await this.$auth.setUserToken(jwt)
    this.$auth.setUser(user)

    this.$router.push(`/`)
  },
}
</script>

<style lang="scss" scoped></style>
