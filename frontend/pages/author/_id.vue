<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="inner__baseContainer">
        <header class="header__name">
          <h3>{{ author.name }}</h3>
        </header>

        <section class="about">
          <div class="about__biography">
            <h4 class="about__name">About {{ author.name }}</h4>
            <p>
              {{ author.biography }}
            </p>
          </div>
          <div class="about__picture">
            <img
              class="picture"
              :src="
                author.photo
                  ? `${strapiUrl}${author.photo.url}`
                  : require('~/assets/img/rainbow_ordina.png')
              "
            />
          </div>
        </section>

        <div class="socials">
          <a :href="author.linkedIn" target="_blank"
            ><span class="material-icons-outlined"
              ><img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt=""
                width="30vw"
                height="30vh" /></span
          ></a>
          <a :href="author.github" target="_blank"
            ><span class="material-icons-outlined"
              ><img
                src="data:image/png;base64,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"
                alt=""
                width="30vw"
                height="30vh" /></span
          ></a>
          <a :href="author.twitter" target="_blank"
            ><span class="material-icons-outlined"
              ><img
                src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
                alt=""
                width="30vw"
                height="30vh" /></span
          ></a>
        </div>

        <section class="articles">
          <h3>Recent articles</h3>
          <div
            class="articles__preview"
            v-if="authorWithLatestArticles.latestArticle"
            @click="goToArticle(authorWithLatestArticles.latestArticle.id)"
          >
            <h4 class="articles__heading">
              {{ authorWithLatestArticles.latestArticle.title }}
            </h4>
            <p class="articles__description">
              {{ authorWithLatestArticles.latestArticle.description }}
            </p>
          </div>

          <h3 v-else class="articles__no-articles">
            This author has no articles yet
          </h3>

          <div
            v-if="authorWithLatestArticles.secondLatestArticle"
            class="articles__preview"
            @click="
              goToArticle(authorWithLatestArticles.secondLatestArticle.id)
            "
          >
            <h4 class="articles__heading">
              {{ authorWithLatestArticles.secondLatestArticle.title }}
            </h4>
            <p class="articles__description">
              {{ authorWithLatestArticles.secondLatestArticle.description }}
            </p>
          </div>
        </section>
      </div>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  onMounted,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { Author } from '../../utils/types'

export default defineComponent({
  name: 'PageAuthor',
  setup() {
    const isLoading = ref(true)
    const { store, $config } = useContext()
    const route: any = useRoute()
    const strapiUrl: string = $config.strapiUrl
    const id = route?.value?.params?.id

    const author = computed(() => {
      return (
        store.getters['authors/authors'].find(
          (author: Author) => author.id == id,
        ) ?? {}
      )
    })

    const authorWithLatestArticles = computed(() => {
      const authorCopy = JSON.parse(JSON.stringify(author.value))
      if (Object.keys(authorCopy).length > 0) {
        const sortedArticles = authorCopy.articles.sort((a, b) => {
          return (
            new Date(b.original_date).getTime() -
            new Date(a.original_date).getTime()
          )
        })
        return {
          ...authorCopy,
          latestArticle: sortedArticles[0],
          secondLatestArticle: sortedArticles[1],
        }
      }
    })

    const isAuthorLoaded = computed(() => {
      return Object.keys(author.value).length > 0
    })

    onMounted(async () => {
      try {
        if (!isAuthorLoaded.value) {
          await loadAuthorById(id)
        }
      } catch (err) {
      } finally {
        isLoading.value = false
      }
    })

    async function loadAuthorById(id: string) {
      isLoading.value = true
      try {
        await store.dispatch('authors/fetchAuthorById', id)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    return { author, strapiUrl, authorWithLatestArticles, goToArticle }
  },
})
</script>
<style lang="scss" scoped>
.inner__baseContainer {
  justify-content: center;
  margin: 0 auto;
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
  max-width: 50rem;
  margin-top: 3rem;

  @media screen and (max-width: 992px) {
    margin: 0 1rem;
  }
}

.about {
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin-top: 3rem;

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
}

.about__name {
  margin-bottom: 1rem;
}

.about__biography {
  padding-right: 1rem;
  flex-basis: 50%;

  @media screen and (max-width: 992px) {
    padding-right: 0;
  }
}

.about__picture {
  flex-basis: 50%;
  padding-bottom: 3rem;

  @media screen and (max-width: 992px) {
    align-items: center;
    max-width: 20rem;
    margin-bottom: 2rem;
  }
}

.picture {
  max-width: 100%;
}

.socials {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 25%;
  margin-bottom: 5rem;
  margin-top: 3rem;

  @media screen and (max-width: 992px) {
    flex-direction: row;
    align-content: space-between;
    width: 50%;
  }
}

.articles {
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__preview {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid black;
  }

  @media screen and (max-width: 992px) {
    text-align: left;
  }
}
</style>
