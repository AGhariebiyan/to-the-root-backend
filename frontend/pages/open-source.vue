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

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()
    title.value = `Open source / ${process.env.platformName}`
  },
})
</script>