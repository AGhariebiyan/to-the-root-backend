<template>
  <form @submit.prevent="$emit('submit')">
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
.heading {
  align-self: flex-start;
  font-family: 'Roboto';
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: 1.125rem;
}

form {
  width: 20rem;
  padding: 3rem;
  background-color: $accelerate-blue-5;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
}

label {
  font-size: 0.75rem;
}

.buttons {
  margin-top: 2rem;
}
</style>
