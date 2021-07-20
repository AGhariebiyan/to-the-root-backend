<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provider: this.$route.params.provider,
      access_token: this.$route.query.access_token,
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
