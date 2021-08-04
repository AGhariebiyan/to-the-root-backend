<template>
  <BaseContainer>
    <BaseForm v-if="isLoggedIn" @submit="resetPassword">
      <template v-slot:form>
        <h3>Reset Password</h3>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          v-model="resetEmail"
        />
        <BaseButton buttonType="primary">Reset Password</BaseButton>
      </template>
    </BaseForm>
    <BaseForm v-else @submit="forgotPassword">
      <template v-slot:form>
        <h3>Forgot Password</h3>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          v-model="forgotEmail"
        />
        <BaseButton buttonType="primary">Send New Password</BaseButton>
      </template>
    </BaseForm>
  </BaseContainer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const context = useContext()
    const resetEmail = ref('')
    const forgotEmail = ref('')

    const isLoggedIn = computed(() => {
      return context.$auth.$state.loggedIn
    })

    function forgotPassword() {
      // Request API.
      context.$axios
        .post('http://localhost:1337/auth/forgot-password', {
          email: forgotEmail.value, // user's email
        })
        .then((response) => {
          console.log('Your user received an email')
        })
        .catch((error) => {
          console.log('An error occurred:', error.response)
        })
    }

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
      resetEmail,
      forgotEmail,
      isLoggedIn,
      forgotPassword,
      resetPassword,
    }
  },
})
</script>

<style lang="scss" scoped></style>
