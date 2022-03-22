<template>
  <button :class="buttonColor">
    <img
      class="button-image"
      :src="require(`~/assets/icons/${icon}`)"
      :alt="icon"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    buttonColor: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  border-radius: 5px;
  background: none;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
}

.button-image {
  width: 1.5rem;
}

button.white {
  color: $white;
  border: 1px solid $white;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-darker, 0.3);
  }
}

button.gray-lighter {
  color: $gray-lightest;
  border: 1px solid $gray-lightest;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-lightest, 0.3);
  }
}

button.gray-light {
  color: $gray-lighter;
  border: 1px solid $gray-lighter;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-lighter, 0.3);
  }
}

button.gray {
  color: $gray;
  border: 1px solid $gray;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray, 0.3);
  }
}

button.gray-dark {
  color: $gray-dark;
  border: 1px solid $gray-dark;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-dark, 0.3);
  }
}

button.gray-darker {
  color: $gray-darker;
  border: 1px solid $gray-darker;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-darker, 0.3);
  }
}
</style>
