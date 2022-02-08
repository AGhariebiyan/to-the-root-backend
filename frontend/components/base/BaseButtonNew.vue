<template>
  <button :class="buttonColor">
    <slot>BASEBUTTONNEW</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    buttonColor: {
      type: String,
      required: true,
      validator(value: string) {
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
button {
  padding: 0.3rem 2rem;
  margin: 2rem 0;
  font-family: 'Poppins-Bold', sans-serif;
  cursor: pointer;
  border-radius: 5px;
  background: none;
  text-transform: uppercase;
}

button.white {
  color: $white;
  border: 1px solid $white;
}

button.gray-lighter {
  color: $gray-lighter;
  border: 1px solid $gray-lighter;
}

button.gray-light {
  color: $gray-light;
  border: 1px solid $gray-light;
}

button.gray {
  color: $gray;
  border: 1px solid $gray;
}

button.gray-dark {
  color: $gray-dark;
  border: 1px solid $gray-dark;
}

button.gray-darker {
  color: $gray-darker;
  border: 1px solid $gray-darker;
}
</style>
