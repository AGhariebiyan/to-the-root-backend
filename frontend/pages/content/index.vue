<template>
  <BasePageLayout>
    <BaseContainer>
      <ais-instant-search
        :search-client="searchClient"
        :index-name="algoliaIndex"
      >
        <ais-search-box />
        <ais-configure :hits-per-page.camel="limit" />
        <ais-infinite-hits>
          <template slot="item" slot-scope="{ item }">
            <ArticleCard :article="item" />
          </template>

          <template v-slot:loadMore="{ isLastPage, refineNext }">
            <div class="show-more__container">
              <base-button :disabled="isLastPage" buttonType="primary">
                <div @click="refineNext" class="show-more__button">
                  Show more
                </div>
              </base-button>
            </div>
          </template>
        </ais-infinite-hits>
      </ais-instant-search>

      <ClipLoader
        class="loader"
        color="#3da4bf"
        size="5rem"
        v-show="isLoading"
      />
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import {
  AisConfigure,
  AisInstantSearch,
  AisInfiniteHits,
  AisSearchBox,
} from 'vue-instantsearch'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import algoliasearch from 'algoliasearch/lite'

export default defineComponent({
  name: 'PageContent',

  components: {
    AisConfigure,
    AisInstantSearch,
    AisInfiniteHits,
    AisSearchBox,
    ClipLoader,
  },

  setup() {
    const limit = 6
    const query = ref('')
    const isLoading = ref(false)

    const algoliaIndex: string = process.env.algoliaIndex || ''
    const appId: string = process.env.algoliaAppId || ''
    const searchKey: string = process.env.algoliaSearchKey || ''

    const searchClient = algoliasearch(appId, searchKey)

    return {
      algoliaIndex,
      isLoading,
      limit,
      query,
      searchClient,
    }
  },
})
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  margin-top: 4rem;
}

.show-more {
  &__container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
}
</style>
