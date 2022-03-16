<template>
  <div class="wrapper">
    <NuxtLink :to="link.to" class="link">
      <img
        v-if="!isMobile"
        :src="require(`~/assets/icons/${link.icon}.svg`)"
        alt=""
        class="link__icon"
      />
      <p class="link__name">{{ link.name }}</p>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;

  &.nuxt-link-exact-active {
    color: $accelerate-blue-primary;
    border-bottom: 3px solid $accelerate-blue-primary;
  }

  &__icon {
    height: 3rem;
  }

  &__name {
    text-transform: uppercase;
  }
}
</style>
