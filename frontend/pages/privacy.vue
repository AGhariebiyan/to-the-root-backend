<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>PRIVACY</h1>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    composePageTitle('Privacy')
  },
})
</script>

<style lang="scss" scoped></style>
