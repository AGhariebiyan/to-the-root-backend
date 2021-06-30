<template>
  <BaseContainer>
    <h1>COMMUNITY</h1>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    // const articles = namespace("articles");
    // console.log(store)
    onMounted(async () => {})
  },
  // // Vuex Store boilerplate
  // @articles.State
  // public articles!: [];

  // // Vuex Store boilerplate
  // @articles.Action
  // public getArticles!: () => [];

  // async mounted() {
  // // Vuex Store boilerplate
  // this.getArticles();
  // console.log("articles", this.articles);
  // }
})
</script>

<style lang="scss" scoped></style>
