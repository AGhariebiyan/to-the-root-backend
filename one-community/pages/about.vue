<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>ABOUT</h1>
    </BaseContainer>
  </BasePageLayout>
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
