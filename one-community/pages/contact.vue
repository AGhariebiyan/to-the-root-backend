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
      <BaseForm @submit="sendMessage">
        <template v-slot:form>
          <p class="form__heading">Let's Talk</p>
          <label class="form__label" for="firstname">First Name</label>
          <input
            class="form__input"
            type="text"
            name="firstname"
            v-model="firstName"
          />
          <label class="form__label" for="lastname">Last Name</label>
          <input
            class="form__input"
            type="text"
            name="lastname"
            v-model="lastName"
          />
          <label class="form__label" for="email">Email Address</label>
          <input class="form__input" type="text" name="email" v-model="email" />
          <label class="form__label" for="message">Message*</label>
          <textarea
            class="form__input"
            type="text"
            name="message"
            required
            v-model="message"
          ></textarea>
          <div class="contact__accept">
            <input type="checkbox" name="accept" v-model="accept" />
            <label for="accept"
              >I allow Ordina to store my email address and send me
              communications (no spam, we promise!)</label
            >
          </div>
          <BaseButton buttonType="primary" class="contact__submit-button"
            >Send Message</BaseButton
          >
        </template>
      </BaseForm>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const message = ref('')
    const accept = ref('')

    const isMessageFilled = computed(() => {
      return !!message.value
    })

    function sendMessage() {
      if (!isMessageFilled) {
        return
      }
      console.log(`
        name: ${firstName.value} ${lastName.value}
        email: ${email.value}
        message: ${message.value}
        accept: ${accept.value}
      `)
    }

    return {
      firstName,
      lastName,
      email,
      message,
      accept,
      sendMessage,
    }
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
textarea {
  resize: vertical;
}
.contact__accept {
  display: flex;
  input {
    margin-right: 1rem;
    position: relative;
    top: 0.2rem;
  }
}
.contact__submit-button {
  display: block;
  margin-top: 2rem;
}
</style>
