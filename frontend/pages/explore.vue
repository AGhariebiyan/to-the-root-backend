<template>
  <BasePageLayout>
    <BaseContainer>
      <AisInstantSearch
        :search-client="searchClient"
        :index-name="algoliaIndex"
      >
        <AisRefinementList
          attribute="tags.name"
          operator="or"
          :sort-by="['name:asc']"
        >
          <template v-slot="{ items, createURL, refine }">
            <div class="category-facets">
              <a
                v-for="item in items"
                :key="item.value"
                :href="createURL(item.value)"
                @click.prevent="refine(item.value)"
                :class="item.isRefined ? 'selected' : ''"
                class="btn btn-pill"
              >
                {{ item.label }}
              </a>
            </div>
          </template>
        </AisRefinementList>

        <AisSearchBox />
        <AisConfigure :hits-per-page.camel="9" />
        <AisInfiniteHits>
          <template slot="item" slot-scope="{ item }">
            <ArticleCard :article="item" />
          </template>
          <template v-slot="{ items }">
            <p class="no-articles-text" v-if="items.length === 0">
              We couldn't find any content.
            </p>
          </template>

          <template v-slot:loadMore="{ isLastPage, refineNext }">
            <div class="show-more__container">
              <button
                :disabled="isLastPage"
                class="btn btn-primary"
                @click="refineNext"
              >
                Show more
              </button>
            </div>
          </template>
        </AisInfiniteHits>
      </AisInstantSearch>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

import {
  AisConfigure,
  AisInstantSearch,
  AisInfiniteHits,
  AisSearchBox,
  AisRefinementList,
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

export default defineComponent({
  name: 'PageContent',

  head: {},

  components: {
    AisConfigure,
    AisInstantSearch,
    AisInfiniteHits,
    AisSearchBox,
    AisRefinementList,
  },

  setup() {
    useMeta(() => ({ title: composePageTitle('Explore') }))

    const query = ref('')
    const algoliaIndex: string = process.env.algoliaIndex || ''
    const appId: string = process.env.algoliaAppId || ''
    const searchKey: string = process.env.algoliaSearchKey || ''

    const searchClient = algoliasearch(appId, searchKey)

    return {
      algoliaIndex,
      query,
      searchClient,
    }
  },
})
</script>

<style lang="scss" scoped>
.category-facets {
  margin-bottom: 0.5rem;

  & > .btn {
    background-color: $white;
    &:hover {
      background-color: $accelerate-blue-2;
    }

    &.selected {
      background-color: $ordina-orange;
      color: $white;
    }
  }

  & > .btn:not(:first-child) {
    margin-left: 0.5rem;
  }
}

.show-more {
  &__container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
}

.loader {
  width: 100%;
  margin-top: 4rem;
}

.selected {
  background-color: red;
}
</style>
