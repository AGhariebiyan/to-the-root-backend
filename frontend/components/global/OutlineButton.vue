<template>
  <button class="outline-button" :class="color">
    <slot>OUTLINE BUTTON</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    color: {
      type: String,
      required: true,
      validator(this: void, value: string) {
        return [
          'white',
          'gray-lighter',
          'gray-light',
          'gray',
          'gray-dark',
          'gray-darker',
        ].includes(value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.outline-button {
  padding: 0.3rem 2rem;
  margin: 2rem 0;
  font-family: 'Poppins-Bold', sans-serif;
  cursor: pointer;
  border-radius: 5px;
  background: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.outline-button.white {
  color: $white;
  border: 1px solid $white;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-darker, 0.3);
  }
}

.outline-button.gray-lighter {
  color: $gray-lighter;
  border: 1px solid $gray-lighter;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-lighter, 0.3);
  }
}

.outline-button.gray-light {
  color: $gray-light;
  border: 1px solid $gray-light;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-light, 0.3);
  }
}

.outline-button.gray {
  color: $gray;
  border: 1px solid $gray;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray, 0.3);
  }
}

.outline-button.gray-dark {
  color: $gray-dark;
  border: 1px solid $gray-dark;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-dark, 0.3);
  }
}

.outline-button.gray-darker {
  color: $gray-darker;
  border: 1px solid $gray-darker;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-darker, 0.3);
  }
}
</style>
