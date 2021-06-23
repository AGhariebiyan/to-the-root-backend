<template>
  <div>
    <NuxtLink to="/">Home Page</NuxtLink>
    <div v-if="articles" class="container">
      <div v-for="article in articles" :key="article._id">
        <h1>{{ article.title }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useContext } from "@nuxtjs/composition-api";
  import { groq } from "@nuxtjs/sanity";

export default defineComponent({
  setup() {
    const context = useContext();

    let articles = ref({});
    onMounted(async () => {
      console.log(context.$axios);
      articles.value = await context.store.$sanity.fetch(query)
    }) 

    const query = groq`*[_type == "post"]`;

    return { articles };
  }
})
</script>

<style lang="scss" scoped>

</style>
