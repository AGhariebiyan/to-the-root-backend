<template>
  <div class="logo" :class="{ 'logo--flat': isFlat }">
    <NuxtLink class="logo__link" to="/">
      <div class="logo__img" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    isFlat: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  padding: 4rem;

  &--flat {
    padding: 1rem;

    & .logo__img {
      background-image: url(~/assets/logo_dianegative_horizontal.svg);
      height: 50px;
      width: 152px;
    }
  }

  &__link {
  }

  &__image {
    height: 7rem;
  }

  &__img {
    background-image: url(~/assets/logo_dianeg.svg);
    background-size: cover;
    height: 112px;
    width: 135px;
    transition: height $header-transition-time ease;
  }
}
</style>
