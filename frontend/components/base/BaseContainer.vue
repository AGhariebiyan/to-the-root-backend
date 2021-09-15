<template>
  <section
    class="container"
    :class="[containerType ? `container--${containerType}` : '']"
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
  padding: 5rem 0;

  &__inner {
    max-width: $desktop-max-width;
    width: 80%;
    display: flex;
    flex-direction: column;

    @include respond(tab-portrait) {
      width: 90%;
    }
  }

  &--narrow > .container__inner {
    max-width: $desktop-half-width;
  }

  &--color {
    background-color: $discovery-blue-4;
  }
}
</style>
