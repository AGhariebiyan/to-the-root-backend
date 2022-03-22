<template>
  <div>
    <NuxtLink class="read-link" :to="`/content/${slug}`"
      ><div v-if="readEstimate" class="read-link__button--big">
        <div class="read-link__read">Read</div>
        <div class="read-link__estimate">{{ readEstimate }} min.</div>
      </div>
      <div v-else class="read-link__button--small">
        <div class="read-link__read">Read</div>
      </div></NuxtLink
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
    readEstimate: {
      type: Number,
      required: false,
    },
  },
})
</script>

<style lang='scss' scoped>
.read-link {
  text-decoration: none;
  color: $black;

  &__button {
    &--big {
      background: $ordina-orange;
      padding: 0.6rem 1.2rem;
      position: relative;
    }

    &--small {
      background: $ordina-orange;
      padding: 0.05rem 1.2rem;
    }
  }

  &__read {
    font-size: 0.95rem;
    text-transform: uppercase;
    font-family: 'Poppins-Black', sans-serif;
  }

  &__estimate {
    font-family: 'Poppins-ExtraBold', sans-serif;
    font-size: 0.5rem;
    position: absolute;
    bottom: -0.45rem;
    right: 0.15rem;
  }
}
</style>