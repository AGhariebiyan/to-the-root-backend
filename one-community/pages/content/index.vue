<template>
  <BasePageLayout>
    <BaseContainer :flex-col="true">
      <div class="content__container" v-if="articles">
        <BaseCard
          cardType="article"
          v-for="article in articles"
          :key="article._id"
        >
          <div class="article__image-container">
            <img
              class="article__image"
              :src="`${url}${article.cover_image.url}`"
              alt=""
            />
          </div>
          <div class="article__content">
            <p class="article__date">{{ article.original_date }}</p>
            <h3 class="article__title">{{ article.title }}</h3>
            <p class="article__description">{{ article.description }}</p>
            <BaseButton
              class="button"
              buttonType="pill"
              v-for="(category, index) in article.categories"
              :key="index"
            >
              {{ category.name }}
            </BaseButton>
          </div>
        </BaseCard>
        <div class="flex-dummy card article" />
        <div class="flex-dummy card article" />
      </div>
      <ClipLoader class="loader" color="#3da4bf" v-show="isLoading" />
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

export default defineComponent({
  name: 'PageContent',

  components: {
    ClipLoader,
  },

  setup() {
    const { $config, store } = useContext()

    const limit = 6
    const offset = ref(0)
    const isLoading = ref(false)
    const url: string = $config.strapiUrl

    const articles = computed(() => {
      return store.getters['articles/articles']
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

      if (innerHeight >= bottom) {
        offset.value += limit
        loadArticles()
      }
    }

    onMounted(async () => {
      loadArticles()
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

    return { articles, url, isLoading, loadArticles }
  },

  computed: {
    scrollInfo() {
      if (process.client) {
        console.log('asdf')
        return window.scrollY
      }
      return 'nope'
    },
  },
})
</script>

<style lang="scss" scoped>
.content__container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 3px solid black;
}

.flex-dummy {
  width: $article-card-width;
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
