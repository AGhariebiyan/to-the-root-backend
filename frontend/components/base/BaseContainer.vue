<template>
  <section
    class="container"
    :class="[
      containerType ? `container--${containerType}` : '',
      containerDirection ? `container--${containerDirection}` : '',
    ]"
  >
    <div class="container__inner">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    containerDirection: {
      type: String,
      default: 'column',
      validator(value: string) {
        return ['column', 'row'].includes(value)
      },
    },
    containerType: {
      type: String,
      validator(value: string) {
        return ['color', 'narrow'].includes(value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.margin-zero-auto {
  margin: 0 auto;
}

.container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;

  &__inner {
    max-width: $desktop-max-width;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  &--row > .container__inner {
    flex-direction: row;
  }

  &--narrow > .container__inner {
    max-width: $desktop-half-width;
  }

  &--color {
    background-color: $discovery-blue-4;
  }
}
</style>
