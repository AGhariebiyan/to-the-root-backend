<template>
  <BasePageLayout>
    <BaseContainer :flex-col="true">
      <header class="header">
        <div class="search-box">
          <label class="search-box__label" for="search"
            ><span class="material-icons">search</span></label
          >
          <input class="search-box__input" id="search" v-model="search" />
        </div>
      </header>
      <div class="content__container" v-if="filteredArticles.length">
        <NuxtLink
          class="nuxt-link"
          :to="`/content/${article.slug}`"
          v-for="article in filteredArticles"
          :key="article._id"
        >
          <BaseCard cardType="article">
            <div class="article__image-container">
              <img
                class="article__image"
                :src="`${url}${article.cover_image.url}`"
                alt=""
              />
            </div>
            <div class="article__content">
              <h3 class="article__title">{{ article.title }}</h3>
              <p class="article__description">{{ article.description }}</p>
            </div>
            <div class="article__categories">
              <BaseButton
                buttonType="pill"
                v-for="(category, index) in article.categories"
                :key="index"
              >
                <NuxtLink
                  class="article__category-link"
                  :to="`category/${category.name}`"
                  >{{ category.name }}</NuxtLink
                >
              </BaseButton>
            </div>
          </BaseCard>
        </NuxtLink>
      </div>
      <div class="no-articles" v-else-if="!isLoading">
        <h3 class="no-articles__heading">No articles found</h3>
        <p class="no-articles__paragraph">
          Please try adapting your search, or
          <NuxtLink class="no-articles__link" to="content/add"
            >add an article yourself</NuxtLink
          >!
        </p>
      </div>
      <ClipLoader
        class="loader"
        color="#3da4bf"
        size="5rem"
        v-show="isLoading"
      />
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
  computed,
  onUnmounted,
} from '@nuxtjs/composition-api'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import * as _ from 'lodash'
import { Article } from '~/utils/types'

export default defineComponent({
  name: 'PageContent',

  components: {
    ClipLoader,
  },

  setup() {
    const { $config, store } = useContext()

    const limit = 6
    const offset = ref(0)
    const search = ref('')
    const isLoading = ref(false)
    const url: string = $config.strapiUrl

    const articles = computed(() => {
      return store.getters['articles/articles']
    })

    const filteredArticles = computed(() => {
      return articles.value.filter((article: Article) => {
        const lowerCaseTitle = article.title.toLowerCase()
        return lowerCaseTitle.includes(search.value.toLowerCase())
      })
    })

    const debouncedInfiniteScroll = _.debounce(infiniteScroll, 500, {
      leading: true,
    })

    function infiniteScroll() {
      if (store.getters['articles/foundAllArticles']) {
        return
      }

      const articleContainer = document.querySelector('.content__container')
      const bottom = articleContainer?.getBoundingClientRect().bottom
      const innerHeight = Math.round(window.innerHeight)

      if (bottom && innerHeight >= bottom) {
        offset.value += limit
        loadArticles()
      }
    }

    onMounted(async () => {
      if (articles.value.length <= 1) {
        loadArticles()
      }
      window.addEventListener('scroll', debouncedInfiniteScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', debouncedInfiniteScroll)
    })

    async function loadArticles() {
      if (isLoading.value || store.getters['articles/foundAllArticles']) {
        return
      }
      isLoading.value = true
      try {
        await store.dispatch('articles/fetchArticles', {
          limit,
          offset,
        })
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    return { filteredArticles, url, isLoading, loadArticles, search }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}
.search-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;

  @include respond(tab-landscape) {
    width: 60%;
  }

  @media screen and (max-width: 36em) {
    width: 100%;
  }

  &__label {
    margin-right: 1rem;
  }

  &__input {
    padding: 0.25rem;
    flex-grow: 1;
  }
}
.content__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @include respond(tab-landscape) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 36em) {
    grid-template-columns: 1fr;
  }
}

.nuxt-link {
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

.loader {
  width: 100%;
  margin-top: 4rem;
}

.no-articles {
  @include respond(phone) {
    padding: 0.5rem;
    text-align: center;
  }

  &__heading {
    margin-bottom: 1rem;
  }

  &__paragraph {
  }

  &__link {
    &:link,
    &:visited {
      color: inherit;
      text-decoration: none;
      color: $ordina-orange-hover;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
