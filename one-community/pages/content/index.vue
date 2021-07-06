<template>
  <BaseContainer>
    <div v-if="articles" class="container">
      <div v-for="article in articles" :key="article._id">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <img
          :src="`${url}${article.cover_image.url}`"
          alt="Peter is the best"
        />
      </div>
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

<style lang="scss" scoped></style>
