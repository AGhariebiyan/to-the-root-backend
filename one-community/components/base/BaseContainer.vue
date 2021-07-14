<template>
  <div
    v-if="containerType === 'color'"
    class="container"
    :class="containerType"
  >
    <div class="color-container__inner">
      <slot> BASECONTAINER </slot>
    </div>
  </div>
  <div class="container" v-else>
    <slot> BASECONTAINER </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    containerType: {
      type: String,
      validator(value: string) {
        return ['color', 'narrow-grid'].includes(value)
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
  max-width: 1260px;
  margin: 0 auto;
  padding: 5rem;
}

.container.color {
  max-width: none;
  background-color: $discovery-blue-4;
  padding: 5rem;
  .color-container__inner {
    max-width: 1260px;
  }
}

.container.narrow-grid {
  max-width: 630px;
}

@media screen and (max-width: 48em) {
  .container,
  .container.color {
    padding: 3rem;
  }
}
</style>
