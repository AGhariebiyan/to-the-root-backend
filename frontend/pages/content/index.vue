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
        <BaseCard
          v-for="article in filteredArticles"
          :key="article._id"
          :article="article"
        />
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
    const { store } = useContext()

    const limit = 6
    const offset = ref(0)
    const search = ref('')
    const isLoading = ref(false)

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

    return { filteredArticles, isLoading, loadArticles, search }
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
