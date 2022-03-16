<template>
  <NuxtLink :to="link.to" class="link">
    <img
      :src="require(`~/assets/icons/${link.icon}.svg`)"
      alt=""
      class="link__icon"
    />
    <p class="link__name">{{ link.name }}</p>
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    height: 3rem;
  }
  &__name {
    text-transform: uppercase;
    font-size: 0.875rem;
  }
}
</style>
