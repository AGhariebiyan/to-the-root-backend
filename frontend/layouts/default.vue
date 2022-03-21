<template>
  <div class="flex-container">
    <LayoutTheHeader
      :is-large-screen="isLargeScreen"
      :has-scrolled-down="hasScrolledDown"
    />
    <Nuxt
      :class="{
        'padding-small': hasScrolledDown,
        'padding-mobile': !isLargeScreen,
      }"
    />
    <LayoutTheFooter />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const largeScreenSize = 1024
    const scrollDownHeight = 200
    const isMounted = ref(false)
    const isLargeScreen = ref(true)
    const hasScrolledDown = ref(false)

    function resizeHandler() {
      isLargeScreen.value = window.innerWidth >= largeScreenSize
    }

    function onScroll() {
      if (
        !hasScrolledDown.value &&
        Math.round(document.documentElement.scrollTop) > scrollDownHeight
      ) {
        hasScrolledDown.value = true
      } else if (
        hasScrolledDown.value &&
        Math.round(document.documentElement.scrollTop) <= scrollDownHeight
      ) {
        hasScrolledDown.value = false
      }
    }

    onMounted(() => {
      isMounted.value = true
      window.addEventListener('resize', resizeHandler)
      isLargeScreen.value = window.innerWidth >= largeScreenSize

      if (Math.round(document.documentElement.scrollTop) > scrollDownHeight) {
        hasScrolledDown.value = true
      }

      window.onscroll = () => {
        onScroll()
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    return {
      hasScrolledDown,
      isLargeScreen,
      isMounted,
    }
  },
})
</script>

<style lang="scss">
* {
  font-family: 'Poppins', sans-serif;
  font-size: $default-font-size;
  word-spacing: 1px;
  letter-spacing: $letter-spacing;
  line-height: $line-height;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

main {
  padding-top: $header-height-large;
  transition: padding $header-transition-time ease;
}

main.padding-small {
  padding-top: $header-height-small;
}

main.padding-mobile {
  padding-top: $header-height-mobile;
}

.flex-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Poppins-Bold', sans-serif;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.25rem;
}

h3 {
  font-size: 1.5rem;
}

// Buttons and anchors (links)
.btn {
  height: 3.125rem;
  padding: 0.875rem;
  font-family: 'Poppins-Bold', sans-serif;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: $white;

  text-decoration: none;

  &-primary,
  &-primary:link,
  &-primary:visited {
    background-color: $discovery-blue-primary;

    &:hover {
      background-color: $discovery-blue-primary-hover;
    }
  }

  &-secondary,
  &-secondary:link,
  &-secondary:visited {
    background-color: $accelerate-blue-3;
    color: $gray-darker;

    &:hover {
      background-color: $accelerate-blue-3-hover;
    }
  }

  &-pill {
    height: 1.6875rem;
    padding: 0.43rem;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    color: $gray-darker;
    background-color: $discovery-blue-4;

    &:hover {
      background-color: $discovery-blue-4-hover;
    }
  }

  &-transparent {
    background-color: $transparent;
    color: $discovery-blue-primary;

    &:active,
    &:hover {
      color: $gray-darkest;
      background-color: $transparent-hover;
    }
  }

  &-orange {
    background-color: $ordina-orange;
    border-radius: 50px;
    display: inline-block;
    padding: 0.875rem 2rem;
    line-height: 1.5rem;

    &:active,
    &:hover {
      background-color: $ordina-orange-hover;
    }
  }

  &:disabled {
    background-color: $gray;
    color: $gray-light;
    cursor: not-allowed;
  }
}

.btn-outline {
  font-family: 'Poppins-Bold', sans-serif;
  text-decoration: none;
  padding: 0.3rem 2rem;
  margin: 2rem 0;
  border-radius: 5px;
  background: none;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: $ordina-orange;
    border: 1px solid $ordina-orange;
  }

  &--white {
    color: $white;
    border: 1px solid $white;
  }

  &--gray {
    color: $gray;
    border: 1px solid $gray;
  }

  &--gray-dark {
    color: $gray-dark;
    border: 1px solid $gray-dark;
  }

  &--gray-darker {
    color: $gray-darker;
    border: 1px solid $gray-darker;
  }
}

p > a {
  text-decoration: none;
  color: $ordina-orange;

  &:focus,
  &:hover {
    color: $ordina-orange-hover;
  }
}

// Blockquote

blockquote {
  padding: 1rem 2rem;
  border-left: 0.125rem solid $gray-dark;
  background: $gray-light;
  font-style: italic;
}

// Inline code
code {
  display: inline-block;
  background-color: $gray-light;
  font-family: 'Monaco', 'Consolas', 'Monospace';
  font-size: 0.875rem;
  padding: 0.1875rem;
  border-radius: 0.1875rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.article__content > p {
  margin-bottom: 1rem;
}

.article__content > .image > img {
  max-width: 100%;
}

.error-list,
.warning-list,
.success-list {
  list-style: none;
}

.error-list {
  background: $error-red;
}

.warning-list {
  background: $warning-yellow;
}

.success-list {
  background: $success-green;
}

.error,
.warning,
.success {
  margin: 1rem 0;
  color: $white;
  padding: 10px;
}

.warning {
  color: black;
}
</style>
