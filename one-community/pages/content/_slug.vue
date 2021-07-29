<template>
  <base-page-layout>
    <base-container>
      <article class="container">
        {{ article }}
      </article>
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

export default defineComponent({
  components: { BasePageLayout, BaseContainer },
  name: 'PageContentDetail',

  setup() {
    const { store } = useContext()
    const route: any = useRoute()
    const slug = route?.value?.params?.slug
    const isLoading = ref(false)

    const article = computed(() => {
      return store.getters['articles/articles'].find(
        (article: Article) => article.slug == slug,
      )
    })

    onMounted(() => {
      if (!article.value) {
        loadArticleBySlug(slug)
      }
    })

    async function loadArticleBySlug(slug: string) {
      if (!article.value) {
        isLoading.value = true
        try {
          await store.dispatch('articles/fetchArticleBySlug', slug)
        } catch (e) {
          console.log(e)
        } finally {
          isLoading.value = false
        }
      }
    }

    return { article }
  },
})
</script>

<style lang="scss" scoped></style>
