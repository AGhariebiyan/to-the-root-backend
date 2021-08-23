<template>
  <BasePageLayout>
    <BaseContainer containerType="narrow">
      <div class="signup__content">
        <h2>Signup</h2>
      </div>
      <BaseForm @submit="registerUser">
        <template v-slot:socials>
          <LoginSocials divider-text="Or signup with email" />
        </template>
        <template v-slot:form>
          <label class="form__label" for="username">Username</label>
          <input
            class="form__input"
            type="text"
            name="username"
            id="username"
            v-model="username"
            @input="resetError"
            required
          />

          <label class="form__label" for="email">Email</label>
          <input
            class="form__input"
            type="text"
            name="email"
            id="email"
            v-model="email"
            @input="resetError"
            required
          />

          <label class="form__label" for="password">Password</label>
          <input
            class="form__input"
            type="password"
            name="password"
            id="password"
            v-model="password"
            @input="resetError"
            required
          />

          <p class="form__error-message" v-if="error">{{ error }}</p>

          <div class="form__buttons">
            <BaseButton buttonType="primary" class="form__button" type="submit"
              >Sign up</BaseButton
            >
            <BaseButton buttonType="transparent" class="form__button">
              <NuxtLink class="form__button" to="/login"
                >Login instead</NuxtLink
              >
            </BaseButton>
          </div>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'
import BaseButton from '../components/base/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  setup() {
    const email = ref('')
    const error = ref('')
    const username = ref('')
    const password = ref('')

    const { $auth, $axios } = useContext()

    const validatePassword = function () {
      return true
    }

    const validateRegister = computed(() => {
      return !!email.value && !!username.value && validatePassword()
    })

    const resetInput = () => {
      username.value = ''
      email.value = ''
      password.value = ''
    }

    const resetError = () => {
      error.value = ''
    }

    async function registerUser() {
      try {
        if (!validateRegister.value) {
          return
        }
        await $axios.post('/auth/local/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        })

        await $auth.loginWith('local', {
          data: {
            identifier: username.value,
            password: password.value,
          },
        })

        resetInput()
      } catch (e) {
        error.value = errorMessageFromResponse(e)
      }
    }

    return {
      email,
      error,
      password,
      registerUser,
      resetError,
      username,
    }
  },
})
</script>

<style lang="scss" scoped>
.signup__content {
  margin-bottom: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
}  
.container--narrow {
  flex-direction: column;
}
</style>
