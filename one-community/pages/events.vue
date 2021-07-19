<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>EVENTS</h1>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped></style>
