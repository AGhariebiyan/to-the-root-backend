<template>
  <BaseContainer>
    <div class="content__container" v-if="articles">
      <BaseCard
        :cardType="'article'"
        v-for="article in articles"
        :key="article._id"
      >
        <img
          :src="`${url}${article.cover_image.url}`"
          alt="Peter is the best"
        />
        <div class="card__content">
          <p class="card__date">{{ article.original_date }}</p>
          <h3>{{ article.title }}</h3>
          <p class="card__description">{{ article.description }}</p>
          <BaseButton
            buttonType="pill"
            v-for="(category, index) in article.categories"
            :key="index"
            >{{ category.name }}</BaseButton
          >
        </div>
      </BaseCard>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context = useContext()
    const url: string = context.$config.strapiUrl
    const articles = ref({})
    onMounted(async () => {
      articles.value = await context.$strapi.find('articles')
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
</style>
