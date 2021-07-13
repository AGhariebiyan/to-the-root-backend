<template>
  <BaseContainer>
    <h1>ABOUT</h1>
    <div class="github">
      <button @click="loginWithGithub">Login with Github</button>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()

    async function loginWithGithub() {
      console.log('test')
      const response = await $axios.get('/connect/github')
      console.log(response)
    }

    return { loginWithGithub }
  },
})
</script>

<style lang="scss" scoped></style>
