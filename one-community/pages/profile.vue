<template>
  <BaseContainer>
    <h1>Logged in as {{ $auth.user.username }}</h1>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { $auth } = useContext()
  },
})
</script>

<style lang="scss" scoped></style>
