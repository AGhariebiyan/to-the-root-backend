<template>
  <div class="card" :class="cardType">
    <slot> BASECARD </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
})
</script>

<style lang="scss" scoped>
.card {
  width: $article-card-width;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin: 0 0.5rem 3rem;
  background: $white;

  @include respond(tab-landscape) {
    width: $article-card-width-landscape;
  }
}
.article {
  &:hover {
    cursor: pointer;
    overflow: hidden;

    .article__image {
      transform: scale(1.1);
    }
  }
  &__image-container {
    height: $article-card-image-height;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: $article-card-image-height;
    object-fit: cover;
    border-radius: 3px 3px 0 0;
    transition: transform 0.2s; /* Animation */
  }

  &__content {
    padding: 1.3rem;
  }
  &__description {
    font-size: 1.125rem;
    height: $line-height * 4;
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
      height: 3 * $line-height;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1) 90%
      );
    }
  }

  &__button {
    margin-top: 2rem;
  }

  &__title {
    margin-top: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .card__date {
    color: $gray-dark;
  }
}
</style>
