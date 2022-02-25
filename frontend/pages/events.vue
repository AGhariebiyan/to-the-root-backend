<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>EVENTS</h1>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()
    title.value = `Events / ${process.env.platformName}`
  },
})
</script>

<style lang="scss" scoped></style>
