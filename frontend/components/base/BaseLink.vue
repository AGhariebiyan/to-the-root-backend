<template>
  <NuxtLink :class="type" :to="to">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: '',
      validator(value: string) {
        return ['test', ''].includes(value)
      },
    },
  },
})
</script>

<style lang="scss" scoped>
// Add button like styling here
.nuxt-link-active {
  color: red;
}
.nuxt-link-exact-active {
  color: blue;
}
</style>
