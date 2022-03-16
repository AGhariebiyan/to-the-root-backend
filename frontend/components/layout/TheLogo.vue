<template>
  <div class="logo">
    <NuxtLink class="logo__link" to="/">
      <img
        v-if="isFlat"
        class="logo__image"
        src="@/assets/logo.svg"
        alt="home"
      />
      <img v-else class="logo__image" src="@/assets/logo.svg" alt="home" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    isFlat: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  padding: 2rem;

  &__link {
  }

  &__image {
    height: 6rem;
  }
}
</style>
