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
      <div class="content__container" v-if="filteredArticles">
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
              <div class="article__categories">
                <BaseButton
                  buttonType="pill"
                  v-for="(category, index) in article.categories"
                  :key="index"
                >
                  {{ category.name }}
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </NuxtLink>
        <div class="flex-dummy card article" />
        <div class="flex-dummy card article" />
        <ClipLoader class="loader" color="#3da4bf" v-show="isLoading" />
      </div>
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

  &__label {
    margin-right: 1rem;
  }

  &__input {
    padding: 0.25rem;
    flex-grow: 1;
  }
}
.content__container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: $accelerate-blue-5;
  padding-top: 0.5rem;

  @include respond(tab-landscape) {
    padding: 4rem 2rem 0;
    padding-top: 4rem;
  }
}

.nuxt-link {
  text-decoration: none;
  color: inherit;
}

p .flex-dummy {
  width: $article-card-width !important;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0 0 3rem;

  @include respond(tab-landscape) {
    width: $article-card-width-landscape;
  }
}
.loader {
  width: 100%;
}
</style>
