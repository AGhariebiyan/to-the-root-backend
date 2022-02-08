<template>
  <BasePageLayout>
    <MailingListForm
      interest="Contribute (Open Source)"
      button-text="Keep me updated"
    >
      <template v-slot:header> Contribute - Open Source </template>

      <template v-slot:paragraph>
        We're still working on this feature. We can let you know as soon as it's
        ready if you leave your email.
      </template>
    </MailingListForm>
  </BasePageLayout>
</template>
