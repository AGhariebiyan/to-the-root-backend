<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="featured-articles">
        <BaseHeaderDivider class="featured-articles__header" slashColor="orange"
          >Featured</BaseHeaderDivider
        >
        <div class="featured-articles__articles-wide">
          <div class="featured-articles__main">
            <div
              v-for="featuredArticle in featuredArticleBig"
              :key="featuredArticle.id"
            >
              <FeaturedCardRow
                class="featured-articles__article-big"
                :article="featuredArticle.article"
              />
            </div>
          </div>
          <div class="featured-articles__secondary">
            <div
              v-for="(featuredArticle, index) in featuredArticlesSmall"
              :key="index"
            >
              <FeaturedCardColumnSmall
                class="featured-articles__article-small"
                :class="index == 0 ? 'first' : 'last'"
                :article="featuredArticle.article"
              />
            </div>
          </div>
        </div>
        <div
          class="featured-articles__articles-narrow"
          v-for="featuredArticle in featuredArticles"
          :key="featuredArticle.id"
        >
          <FeaturedCardColumnBig
            class="featured-articles__article-big"
            :article="featuredArticle.article"
          />
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
    const featuredArticleBig = computed(() => {
      const featuredArticles: Array<Featured> =
        store.getters['featureds/featuredArticles']
      return [...featuredArticles].splice(0, 1)
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
        sort: 'updated_at:DESC',
      })
    }
    const categories = [
      'backend',
      'frontend',
      'design',
      'security',
      'hardware',
      'ai-ml',
      'agile',
      'business-development',
      'dev-ops',
    ]
    return {
      featuredArticles,
      featuredArticleBig,
      featuredArticlesSmall,
      categories,
    }
  },
})
</script>

<style lang="scss" scoped>
.featured-articles {
  margin-bottom: 2.5rem;
  &__articles-wide {
    display: flex;
    justify-content: space-between;
  }
  &__articles-narrow {
    display: none;
    visibility: hidden;
  }
  &__main {
    width: 74%;
  }
  &__secondary {
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
@media (max-width: 55rem) {
  .featured-articles {
    &__articles-wide {
      flex-direction: column;
    }
    &__main {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    &__secondary {
      width: 100%;
      flex-direction: row;
    }
    &__article-small.first {
      margin-right: 0.3rem;
    }
    &__article-small.last {
      margin-left: 0.3rem;
    }
  }
}
@media (max-width: 42rem) {
  .featured-articles {
    &__articles-wide {
      display: none;
      visibility: hidden;
    }
    &__articles-narrow {
      display: block;
      visibility: visible;
      .featured-articles__article-big {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
