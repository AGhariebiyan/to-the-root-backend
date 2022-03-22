<template>
  <BasePageLayout>
    <MailingListForm interest="Discord" button-text="Keep me updated">
      <template v-slot:header> Join our Discord </template>

      <template v-slot:paragraph>
        We're still working on the server. We can let you know as soon as it's
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
    useMeta(() => ({ title: composePageTitle('Discord') }))
  },
})
</script>