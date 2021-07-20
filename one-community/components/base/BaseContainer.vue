<template>
  <section v-if="containerType === 'color'" class="container container--color">
    <div class="container__inner">
      <slot> BASECONTAINER </slot>
    </div>
  </section>

  <section
    class="container"
    :class="containerType ? `container--${containerType}` : ''"
    v-else
  >
    <slot> BASECONTAINER </slot>
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
  setup() {},
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: $desktop-max-width;
  margin: 0 auto;
  padding: 5rem;

  @include respond(tab-landscape) {
    padding: 3rem;
  }

  &--color {
    max-width: none;
    width: 100%;
    background-color: $discovery-blue-4;
    padding: 0;
  }

  &__inner {
    max-width: $desktop-max-width;
    padding: 5rem;
    @include respond(tiny) {
      padding: 3rem;
    }
  }

  &--narrow {
    max-width: 630px;
  }
}
</style>
