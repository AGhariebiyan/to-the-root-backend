<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>EVENTS</h1>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    useMeta(() => ({ title: composePageTitle('Events') }))
  },
})
</script>

<style lang="scss" scoped></style>
