<template>
  <div class="divider">
    <span class="divider__slashes" :class="slashColor">///</span
    ><slot>BASEHEADERDIVIDER</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    slashColor: {
      type: String,
      required: true,
      validator(value: string) {
        return ['orange', 'blue'].includes(value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.divider {
  background: $black;
  color: $text;
  text-transform: uppercase;
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 1.4rem;
  padding: 0.75em 1.4em;
  margin-bottom: 0.7rem;

  &__slashes {
    font-family: 'Code-Next-ExtraBold', sans-serif;
    font-size: 1.6rem;
    margin-right: 0.7em;
    letter-spacing: -0.2em;
  }

  &__slashes.orange {
    color: $ordina-orange;
  }

  &__slashes.blue {
    color: $ordina-blue;
  }
}
</style>
