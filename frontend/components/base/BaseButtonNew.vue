<template>
  <button
    :class="`${buttonColor} responsive-${isResponsive}`"
    @click="navigateTo"
  >
    <slot>BASEBUTTONNEW</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    navRoute: {
      type: String,
      required: true,
    },
    buttonColor: {
      type: String,
      required: true,
    },
    isResponsive: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    function navigateTo() {
      this.$router.push({
        path: props.navRoute,
      })
    }

    return {
      navigateTo,
    }
  },
})
</script>

<style lang="scss" scoped>
button {
  padding: 0.3rem 2rem;
  margin: 2rem 0;
  font-family: 'Poppins-Bold', sans-serif;
  cursor: pointer;
  border-radius: 5px;
  background: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

button.white {
  color: $white;
  border: 1px solid $white;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-darker, 0.3);
  }
}

button.gray-lighter {
  color: $gray-lighter;
  border: 1px solid $gray-lighter;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-lighter, 0.3);
  }
}

button.gray-light {
  color: $gray-light;
  border: 1px solid $gray-light;

  &:hover {
    box-shadow: 4px 4px 10px rgba($gray-light, 0.3);
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

@media (max-width: 850px) {
  button.responsive-true {
    font-size: 0.9rem;
    padding: 0.2rem 1.5rem;
  }
}

@media (max-width: 700px) {
  button.responsive-true {
    font-size: 0.7rem;
    padding: 0.1rem 1rem;
  }
}

@media (max-width: 550px) {
  button.responsive-true {
    font-size: 1rem;
    padding: 0.3rem 2rem;
  }
}
@media (max-width: $max-width-phone) {
  button.responsive-true {
    font-size: 0.8rem;
    padding: 0.2rem 1.5rem;
  }
}
</style>
