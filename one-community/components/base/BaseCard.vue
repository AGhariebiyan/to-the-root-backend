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
      default: 'article',
      validator(value: string) {
        return ['article'].includes(value)
      },
    },
  },
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom: 3rem;
  width: 21.875rem;
}
.article {
  img {
    width: 100%;
    height: 13.6875rem;
    object-fit: cover;
    border-radius: 3px 3px 0 0;
  }
  .card__content {
    padding: 1.3rem;
    .card__description {
      font-size: 1.125rem;
      height: calc($line-height * 4);
      line-height: $line-height;
      overflow: hidden;
      position: relative;
      &:after {
        content: '';
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: $line-height;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 1) 90%
        );
      }
    }
    button {
      margin-top: 2rem;
    }
    h3 {
      margin-top: 1.3rem;
      margin-bottom: 0.75rem;
    }
    .card__date {
      color: $gray-dark;
    }
  }

  @include respond(tab-landscape) {
    width: 18rem;
  }
}
</style>
