<template>
  <base-page-layout>
    <base-container containerType="narrow">
      <ClipLoader class="loader" color="#3da4bf" v-if="isLoading" />
      <article v-else class="article">
        <h2 class="article__title">{{ article.title }}</h2>
        <p class="article__description">{{ article.description }}</p>
        <p class="article__meta">
          {{ article.original_date }} by
          <NuxtLink
            class="article__author"
            :to="`/content?author=${article.author.id}`"
            >{{ article.author.name }}</NuxtLink
          >
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
        <p class="article__content">{{ article.content }}</p>
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
    </base-container>
    <base-container class="related-articles" containerType="color">
      <h3>Related articles</h3>
      <div class="related-articles__container">
        <base-card />
        <base-card />
        <base-card />
      </div>
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
import BaseContainer from '../../components/base/BaseContainer.vue'
import BasePageLayout from '../../components/base/BasePageLayout.vue'
import { Article } from '~/utils/types'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default defineComponent({
  components: { BasePageLayout, BaseContainer, ClipLoader },
  name: 'PageContentDetail',

  setup() {
    const { store, $config } = useContext()
    const route: any = useRoute()
    const slug = route?.value?.params?.slug
    const strapiUrl: string = $config.strapiUrl
    const isLoading = ref(true)
    const baseUrl = process.env.baseUrl

    const articleUrl = `${baseUrl}${route.value.fullPath}`

    const article = computed(() => {
      return (
        store.getters['articles/articles'].find(
          (article: Article) => article.slug == slug,
        ) ?? {}
      )
    })

    const isArticleLoaded = computed(() => {
      return Object.keys(article.value).length > 0
    })

    onMounted(() => {
      if (!isArticleLoaded.value) {
        loadArticleBySlug(slug)
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

    return { article, isLoading, strapiUrl, articleUrl }
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
