<template>
  <div class="logo" :class="{ 'logo--flat': isFlat }">
    <NuxtLink class="logo__link" to="/">
      <img
        v-if="isFlat"
        class="logo__image"
        src="@/assets/logo_dianegative_horizontal.svg"
        alt="home"
      />
      <img
        v-else
        class="logo__image"
        src="@/assets/logo_dianeg.svg"
        alt="home"
      />
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
  padding: 4rem;

  &--flat {
    padding: 1rem;

    & .logo__image {
      height: 3rem;
    }
  }

  &__link {
  }

  &__image {
    height: 7rem;
  }
}
</style>
