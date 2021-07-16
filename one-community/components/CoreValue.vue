<template>
  <div class="core-value">
    <img class="core-value__icon" :src="iconImage" alt="" />
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

  setup(props) {
    const iconImage = require(`../assets/${props.coreValue.icon}.svg`)
    return { iconImage }
  },
}
</script>

<style lang="scss" scoped>
.core-value {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__icon {
    height: 7rem;
  }

  &__heading {
    font-family: 'Roboto';
    margin-top: 0.5rem;
    padding-bottom: 0.625rem;
    border-bottom: solid $discovery-blue-primary 0.1875rem;
    margin-bottom: 1.25rem;
  }

  &__description {
    text-align: center;
  }
}
</style>
