<template>
  <div class="wrapper">
    <div class="cookie-popup">
      <h3 class="cookie-popup__header">Cookie policy</h3>
      <p class="cookie-popup__paragraph">
        Our website uses cookies, which are necessary for functioning and
        required to achieve the purposes illustrated in the cookie policy.
      </p>
      <div class="cookie-popup__buttons">
        <button class="cookie-popup__accept" @click="accept">Accept</button>
        <a class="cookie-popup__learn-more" @click="learnMore" href="/cookies"
          >Learn more</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onAnalyticsReady } from 'vue-analytics'
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isLoading = ref(true)
    const context: any = useContext()
    const { $ga, $auth } = context

    const enableGoogleAnalytics = ref(false)

    function toggleGA() {
      // Note how the value of enableGoogleAnalytics is set to the new value after this method is called
      $ga.disable = enableGoogleAnalytics.value
    }

    onMounted(async () => {
      try {
        await onAnalyticsReady().then(() => {
          isLoading.value = false
        })
      } catch (err) {
        console.log(err)
      }
    })

    return { enableGoogleAnalytics, isLoading, toggleGA }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  height: 0;
}
.cookie-popup {
  background: $gray-darkest;
  color: $white;
  position: fixed;
  max-width: calc(max(20%, 15rem));
  padding: 1rem;
  right: 2rem;
  bottom: 2rem;
  text-align: left;

  &__header {
    margin-bottom: 1rem;
  }

  &__paragraph {
    margin-bottom: 1rem;
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__accept {
    cursor: pointer;
    padding: 1rem;
    margin-right: 2rem;
    color: $white;
    outline: none;
    background: $ordina-orange;
    border: none;

    &:hover {
      cursor: pointer;
      background: $ordina-orange-hover;
    }

    &:focus {
      outline: 1px dotted $ordina-orange;
    }
  }

  &__learn-more {
    text-decoration: none;
    font-size: 0.8rem;

    &:link,
    &:visited {
      color: $white;
    }

    &:hover,
    &:active {
      cursor: pointer;
      color: $discovery-blue-primary;
    }
  }
}
</style>
