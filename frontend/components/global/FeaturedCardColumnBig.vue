<template>
  <div>
    <NuxtLink class="article-link" :to="`/content/${article.slug}`">
      <div class="card article">
        <div class="article__content">
          <h5 class="article__author">
            <span class="article__author-prefix">by</span
            ><span class="article__author-name">{{ article.author.name }}</span>
          </h5>
          <h3 class="article__title">{{ article.title }}</h3>
          <p class="article__description">{{ formattedArticleContent }}</p>
          <div class="article__margin"></div>
          <div class="article__additional-info">
            <span class="article__date">{{ formattedDate }}</span>
            <span class="article__slash-icon">/</span>
            <span class="article__reading-time">{{ readingTime }}</span>
          </div>
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
import { formatDate, estimateReadingTime } from '~/utils/helpers'

export default defineComponent({
  props: {
    article: {
      type: Object as () => Article,
      required: true,
    },
  },
  setup(props) {
    const { $config } = useContext()

    const url: string = $config.strapiUrl

    const htmlToPlainTextRegExp = /<[^>]*>/g
    const propsArticle: Article = props.article
    const formattedArticleContent = propsArticle.content.replace(
      htmlToPlainTextRegExp,
      '',
    )

    const formattedDate = formatDate(propsArticle.original_date)

    const readingTime =
      Math.ceil(estimateReadingTime(formattedArticleContent).minutes) + ' min'

    return { url, formattedArticleContent, formattedDate, readingTime }
  },
})
</script>

<style lang="scss" scoped>
$card-image-height: 15rem;

$author-font-size: 0.9rem;
$title-font-size: 1.6rem;

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
    height: $card-image-height;
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
    padding: 1.5rem 2rem 0;
    position: relative;
  }

  &__author {
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  &__author-prefix {
    font-size: $author-font-size;
    font-family: 'Poppins-ExtraLight', sans-serif;
    margin-right: 0.2em;
  }

  &__author-name {
    font-size: $author-font-size;
    font-family: 'Poppins-Bold', sans-serif;
  }

  &__title {
    text-transform: uppercase;
    font-family: 'Poppins-Bold', sans-serif;
    font-size: $title-font-size;
    line-height: 2.3rem;
    margin-bottom: 1.8rem;
  }

  &__description {
    font-size: 0.95rem;
    font-family: 'Poppins-Medium', sans-serif;
    color: $icons;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__margin {
    height: 4rem;
  }

  &__additional-info {
    position: absolute;
    bottom: 1rem;
  }

  &__additional-info {
    position: absolute;
    bottom: 1rem;
  }

  &__date,
  &__reading-time {
    color: $icons;
    font-size: 0.8rem;
    font-family: 'Poppins-Light', sans-serif;
  }

  &__slash-icon {
    color: $icons;
    font-size: 0.8rem;
    font-family: 'Poppins-Bold', sans-serif;
    margin: 0 0.3rem;
  }

  &__read-link {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
  }
}
</style>

