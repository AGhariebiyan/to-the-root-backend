<template>
  <NuxtLink class="article-link" :to="`/content/${article.slug}`">
    <div class="card article">
      <div class="article__image-container">
        <img
          class="article__image"
          :src="
            article.cover_image
              ? `${url}${article.cover_image.url}`
              : require('~/assets/img/rainbow_ordina.png')
          "
          alt=""
        />
      </div>
      <div class="article__content">
        <h3 class="article__title">{{ article.title }}</h3>
        <p class="article__description">{{ article.description }}</p>
      </div>
      <div class="article__tags">
        <NuxtLink
          to="#"
          class="btn btn-pill"
          v-for="(tag, index) in article.tags"
          :key="index"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { Article } from '~/utils/types'

export default defineComponent({
  props: {
    article: {
      type: Object as () => Article,
      required: true,
    },
  },
  setup() {
    const { $config } = useContext()
    const url: string = $config.strapiUrl
    return { url }
  },
})
</script>

<style lang="scss" scoped>
.article-link {
  text-decoration: none;
  color: inherit;
  flex: 0 1 31%;
  margin-bottom: 1rem;

  @include respond(tab-landscape) {
    flex-basis: 46%;
  }

  @media screen and (max-width: 42em) {
    flex-basis: 100%;
  }
}
.card {
  box-shadow: $box-shadow-small;
  border-radius: 3px;
  background: $white;
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
    height: 13.6875rem;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 13.6875rem;
    object-fit: cover;
    border-radius: 3px 3px 0 0;
    transition: transform 0.2s; /* Animation */
  }

  &__content {
    padding: 0 1.3rem;
    height: 10rem;
    overflow-y: hidden;
    position: relative;

    &:after {
      content: '';
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 4 * $line-height;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }

  &__title {
    margin-top: 1.3rem;
    margin-bottom: 0.75rem;
  }

  &__description {
    font-size: 1.125rem;
    line-height: $line-height;
    overflow: hidden;
    position: relative;
  }

  &__tags {
    height: 3.5rem;
    padding: 1rem 1.3rem;

    .pill:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>
