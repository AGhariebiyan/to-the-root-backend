<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="featured-articles">
        <BaseHeaderDivider class="featured-articles__header" slashColor="orange"
          >Featured</BaseHeaderDivider
        >
        <div class="featured-articles__articles">
          <div class="featured-articles__big">
            <div
              v-for="(featuredArticle, index) in featuredArticles"
              :key="index"
            >
              <FeaturedCardBig
                v-if="index == 0"
                class="featured-articles__article-big"
                :article="featuredArticle.article"
              />
            </div>
          </div>
          <div class="featured-articles__small">
            <div
              v-for="(featuredArticle, index) in featuredArticlesSmall"
              :key="index"
            >
              <FeaturedCardSmall
                class="featured-articles__article-small"
                :article="featuredArticle.article"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="categories">
        <BaseHeaderDivider class="categories__header" slashColor="orange"
          >Categories</BaseHeaderDivider
        >
        <div class="categories__categories">
          <CategoryCard
            v-for="category in categories"
            :key="category"
            :categorySlug="category"
          />
        </div>
      </div>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { Featured } from '../utils/types'

export default defineComponent({
  setup() {
    const { store } = useContext()

    onMounted(async () => {
      try {
        await loadFeaturedArticles()
      } catch (err) {
        console.log(err)
      }
    })

    const featuredArticles = computed(() => {
      return store.getters['featureds/featuredArticles']
    })

    const featuredArticlesSmall = computed(() => {
      const featuredArticles: Array<Featured> =
        store.getters['featureds/featuredArticles']
      return [...featuredArticles].splice(1, 2)
    })

    async function loadFeaturedArticles() {
      await store.dispatch('featureds/fetchFeaturedArticles', {
        limit: 3,
        offset: ref(0),
      })
    }

    const categories = [
      'backend',
      'frontend',
      'design',
      'security',
      'hardware',
      'ai-ml',
    ]

    return { featuredArticles, featuredArticlesSmall, categories }
  },
})
</script>

<style lang="scss" scoped>
.featured-articles {
  margin-bottom: 1.5rem;

  &__articles {
    display: flex;
    justify-content: space-between;
  }

  &__big {
    width: 74%;
  }

  &__small {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25%;
  }
}

.categories {
  &__categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>