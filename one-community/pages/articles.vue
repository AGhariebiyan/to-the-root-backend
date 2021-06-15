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
      console.log("hello from front-end");
      articles.value = await context.store.$sanity.fetch(query)
    }) 

    const query = groq`*[_type == "post"]`;

    return { articles };
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
