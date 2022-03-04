<template>
  <base-page-layout>
    <base-container containerType="narrow">
      <ClipLoader class="loader" color="#3da4bf" v-if="isLoading" />
      <article v-else-if="isArticleLoaded" class="article">
        <h2 class="article__title">{{ article.title }}</h2>
        <p class="article__description">{{ article.description }}</p>
        <p class="article__meta">
          {{ article.original_date }}
          <template v-if="article.author">
            by
            <NuxtLink
              class="article__author"
              :to="`/author/${article.author.id}`"
              >{{ article.author.name }}</NuxtLink
            >
          </template>
        </p>

        <share-buttons
          :article="{
            title: article.title,
            description: article.description,
            categories: article.categories,
          }"
          :url="articleUrl"
        />

        <div class="article__image-container">
          <img
            class="article__cover-image"
            :src="
              article.cover_image
                ? `${strapiUrl}${article.cover_image.url}`
                : require('~/assets/img/rainbow_ordina.png')
            "
          />
        </div>
        <div class="article__content" v-html="article.content"></div>

        <p class="article__contribute-text">
          This article was written by {{ article.author.name }}. If you'd like
          to have your name here under your own article,
          <a href="/contribute" class="link">click here to contribute.</a>
        </p>

        <div class="article__interactions">
          <LikeButton :articleId="article.id" :articleSlug="slug" />
          <div class="article__reactions">
            <span class="material-icons-outlined">chat</span>
            <div class="article__number-of-reactions">
              {{ comments.length }}
            </div>
          </div>
        </div>

        <CommentSection :articleId="article.id" :articleSlug="article.slug" />
      </article>

      <p v-else>
        The article with slug <code>{{ slug }}</code> was not found
      </p>
    </base-container>

    <base-container class="related-articles" containerType="color">
      <template v-if="!isLoading && relatedArticles.length > 0">
        <h3 class="related-articles__heading">Related articles</h3>
        <div class="related-articles__container">
          <ArticleCard
            v-for="relArticle in relatedArticles"
            :article="relArticle"
            :key="relArticle.id"
          />
        </div>
      </template>
    </base-container>
  </base-page-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  useRoute,
  onMounted,
  ref,
  useMeta,
} from '@nuxtjs/composition-api'

import { Article } from '~/utils/types'
import { composePageTitle } from '~/utils/helpers'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import Prism from '~/plugins/prism'

export default defineComponent({
  components: { ClipLoader },

  name: 'PageContentDetail',

  head: {},

  setup() {
    const isLoading = ref(true)

    const route: any = useRoute()
    const slug = route?.value?.params?.slug

    const { store, $config } = useContext()
    const strapiUrl: string = $config.strapiUrl
    const baseUrl = $config.baseUrl
    const articleUrl = `${baseUrl}${route.value.fullPath}`

    const article = computed(() => {
      return (
        store.getters['articles/articles'].find(
          (article: Article) => article.slug == slug,
        ) ?? {}
      )
    })

    useMeta(() => ({ title: composePageTitle(article.value.title) }))

    const comments = computed(() => {
      return store.getters['comments/comments']
    })

    const isArticleLoaded = computed(() => {
      return Object.keys(article.value).length > 0
    })

    onMounted(async () => {
      try {
        if (!isArticleLoaded.value) {
          await loadArticleBySlug(slug)
        }
        await loadRelatedArticles()
      } catch (err) {
      } finally {
        isLoading.value = false
        Prism.highlightAll()
      }
    })

    async function loadArticleBySlug(slug: string) {
      isLoading.value = true
      try {
        await store.dispatch('articles/fetchArticleBySlug', slug)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    const relatedArticles: any = ref([])

    async function loadRelatedArticles() {
      const relatedCategoryParams = {
        _where: [
          {
            'categories.name': article.value.categories.map(
              (category: any) => category.name,
            ),
          },
        ],
      }

      const relatedCategoryArticles: Article[] = await store.dispatch(
        'articles/fetchArticles',
        {
          limit: 4,
          offset: ref(0),
          params: relatedCategoryParams,
        },
      )

      let relatedAuthorArticles: Article[] = []

      if (article.value.author) {
        const relatedAuthorParams = {
          'author.id': article.value.author.id,
        }

        relatedAuthorArticles = await store.dispatch('articles/fetchArticles', {
          limit: 4,
          offset: ref(0),
          params: relatedAuthorParams,
        })
      }

      // Always add the 3 most recent articles
      const recentArticles = await store.dispatch('articles/fetchArticles', {
        limit: 3,
        offset: ref(0),
        sort: 'updated_at',
      })

      // Combine all articles
      const combinedArticles = relatedCategoryArticles.concat(
        relatedAuthorArticles,
        recentArticles,
      )

      // Remove duplicates
      const uniqueArticles: Article[] = Object.values(
        combinedArticles.reduce((uniqueArticles: any, article: Article) => {
          return uniqueArticles[article.id]
            ? uniqueArticles
            : { ...uniqueArticles, [article.id]: article }
        }, {}),
      )

      relatedArticles.value = uniqueArticles
        // Make sure the current article is not shown in the related articles
        .filter((relArt: Article) => relArt.id !== article.value.id)
        // Only show at most 3 items
        .slice(0, 3)
    }

    return {
      slug,
      article,
      isArticleLoaded,
      isLoading,
      strapiUrl,
      articleUrl,
      relatedArticles,
      comments,
    }
  },
})
</script>

<style lang="scss" scoped>
.article {
  &__title {
    margin-bottom: 1rem;
  }

  &__description {
    margin-bottom: 2rem;
  }

  &__meta {
    margin-bottom: 2rem;
  }

  &__author {
    font-weight: bold;
    color: inherit;

    &:link,
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  &__image-container {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 20rem;
    margin-bottom: 2rem;
  }

  &__cover-image {
    width: 100%;
    background-size: cover;
    background-position: center;
  }

  &__content {
    margin-bottom: 2rem;

    p {
      margin-bottom: 1rem;
    }
  }

  &__contribute-text {
    color: $gray-darker;
    font-style: italic;
  }

  &__interactions {
    display: flex;
    margin-top: 50px;
  }

  &__likes {
    display: flex;
    align-items: center;
    margin-right: 2rem;

    &:hover {
      color: $accelerate-blue-primary;
      cursor: pointer;
    }
  }
  &__reactions {
    display: flex;
    align-items: center;

    &:hover {
      color: $accelerate-blue-primary;
      cursor: pointer;
    }
  }

  &__number-of-likes {
    margin-left: 1rem;
  }
  &__number-of-reactions {
    margin-left: 1rem;
  }
}

.share-buttons {
  margin-bottom: 1rem;
}

.related-articles {
  &__heading {
    margin-bottom: 2rem;
    text-align: center;
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
}
</style>
