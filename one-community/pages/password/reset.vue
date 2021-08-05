<template>
  <BaseContainer>
    <BaseForm @submit="resetPassword">
      <template v-slot:form>
        <h3>Reset Password</h3>
        <label class="form__label" for="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          v-model="newPassword"
          class="form__input"
        />
        <input
          type="text"
          name="password"
          placeholder="Enter the password again"
          v-model="newPassword2"
          class="form__input"
        />
        <BaseButton buttonType="primary">Reset Password</BaseButton>
      </template>
    </BaseForm>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const context = useContext()
    const newPassword = ref('')
    const newPassword2 = ref('')

    function resetPassword() {
      // Request API.
      context.$axios
        .post('http://localhost:1337/auth/reset-password', {
          code: 'privateCode', // code contained in the reset link of step 3.
          password: 'userNewPassword',
          passwordConfirmation: 'userNewPassword',
        })
        .then((response) => {
          console.log("Your user's password has been reset.")
        })
        .catch((error) => {
          console.log('An error occurred:', error.response)
        })
    }
    return {
      newPassword,
      newPassword2,
      resetPassword,
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
