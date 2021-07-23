<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="content__container" v-if="articles">
        <BaseCard
          cardType="article"
          v-for="article in articles"
          :key="article._id"
        >
          <img :src="`${url}${article.cover_image.url}`" alt="" />
          <div class="card__content">
            <p class="card__date">{{ article.original_date }}</p>
            <h3>{{ article.title }}</h3>
            <p class="card__description">{{ article.description }}</p>
            <BaseButton
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
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageContent',
  setup() {
    const { $config, $axios } = useContext()
    const limit = 4
    const offset = ref(0)
    const articles = ref({})

    const url: string = $config.strapiUrl

    onMounted(async () => {
      const response = await $axios.get(
        `/articles?_start=${offset.value}&_limit=${limit}`,
      )
      articles.value = response.data ?? []
    })

    return { articles, url }
  },
})
</script>

<style lang="scss" scoped>
.content__container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-dummy {
  width: $article-card-width;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  @include respond(tab-landscape) {
    width: $article-card-width-landscape;
  }
}
</style>
