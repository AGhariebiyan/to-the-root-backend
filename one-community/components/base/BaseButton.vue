<template>
  <button :class="buttonType">
    <slot>BASEBUTTON</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    buttonType: {
      type: String,
      required: true,
      validator(value: string) {
        return ['primary', 'secondary', 'warning', 'danger', 'pill'].includes(
          value,
        )
      },
    },
  },
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
button {
  height: 50px;
  padding: 14px;
  font-family: 'RobotoBold', sans-serif;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button.secondary {
  background-color: $accelerate-blue-3;
  &:hover {
    background-color: $accelerate-blue-3-hover;
  }
}

button.primary {
  color: $white;
  background-color: $discovery-blue-primary;
  &:hover {
    background-color: $discovery-blue-primary-hover;
  }
}

button.warning {
  background-color: $warning-yellow;
  &:hover {
    background-color: $warning-yellow-hover;
  }
}

button.danger {
  color: $white;
  background-color: $danger-red;
  &:hover {
    background-color: $danger-red-hover;
  }
}

button.pill {
  height: 27px;
  padding: 7px;
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  background-color: $discovery-blue-4;
  &:hover {
    background-color: $discovery-blue-4-hover;
  }
}
</style>
