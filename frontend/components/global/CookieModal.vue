<template>
  <div class="wrapper">
    <div class="cookie-popup">
      <h3 class="cookie-popup__header">We use cookies</h3>
      <p class="cookie-popup__paragraph">
        Our website uses cookies, which are necessary for functioning and
        analysis of our website.
      </p>
      <div class="cookie-popup__buttons">
        <button class="cookie-popup__accept" @click="acceptCookies">
          Got it
        </button>
        <a
          class="cookie-popup__learn-more"
          href="https://www.cookiesandyou.com/"
          >Learn more</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, context) {
    const use_context: any = useContext()

    const { $gtm, $cookies } = use_context

    function acceptCookies() {
      $cookies.set('allowsCookies', 'true')
      $gtm.init()
      context.emit('close')
    }

    return { acceptCookies }
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
  max-width: calc(max(30%, 15rem));
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
