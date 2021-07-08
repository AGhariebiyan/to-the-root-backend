<template>
  <BaseContainer>
    <h1>COMMUNITY</h1>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
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
