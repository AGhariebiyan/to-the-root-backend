<template>
  <BasePageLayout>
    <BaseContainer containerType="narrow">
      <div class="contact__content">
        <h2>Get in Touch</h2>
        <p>
          Have you got questions about this project? Ask them in the form below.
          We’d love to get your feature requests! We always appreciate
          constructive feedback as well.
        </p>
      </div>
      <BaseForm>
        <template v-slot:form>
          <p class="form__heading">Let's Talk</p>
          <label class="form__label" for="firstname">First Name</label>
          <input class="form__input" type="text" name="firstname" />
          <label class="form__label" for="lastname">Last Name</label>
          <input class="form__input" type="text" name="lastname" />
          <label class="form__label" for="email">Email Address</label>
          <input class="form__input" type="text" name="email" />
          <label class="form__label" for="message">Message</label>
          <textarea class="form__input" type="text" name="message"></textarea>
        </template>
      </BaseForm>
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

<style lang="scss" scoped>
.contact__content {
  margin-bottom: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
}
.container--narrow {
  flex-direction: column;
}
</style>
