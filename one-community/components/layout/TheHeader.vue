<template>
  <header>
      <nav>
        <NuxtLink to="/">Community</NuxtLink>
        <NuxtLink to="/content">Content</NuxtLink>
        <NuxtLink to="/events">Events</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink to="/about">About Ordina</NuxtLink>
      </nav>
  </header>
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