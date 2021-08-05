<template>
  <section v-if="containerType === 'color'" class="container container--color">
    <div class="container__inner" :class="{ 'flex-col': flexCol }">
      <slot> BASECONTAINER </slot>
    </div>
  </section>

  <section
    class="container"
    :class="
      (containerType ? `container--${containerType}` : '',
      { 'flex-col': flexCol })
    "
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
    flexCol: {
      type: Boolean,
      default: false,
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
  @include respond(tab-portrait) {
    padding: 2rem;
  }
  @include respond(phone) {
    padding: 1rem;
  }
  @include respond(tiny) {
    padding: 0.5rem;
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
    max-width: $desktop-half-width;
    padding: 3rem;
    @include respond(tab-portrait) {
      padding: 2rem;
    }
    @include respond(phone) {
      padding: 1rem;
    }
    @include respond(tiny) {
      padding: 0.5rem;
    }
  }
}
.flex-col {
  flex-direction: column;
}
</style>
