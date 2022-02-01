<template>
  <BasePageLayout>
    <BaseContainer>
      <AisInstantSearch
        :search-client="searchClient"
        :index-name="algoliaIndex"
      >
        <AisRefinementList
          attribute="categories.name"
          operator="or"
          :sort-by="['name:asc']"
        >
          <template v-slot="{ items, createURL, refine }">
            <li v-for="item in items" :key="item.value">
              <a
                :href="createURL(item.value)"
                @click.prevent="refine(item.value)"
                :class="item.isRefined ? 'selected' : ''"
              >
                {{ item.label }}
              </a>
            </li>
          </template>
        </AisRefinementList>

        <AisSearchBox />
        <AisConfigure :hits-per-page.camel="6" />
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
              <BaseButton
                :disabled="isLastPage"
                buttonType="primary"
                @click.native="
                  refineNext()
                  showMoreClicked()
                "
              >
                Show more
              </BaseButton>
            </div>
          </template>
        </AisInfiniteHits>
      </AisInstantSearch>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

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

  components: {
    AisConfigure,
    AisInstantSearch,
    AisInfiniteHits,
    AisSearchBox,
    AisRefinementList,
  },

  setup() {
    const query = ref('')
    const algoliaIndex: string = process.env.algoliaIndex || ''
    const appId: string = process.env.algoliaAppId || ''
    const searchKey: string = process.env.algoliaSearchKey || ''

    const searchClient = algoliasearch(appId, searchKey)

    const context: any = useContext()
    const { $ga } = context

    function showMoreClicked() {
      $ga.event('showMoreClicked')
    }

    return {
      algoliaIndex,
      query,
      searchClient,
      showMoreClicked,
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

.selected {
  background-color: red;
}
</style>
