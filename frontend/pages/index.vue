<template>
  <BasePageLayout>
    <BaseContainer>
      <BaseHeaderDivider slashColor="orange">Featured</BaseHeaderDivider>
      <BaseArticleCard
        class="featured-articles"
        v-for="featuredArticle in featuredArticles"
        :key="featuredArticle.id"
        :article="featuredArticle.article"
      />
      <!-- <div v-for="article in featuredArticles" :key="article.id">
        {{ article.article }}
      </div> -->
      <BaseHeaderDivider slashColor="blue">Events</BaseHeaderDivider>
      <BaseHeaderDivider slashColor="orange">Categories</BaseHeaderDivider>
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

    async function loadFeaturedArticles() {
      await store.dispatch('featureds/fetchFeaturedArticles', {
        limit: 3,
        offset: ref(0),
      })
    }

    return { featuredArticles }
  },
})
</script>

<style lang="scss" scoped>
.featured-articles {
  margin-bottom: 1rem;
}
</style>