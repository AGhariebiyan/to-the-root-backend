<template>
  <div class="card">
    <h3 class="title">{{ categoryName }}</h3>
    <div
      class="featured-article"
      v-for="article in featuredArticle"
      :key="article.id"
    >
      <div class="featured-article__content">
        <h5 class="featured-article__author">
          <span class="featured-article__author-prefix">by</span
          ><span class="featured-article__author-name">{{
            article.author.name
          }}</span>
        </h5>
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
    </div>
    <div class="divider"></div>
    <div class="article-list"></div>
    <div class="more-button"></div>
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

    const featuredArticle: Ref<Article> = ref()
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
.card {
  background: $black;
  color: $text;
  padding: 1.5rem 0.75rem;
  margin-bottom: 1rem;
  width: 32.5%;
}

.title {
  padding: 0 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
}

.featured-article {
  &__content {
    background: $tiles-inside;
    color: $black;
    padding: 1rem;
    height: $category-featured-article-card-height;
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
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }
}
</style>