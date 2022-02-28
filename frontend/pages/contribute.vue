<template>
  <BasePageLayout>
    <MailingListForm
      interest="Contribute (Produce Content)"
      button-text="Keep me updated"
    >
      <template v-slot:header>Contribute</template>

      <template v-slot:paragraph>
        We're still working on this feature. Leave your email if you're
        interested in writing articles or making videos and we'll keep you
        updated.
      </template>
    </MailingListForm>
  </BasePageLayout>
</template>

<script>
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    useMeta(() => ({ title: composePageTitle('Contribute') }))
  },
})
</script>

