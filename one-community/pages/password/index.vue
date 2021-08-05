<template>
  <BaseContainer>
    <BaseForm @submit="forgotPassword">
      <template v-slot:form>
        <h3>Forgot Password</h3>
        <label class="form__label" for="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          v-model="forgotEmail"
          class="form__input"
        />
        <BaseButton buttonType="primary">Send New Password</BaseButton>
      </template>
    </BaseForm>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context = useContext()
    const forgotEmail = ref('')

    async function forgotPassword() {
      // Request API.
      try {
        const forgot = await context.$axios.post(
          `${context.$strapi.options.url}/auth/forgot-password`,
          {
            email: forgotEmail.value, // user's email
          },
        )
        console.log(forgot.data)
      } catch (error) {
        console.log('An error occurred:', error.response)
      }
    }

    return {
      forgotEmail,
      forgotPassword,
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
</style>
