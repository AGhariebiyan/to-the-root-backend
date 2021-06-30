<template>
  <button>
    <slot> BASEBUTTON </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped></style>
