<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>PRIVACY</h1>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()
    title.value = `Privacy / ${process.env.platformName}`
  },
})
</script>

<style lang="scss" scoped></style>
