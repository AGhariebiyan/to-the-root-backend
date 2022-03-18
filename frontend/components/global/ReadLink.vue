<template>
  <div>
    <NuxtLink class="read-link" :to="`/content/${slug}`"
      ><p class="read-link__button">Read</p></NuxtLink
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang='scss' scoped>
.read-link {
  text-decoration: none;
  color: $black;

  &__button {
    background: $ordina-orange;
    padding: 0.05rem 1.2rem;
    font-size: 0.95rem;
    font-family: 'Poppins-Black', sans-serif;
    text-transform: uppercase;
  }
}
</style>