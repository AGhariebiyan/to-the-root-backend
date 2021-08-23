<template>
  <BasePageLayout>
    <BaseContainer>
      <BaseForm @submit="forgotPassword">
        <template v-slot:form>
          <h3>Get password reset link</h3>
          <label class="form__label" for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            v-model="forgotEmail"
            class="form__input"
          />
          <p class="form__error-message" v-if="error">{{ error }}</p>
          <BaseButton buttonType="primary">Send reset email</BaseButton>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '~/utils/helpers'

export default defineComponent({
  setup() {
    const { $axios, $strapi } = useContext()
    const forgotEmail = ref('')
    const error = ref('')

    async function forgotPassword() {
      // error.value = ''
      // Request API.
      try {
        await $axios.post(`${$strapi.options.url}/auth/forgot-password`, {
          email: forgotEmail.value, // user's email
        })
      } catch (err) {
        error.value = errorMessageFromResponse(err)
        console.log('An error occurred: ', errorMessageFromResponse(err))
      }
    }

    return {
      forgotEmail,
      forgotPassword,
      error,
    }
  },
})
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 1rem;
}
button {
  margin-top: 1rem;
}
.form-wrapper {
  width: 50vw;
  @include respond(tab-landscape) {
    width: 80vw;
  }
}
</style>
