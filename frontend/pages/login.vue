<template>
  <BasePageLayout>
    <BaseContainer containerType="narrow">
      <h2 class="login__title">Login</h2>

      <BaseForm @submit="loginUser">
        <template v-slot:socials>
          <LoginSocials divider-text="Or login with email" />
        </template>
        <template v-slot:form>
          <label class="form__label" for="identifier">Username or Email</label>
          <input
            class="form__input"
            type="text"
            name="identifier"
            id="identifier"
            @input="resetError"
            required
            :disabled="isLoggedIn"
            v-model="identifier"
          />

          <label class="form__label" for="password">Password</label>
          <input
            class="form__input"
            type="password"
            name="password"
            id="password"
            v-model="password"
            :disabled="isLoggedIn"
            @input="resetError"
            required
          />
          <p class="form__error-message" v-if="error">{{ error }}</p>
          <p class="form__reset-link">
            Forgot your password? Click here to
            <NuxtLink to="/password/">reset your password</NuxtLink>.
          </p>

          <div class="form__buttons">
            <BaseButton
              buttonType="primary"
              class="form__button"
              type="submit"
              :disabled="isLoggedIn || error.length > 0"
              >Login</BaseButton
            >

            <NuxtLink
              class="form__button button-link button-link--transparent"
              to="/signup"
              >Sign up instead</NuxtLink
            >
          </div>
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  useContext,
  ref,
  defineComponent,
  computed,
  useRoute,
  useRouter,
  useMeta,
} from '@nuxtjs/composition-api'
import { errorMessageFromResponse } from '@/utils/helpers'
import BaseForm from '../components/base/BaseForm.vue'
import BaseButton from '../components/base/BaseButton.vue'

export default defineComponent({
  name: 'PageLogin',

  head: {},

  components: { BaseForm, BaseButton },

  setup() {
    const { title } = useMeta()
    title.value = `Login / ${process.env.platformName}`

    const { $auth } = useContext()
    const route = useRoute()
    const router = useRouter()

    const isLoggedIn = computed(() => {
      return $auth.$state.loggedIn
    })

    const error = ref('')

    const identifier = ref('')
    const password = ref('')

    const validateLogin = computed(() => {
      return !!identifier.value && !!password.value
    })

    const resetInput = () => {
      identifier.value = ''
      password.value = ''
    }
    const resetError = () => {
      error.value = ''
    }
    async function loginUser() {
      if (!validateLogin.value) {
        return
      }
      error.value = ''
      try {
        await $auth.loginWith('local', {
          data: {
            identifier: identifier.value,
            password: password.value,
          },
        })

        resetInput()

        // Possible redirect to an article
        const redirectSlug = route.value.query.redirectSlug
        if (redirectSlug) {
          router.push({
            path: `/content/${redirectSlug}`,
          })
        }
      } catch (e: any) {
        const errorMessage = errorMessageFromResponse(e)
        error.value = errorMessage.replace('Identifier', 'Username or Email')
      }
    }

    return {
      error,
      identifier,
      isLoggedIn,
      loginUser,
      password,
      resetError,
    }
  },
})
</script>

<style lang="scss" scoped>
.login {
  &__title {
    margin-bottom: 2rem;
  }
}
</style>
