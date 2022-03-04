<template>
  <BasePageLayout>
    <BaseContainer>
      <BaseForm @submit="forgotPassword">
        <template v-slot:form>
          <h3 class="reset-email__title">Get password reset link</h3>
          <label class="form__label" for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            v-model="forgotEmail"
            class="form__input"
            :disabled="isFormSubmitted"
          />
          <BaseButton
            buttonType="primary"
            :disabled="isFormSubmitted"
            class="reset-email__submit"
            >Send reset email</BaseButton
          >
          <p v-if="isFormSubmitted">
            Your email has been submitted. If it exists in our database an email
            will be sent to you. Check your mailbox in the next few minutes.
            Please make sure to check your junk folder as well.
          </p>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    useMeta(() => ({ title: composePageTitle('Reset password') }))

    const { $axios, $strapi } = useContext()
    const forgotEmail = ref('')
    const isFormSubmitted = ref(false)

    async function forgotPassword() {
      // Request API.
      try {
        isFormSubmitted.value = true
        await $axios.post(`${$strapi.options.url}/auth/forgot-password`, {
          email: forgotEmail.value, // user's email
        })
      } catch (err) {}
    }

    return {
      forgotEmail,
      forgotPassword,
      isFormSubmitted,
    }
  },
})
</script>

<style lang="scss" scoped>
.reset-email__title {
  margin-bottom: 1rem;
}
.reset-email__submit {
  margin: 1rem 0;
}
.form-wrapper {
  width: 50vw;
  @include respond(tab-landscape) {
    width: 80vw;
  }
}
</style>
