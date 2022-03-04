<template>
  <BasePageLayout>
    <MailingListForm
      interest="Contribute (Open Source)"
      button-text="Keep me updated"
    >
      <template v-slot:header>Open Source</template>

      <template v-slot:paragraph>
        We're still working on this feature. We can let you know as soon as it's
        ready if you leave your email.
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
    useMeta(() => ({ title: composePageTitle('Open source') }))
  },
})
</script>