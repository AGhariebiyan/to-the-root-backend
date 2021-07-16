<template>
  <form class="form" @submit.prevent="$emit('submit')">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
.form {
  padding: 3rem;
  background-color: $accelerate-blue-5;

  &__heading {
    font-family: 'RobotoLight';
    margin-bottom: 1rem;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
  }

  &__label {
    display: inline-block;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }

  &__buttons {
    margin-top: 2rem;
  }

  &__button {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  &__error-message {
    padding: 0.5rem;
    border: $danger-red solid 1px;
    background-color: rgba($danger-red, 0.2);
  }
}
</style>
