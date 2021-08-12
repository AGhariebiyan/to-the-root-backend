<template>
  <button :class="buttonType">
    <slot>BASEBUTTON</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    buttonType: {
      type: String,
      required: true,
      validator(value: string) {
        return ['primary', 'secondary', 'transparent', 'warning', 'danger', 'pill'].includes(
          value,
        )
      },
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  height: 3.125rem;
  padding: 0.875rem;
  font-family: 'RobotoBold', sans-serif;
  font-weight: 800;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button a {
  text-decoration: none;
  color: inherit;

  &:hover, 
  &:active {
    text-decoration: none;
  }
}

button.primary {
  color: $white;
  background-color: $discovery-blue-primary;
  &:active,
  &:hover {
    background-color: $discovery-blue-primary-hover;
  }
}

button.secondary {
  background-color: $accelerate-blue-3;
  &:active,
  &:hover {
    background-color: $accelerate-blue-3-hover;
  }
}

button.transparent {
  background-color: $transparent;
  color: $discovery-blue-primary;
  &:active,
  &:hover {
    color: $gray-darkest;
    background-color: $transparent-hover;
  }
}

button.warning {
  background-color: $warning-yellow;
  &:active,
  &:hover {
    background-color: $warning-yellow-hover;
  }
}

button.danger {
  color: $white;
  background-color: $danger-red;
  &:active,
  &:hover {
    background-color: $danger-red-hover;
  }
}

button.pill {
  height: 1.6875rem;
  padding: 0.43rem;
  border-radius: 1.25rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  background-color: $discovery-blue-4;

  a {
    font-size: 0.875rem;
  }

  &:active,
  &:hover {
    background-color: $discovery-blue-4-hover;
  }
}
</style>
