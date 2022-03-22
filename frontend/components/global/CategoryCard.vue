<template>
  <div class="card">
    <h3 class="title">{{ categoryName }}</h3>

    <NuxtLink
      class="featured-article"
      v-for="article in featuredArticle"
      :key="article.id"
      :to="`/content/${article.slug}`"
    >
      <div>
        <div class="featured-article__content">
          <NuxtLink
            class="featured-article__author-link"
            :to="`/author/${article.author.id}`"
          >
            <h5 class="featured-article__author">
              <span class="featured-article__author-prefix">by</span
              ><span class="featured-article__author-name">{{
                article.author.name
              }}</span>
            </h5>
          </NuxtLink>
          <h3 class="featured-article__title">{{ article.title }}</h3>
        </div>
        <div class="featured-article__image-container">
          <img
            class="featured-article__image"
            :src="
              article.cover_image
                ? `${url}${article.cover_image.url}`
                : require('~/assets/img/rainbow_ordina.png')
            "
            :alt="article.cover_image"
          />
        </div>
        <div class="featured-article__read-link-margin"></div>
        <ReadLink class="featured-article__read-link" :slug="article.slug" />
      </div>
    </NuxtLink>

    <div class="divider"></div>

    <div class="article-list">
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        class="article-list__article-link"
        :to="`/content/${article.slug}`"
      >
        <p class="article-list__article-arrow">></p>
        <!-- <p class="article-list__article-slash">/</p> -->
        <p class="article-list__article-title">{{ article.title }}</p>
      </NuxtLink>
    </div>

    <div class="more-button">
      <div class="more-button__margin"></div>
      <NuxtLink class="more-button__link" :to="`/search`"
        ><p class="more-button__text">More</p></NuxtLink
      >
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onMounted,
  Ref,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { $axios } from '~/utils/api'
import { Article } from '../../utils/types'

export default defineComponent({
  props: {
    categorySlug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { $config } = useContext()

    const url: string = $config.strapiUrl

    onMounted(async () => {
      try {
        await loadCategoryName()
        await loadArticles()
      } catch (err) {
        console.log(err)
      }
    })

    const categoryName = ref('CATEGORY')

    async function loadCategoryName() {
      const response = await $axios.get(
        `/categories?slug=${props.categorySlug}`,
      )
      categoryName.value = response.data[0].name
    }

    const featuredArticle: Ref<Article[]> = ref([])
    const articles: Ref<Article[]> = ref([])

    async function loadArticles() {
      const response = await $axios.get(
        `/articles?category.slug=${props.categorySlug}&_limit=4`,
      )
      featuredArticle.value = response.data.slice(0, 1)
      articles.value = response.data.slice(1, 4)
    }

    return { url, categoryName, featuredArticle, articles }
  },
})
</script>

<style lang='scss' scoped>
$card-padding: 1rem;

.card {
  background: $black;
  color: $gray-lightest;
  padding: 1.2rem 0.75rem;
  margin-bottom: $card-padding;
  width: 32.5%;
  position: relative;

  @media (max-width: 60rem) {
    width: 49%;
  }

  @media (max-width: 42rem) {
    width: 100%;
  }
}

.title {
  padding: 0 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 1.05rem;
}

.featured-article {
  text-decoration: none;

  &__content {
    background: $white;
    color: $black;
    padding: 1.3rem $card-padding 0;
    height: $category-featured-article-content-height;
  }

  &__author-link {
    color: $black;
    text-decoration: none;
  }

  &__author {
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  &__author-prefix {
    font-family: 'Poppins-ExtraLight', sans-serif;
    margin-right: 0.2em;
  }

  &__author-name {
    font-family: 'Poppins-Bold', sans-serif;
  }

  &__title {
    font-size: 1.3rem;
    font-family: 'Poppins-ExtraBold', sans-serif;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__image-container {
    height: $category-featured-article-image-height;
    overflow: hidden;
    position: relative;
  }

  &:hover {
    .featured-article__image {
      transform: scale(1.1);
    }
  }

  &__image {
    width: 100%;
    object-fit: cover;
    transition: transform 0.2s;
  }

  &__read-link-margin {
    height: 0.75rem;
  }

  &__read-link {
    position: absolute;
    right: calc($card-padding + 0.75rem);
  }
}

.divider {
  margin: 2.75rem $card-padding 1.5rem;
  border-bottom: 0.15rem solid $gray-lightest;
}

.article-list {
  padding: 0 $card-padding;

  &__article-link {
    text-decoration: none;
    display: flex;
    padding: 0.5rem 0;

    &:hover,
    &:focus {
      .article-list__article-title {
        transition: 0.2s all ease;
        color: $ordina-orange;
      }
    }
  }

  &__article-arrow {
    color: $ordina-orange;
    font-size: 1.8rem;
    font-family: 'Poppins-SemiBold', sans-serif;
    margin-right: 0.7rem;
  }

  &__article-slash {
    color: $ordina-orange;
    font-size: 1.3rem;
    font-family: 'Code-Next-ExtraBold', sans-serif;
    margin-right: 0.7rem;
  }

  &__article-title {
    color: $gray-lightest;
    font-size: 0.95rem;
    font-family: 'Poppins-Medium', sans-serif;
    line-height: 1.3rem;
    padding-top: 0.165rem;
    transition: 0.2s all ease;
  }
}

.more-button {
  &__margin {
    height: 3rem;
  }

  &__link {
    text-decoration: none;
    color: $gray-lightest;
    position: absolute;
    inset: auto 0 1.3rem;
    margin: auto;
  }

  &__text {
    text-align: center;
    transition: 0.2s all ease;
    position: relative;
    font-size: 0.95rem;
    font-family: 'Poppins-Medium', sans-serif;
    text-transform: uppercase;

    &::after {
      $width: 2.3rem;

      position: absolute;
      content: '';
      width: $width;
      height: 2px;
      bottom: -0.02rem;
      left: calc(50% - #{$width} / 2);
      background: $ordina-orange;
    }

    &:hover,
    &:focus {
      color: $ordina-orange;
    }
  }
}
</style>