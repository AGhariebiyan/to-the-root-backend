<template>
  <BaseModal @close="$emit('close')">
    <template slot="heading">Google Analytics</template>
    <template slot="content">
      <p class="ga-disclaimer-text">
        We like to use Google Analytics to monitor behaviour of visitors of our
        site. This enables us to give you the best experience possible. It also
        helps us prioritize our backlog.
      </p>
      <div class="toggle">
        <input
          type="checkbox"
          id="toggle__input"
          class="toggle__input"
          checked="checked"
          v-model="enableGoogleAnalytics"
        />
        <label class="toggle__label" for="toggle__input"
          >Enable Google Analytics</label
        >
        <div class="toggle__switch"></div>
      </div>
    </template>
  </BaseModal>
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
    const context: any = useContext()
    const { $ga } = context

    onMounted(async () => {
      try {
        await onAnalyticsReady().then(() => {
          if (true) {
            $ga.enable() // Activate module
          }
        })
      } catch (err) {
        console.log(err)
      }
    })

    console.log($ga)

    const enableGoogleAnalytics = ref(false)

    return { enableGoogleAnalytics }
  },
})
</script>

<style lang="scss" scoped>
.ga-disclaimer-text {
  margin-bottom: 1rem;
}

.toggle {
  display: flex;
  align-items: center;
  position: relative;

  &__label {
    padding: 1rem 4.5rem 1rem 0rem;
    margin-right: -3.5rem;
    position: relative;
    cursor: pointer;
    z-index: 100;
  }

  &__switch {
    width: 3.5rem;
    height: 2rem;
    border-radius: 100px;
    background-image: linear-gradient(to right, $gray-darkest, $gray-darker);
    position: relative;

    &::before {
      transition: all 0.8s ease;
      position: absolute;
      left: 0.25rem;
      top: 50%;
      transform: translate(0, -50%);
      content: '';
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
    left: 1rem;
  }

  &__input:checked ~ .toggle__switch::before {
    transform: translate(1.525rem, -50%);
  }

  &__input:checked ~ .toggle__switch {
    background-image: linear-gradient(
      to right,
      $accelerate-blue-primary,
      $discovery-blue-primary
    );
  }
}
</style>
