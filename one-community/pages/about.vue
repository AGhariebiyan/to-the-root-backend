<template>
  <BaseContainer>
      <h1>ABOUT</h1>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, useStore } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const store = useStore();
  },
})
</script>

<style lang="scss" scoped></style>