<template>
  <div>
    <NuxtLink class="article-link" :to="`/content/${article.slug}`">
      <div class="card article">
        <div class="article__content">
          <h3 class="article__title">{{ article.title }}</h3>
        </div>
        <div class="article__image-container">
          <img
            class="article__image"
            :src="
              article.cover_image
                ? `${url}${article.cover_image.url}`
                : require('~/assets/img/rainbow_ordina.png')
            "
            :alt="article.cover_image"
          />
          <ReadLink class="article__read-link" :slug="article.slug" />
        </div>
      </div>
    </NuxtLink>
  </div>
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
}

.card {
  background: $black;
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
    width: 100%;
    height: calc(($article-card-height / 2.05) * 0.6);
    overflow: hidden;
    background-position: center;
    position: relative;
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.2s; /* Animation */
  }

  &__content {
    color: $text;
    padding: 1rem 1rem 0;
    height: calc(($article-card-height / 2.05) * 0.4);
  }

  &__title {
    text-transform: uppercase;
    font-family: 'Poppins-Bold', sans-serif;
    font-size: 1rem;
    margin-bottom: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__read-link {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
  }
}
</style>

