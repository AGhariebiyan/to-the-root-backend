<template>
  <div class="oops-wrapper">
    <div class="wrapper">
      <h1 class="form-header"><slot name="header"></slot></h1>
      <p class="form-paragraph"><slot name="paragraph"></slot></p>

      <p class="form-paragraph" v-if="isLoading">hold on...</p>

      <h3 class="confirmation-text" v-else-if="hasSubscribed">
        You're on the list!
      </h3>

      <form v-else ref="form" class="mailing-form" @submit.prevent="sendEmail">
        <ul class="mailing-form error-list">
          <li class="mailing-form error" v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>

        <div class="mailing-form__email">
          <input
            class="mailing-form__email-input"
            type="text"
            placeholder="subscribe@totheroot.com"
            v-model="email"
          />
        </div>

        <div>
          <button class="new-button" :disabled="!email.length" type="submit">
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, useContext } from '@nuxtjs/composition-api'
import { validateEmail, sendEmail } from '~/utils/email'

export default defineComponent({
  name: 'MailingListForm',

  props: {
    interest: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $auth } = useContext()

    const initialEmailValue: string =
      $auth.user?.email !== undefined ? String($auth.user?.email) : ''
    const email: Ref<string> = ref(initialEmailValue)
    const errors: Ref<string[]> = ref([])
    const isLoading = ref(false)
    const hasSubscribed = ref(false)

    async function applyForMailingList() {
      errors.value = []

      if (email.value.trim() === '') {
        errors.value.push('Please enter your email address')
        return
      }

      if (!validateEmail(email.value)) {
        errors.value.push('Please enter a valid email address')
        return
      }

      isLoading.value = true

      const templateParams = {
        interest: props.interest,
        email: email.value,
      }

      const emailResponse = await sendEmail(
        'template_mailing_list',
        templateParams,
      )

      if (emailResponse) {
        if (emailResponse.status === 200) {
          hasSubscribed.value = true
        } else {
          errors.value.push(`Something went wrong: ${emailResponse.text}`)
        }
      }

      isLoading.value = false
    }

    return {
      email,
      applyForMailingList,
      errors,
      isLoading,
      hasSubscribed,
    }
  },
})
</script>

<style lang="scss" scoped>
.oops-wrapper {
  background: linear-gradient(
      0deg,
      rgba($accelerate-blue-primary, 0.5),
      rgba($accelerate-blue-primary, 0.5)
    ),
    url('https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2420&q=80');
  background-size: cover;
}

.wrapper {
  background: $accelerate-blue-primary;
  max-width: 40rem;
  margin: 10rem auto;
  padding: 4rem;
  text-align: center;
  color: $white;

  .form-paragraph {
    padding: 2rem 0;
  }
}

.mailing-form {
  &__email-input {
    width: 20rem;
    padding: 0.7rem;
    margin: 0.6rem 0 2rem;
    border: none;
    background-color: $discovery-blue-primary;
    color: $white;
    text-align: center;
    border-left: 0 solid $ordina-orange;
    transition: all 0.2s ease;

    &:focus {
      border-left: 0.5rem solid $ordina-orange;
      padding-left: 0.2rem;
      outline: none;

      &::placeholder {
        color: transparent;
      }
    }

    &::placeholder {
      color: $gray;
    }
  }
}

.error-list {
  margin: 0 auto;
  width: 20rem;
}

@media only screen and (max-width: 500px) {
  .wrapper {
    margin: 0;
  }

  .mailing-form {
    &__email-input {
      width: 100%;
    }
  }
}
</style>