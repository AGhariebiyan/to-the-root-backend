<template>
  <div>
    <h1>user page</h1>
  </div>
</template>

<script>
import { onMounted, useContext, useRoute } from '@nuxtjs/composition-api'
export default {
  setup() {
    const route = useRoute()
    const { $auth, $axios, redirect } = useContext()
    const provider = route.value.params.provider
    const accessToken = route.value.query.access_token

    onMounted(async () => {
      const res = await $axios.$get(
        `/auth/${provider}/callback?access_token=${accessToken}`,
      )
      console.log('response', res)
      const { jwt, user } = res
      // store jwt and user object in localStorage
      $auth.$state.loggedIn = true
      $auth.$storage.setUniversal('jwt', jwt)
      $auth.$storage.setUniversal('user', {
        username: user.username,
        id: user.id,
        email: user.email,
      })

      //   await $auth.loginWith('github')

      console.log('cookie user', $auth.$storage.getUniversal('user'))
      redirect(`/profile`)
    })
  },
}
</script>

<style lang="scss" scoped></style>
