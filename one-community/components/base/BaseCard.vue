<template>
  <div>
    <slot> BASECARD </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    type: {
      cardType: String,
      required: true,
      default: 'article',
      validator(value: string) {
        return ['article', 'general'].includes(value)
      },
    },
  },
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
.article {
  // article card styles here
}

.general {
  // general card styles here
}
</style>
