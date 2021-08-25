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
              :to="`/content?author=${article.author.id}`"
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
            :src="`${strapiUrl}${article.cover_image.url}`"
          />
        </div>
        <div
          class="article__content"
          v-html="$md.render(article.content)"
        ></div>
        <div class="article__interactions">
          <div class="article__likes">
            <span class="material-icons-outlined">thumb_up</span>
            <div class="article__number-of-likes">13</div>
          </div>
          <div class="article__reactions">
            <span class="material-icons-outlined">chat</span>
            <div class="article__number-of-reactions">3</div>
          </div>
        </div>
      </article>
      <p v-else>
        The article with slug <code>{{ slug }}</code> was not found
      </p></base-container
    >

    <base-container class="related-articles" containerType="color">
      <template v-if="!isLoading">
        <h3>Similar articles</h3>
        <div class="related-articles__container">
          <h4>More by this author</h4>
          {{ relatedArticles.length }}
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
} from '@nuxtjs/composition-api'

import { Article } from '~/utils/types'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default defineComponent({
  components: { ClipLoader },

  name: 'PageContentDetail',

  setup() {
    const isLoading = ref(true)

    const route: any = useRoute()
    const slug = route?.value?.params?.slug

    const { store, $config } = useContext()
    const strapiUrl: string = $config.strapiUrl
    const baseUrl = process.env.baseUrl
    const articleUrl = `${baseUrl}${route.value.fullPath}`

    const article = computed(() => {
      return (
        store.getters['articles/articles'].find(
          (article: Article) => article.slug == slug,
        ) ?? {}
      )
    })

    const relatedArticles = ref([])

    const isArticleLoaded = computed(() => {
      return Object.keys(article.value).length > 0
    })

    onMounted(async () => {
      if (!isArticleLoaded.value) {
        await loadArticleBySlug(slug)
        const params = {}
        if (article.value.author) {
          console.log('author exists')
          params['author.id'] = article.value.author.id
        }
        relatedArticles.value = await store.dispatch('articles/fetchArticles', {
          limit: 3,
          offset: ref(0),
          params,
        })
      } else {
        isLoading.value = false
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

    // async function loadRelatedArticles() {
    //   try
    // }

    return {
      article,
      isArticleLoaded,
      isLoading,
      strapiUrl,
      articleUrl,
      relatedArticles,
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
  }

  &__interactions {
    display: flex;
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
  &__container {
  }
}
</style>
