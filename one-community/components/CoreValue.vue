<template>
  <div class="core-value">
    <img class="core-value__icon" :src="coreValue.icon" alt="fds" />
    <h3 class="core-value__heading">{{ coreValue.heading }}</h3>
    <p class="core-value__description">{{ coreValue.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    coreValue: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.core-value {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__icon {
  }

  &__heading {
  }

  &__description {
    text-align: center;
  }
}
</style>
