<template>
  <BasePageLayout>
    <BaseContainer :flex-col="true">
      <ais-instant-search
        :search-client="searchClient"
        :index-name="algoliaIndex"
      >
        <ais-search-box />
        <ais-configure :hits-per-page.camel="limit" />
        <ais-infinite-hits>
          <template slot="item" slot-scope="{ item }">
            <ArticleCard :article="item" />
          </template>
          <template v-slot="{ items }">
            <p v-if="items.length === 0">We couldn't find any content.</p>
          </template>

          <template v-slot:loadMore="{ isLastPage, refineNext }">
            <div class="show-more__container">
              <base-button :disabled="isLastPage" buttonType="primary">
                <div @click="refineNext" class="show-more__button">
                  Show more
                </div>
              </base-button>
            </div>
          </template>
        </ais-infinite-hits>
      </ais-instant-search>

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

import {
  AisConfigure,
  AisInstantSearch,
  AisInfiniteHits,
  AisSearchBox,
} from 'vue-instantsearch'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import * as _ from 'lodash'
import { Article } from '~/utils/types'
import algoliasearch from 'algoliasearch/lite'
import BaseButton from '../../components/base/BaseButton.vue'

export default defineComponent({
  name: 'PageContent',

  components: {
    AisConfigure,
    AisInstantSearch,
    AisInfiniteHits,
    AisSearchBox,
    ClipLoader,
    BaseButton,
  },

  setup() {
    const { store } = useContext()

    const limit = 6
    const offset = ref(0)
    const query = ref('')
    const isLoading = ref(false)

    const articles = computed(() => {
      return store.getters['articles/articles']
    })

    const filteredArticles = computed(() => {
      return articles.value.filter((article: Article) => {
        const lowerCaseTitle = article.title.toLowerCase()
        return lowerCaseTitle.includes(query.value.toLowerCase())
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
        offset.value += filteredArticles.value.length
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

    const algoliaIndex: string = process.env.algoliaIndex || ''
    const appId: string = process.env.algoliaAppId || ''
    const searchKey: string = process.env.algoliaSearchKey || ''

    const searchClient = algoliasearch(appId, searchKey)

    return {
      algoliaIndex,
      filteredArticles,
      isLoading,
      limit,
      loadArticles,
      query,
      searchClient,
    }
  },
})
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  margin-top: 4rem;
}

.show-more {
  &__container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
  &__button {
  }
}
</style>
