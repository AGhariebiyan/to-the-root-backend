<template>
  <BaseContainer containerType="color">
    <h1>COMMUNITY</h1>
    <BaseButton buttonType="primary">Primary</BaseButton>
    <BaseButton buttonType="secondary">Secondary</BaseButton>
    <BaseButton buttonType="warning">Warning</BaseButton>
    <BaseButton buttonType="danger">Danger</BaseButton>
    <BaseButton buttonType="pill">Pill Button</BaseButton>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import BaseButton from '~/components/base/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  setup() {
    const { $axios } = useContext()
    onMounted(async () => {
      try {
        await $axios.get('/categories')
      } catch (error) {
        console.error(error)
      }
    })
  },
})
</script>

<style lang="scss" scoped></style>
