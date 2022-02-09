<template>
  <div class="flex-container">
    <LayoutTheHeader />
    <Nuxt />
    <LayoutTheFooter />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss">
* {
  font-family: 'Roboto', sans-serif;
  font-size: $default-font-size;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
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
  font-family: 'RobotoBold', sans-serif;
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

.link {
  text-decoration: none;
  color: $ordina-orange;

  &:focus,
  &:hover {
    color: $ordina-orange-hover;
  }
}

.secondary-link {
  text-decoration: none;
  color: inherit;
  &:link,
  &:visited {
  }

  &:hover,
  &:active {
    text-decoration: underline;
  }
}

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

a {
  color: $discovery-blue-primary-darker;
  &:active,
  &:hover {
    color: $gray-darkest;
  }

  &.button-link {
    color: $white;
    background-color: $discovery-blue-primary;
    border-radius: 3px;
    display: inline-block;
    font-family: 'RobotoBold', sans-serif;
    height: 3.125rem;
    padding: 0.875rem;
    text-decoration: none;
    line-height: 1.5rem;

    &:active,
    &:hover {
      background-color: $discovery-blue-primary-hover;
    }

    &--transparent {
      background-color: $transparent;
      color: $discovery-blue-primary;
      &:active,
      &:hover {
        color: $gray-darkest;
        background-color: $transparent-hover;
      }
    }
  }
}

.new-button {
  color: $white;
  border: none;
  background-color: $ordina-orange;
  border-radius: 50px;
  display: inline-block;
  font-family: 'RobotoBold', sans-serif;
  height: 3.125rem;
  padding: 0.875rem 2rem;
  text-decoration: none;
  line-height: 1.5rem;

  &:active,
  &:hover {
    background-color: $ordina-orange-hover;
    color: $white;
  }

  &:disabled {
    background-color: $gray-darker;
    color: $gray;
    cursor: not-allowed;
  }
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
