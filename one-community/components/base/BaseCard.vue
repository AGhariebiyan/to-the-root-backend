<template>
  <div class="card" :class="cardType">
    <slot> BASECARD </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    cardType: {
      type: String,
      required: true,
      default: 'article',
      validator(value: string) {
        return ['article', 'general'].includes(value)
      },
    },
  },
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
.article {
  // article card styles here
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom: 3rem;
  img {
    width: 100%;
    max-height: 219px;
    object-fit: cover;
    border-radius: 3px;
  }
  .card__content {
    padding: 1.3rem;
    .card__description {
      font-size: 18px;
      height: 65px;
      max-height: 65px;
      overflow: hidden;
    }
    button {
      margin-top: 2rem;
    }
    h3 {
      margin-top: 1.3rem;
    }
    .card__date {
      color: $gray-dark;
    }
  }
}

.general {
  // general card styles here
}
</style>
