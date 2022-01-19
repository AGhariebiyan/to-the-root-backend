<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="inner__base-container">
        <header class="header">
          <h2 class="header__name">{{ author.name }}</h2>
        </header>

        <section class="about">
          <div class="about__text">
            <h3 class="about__name">About {{ author.name }}</h3>
            <p class="about__biography">
              {{ author.biography }}
            </p>
          </div>
          <div class="about__picture-header">
            <img
              class="about__picture fade-in-img"
              alt=""
              :src="
                author.photo
                  ? `${strapiUrl}${author.photo.url}`
                  : require('~/assets/img/rainbow_ordina.png')
              "
            />
          </div>
        </section>

        <h3
          v-if="author.linkedIn || author.github || author.twitter"
          class="socials__text"
        >
          Connect with me
        </h3>
        <div
          v-if="author.linkedIn || author.github || author.twitter"
          class="socials"
        >
          <a
            v-if="author.linkedIn"
            :href="author.linkedIn"
            target="_blank"
            class="fade-in-top socials__link"
            ><img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              class="linkedin"
              :alt="`The link to the LinkedIn profile of ${author.name}`"
            />
          </a>
          <a
            v-if="author.github"
            :href="author.github"
            target="_blank"
            class="fade-in-top socials__link"
            ><img
              src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
              class="github"
              :alt="`The link to the Github profile of ${author.name}`"
            />
          </a>
          <a
            v-if="author.twitter"
            :href="author.twitter"
            target="_blank"
            class="fade-in-top socials__link"
            ><img
              src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
              class="twitter"
              :alt="`The link to the Twitter profile of ${author.name}`"
            />
          </a>
        </div>
      </div>
    </BaseContainer>
    <BaseContainer class="related-articles" containerType="color">
      <template v-if="sortedArticles && sortedArticles.length > 0">
        <h3 class="related-articles__heading">
          Most recent articles by {{ author.name }}
        </h3>
        <div class="related-articles__container">
          <ArticleCard
            v-for="relArticle in sortedArticles"
            :article="relArticle"
            :key="relArticle.id"
          />
        </div>
      </template>
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
import { Author, Article } from '../../utils/types'

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

    const sortedArticles = computed(() => {
      const articlesCopy = JSON.parse(JSON.stringify(author.value)).articles
      if (Object.keys(author.value).length > 0) {
        const sortedArticles = articlesCopy.sort((a: Article, b: Article) => {
          return (
            new Date(b.original_date).getTime() -
            new Date(a.original_date).getTime()
          )
        })

        return sortedArticles
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

    return { author, strapiUrl, sortedArticles }
  },
})
</script>
<style lang="scss" scoped>
.inner__base-container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 50rem;
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
  align-self: center;
}

.about__text {
  padding-right: 1rem;
  flex-basis: 50%;

  @media screen and (max-width: 992px) {
    padding-right: 0;
  }
}

.about__picture-header {
  flex-basis: 50%;

  @media screen and (max-width: 992px) {
    align-items: center;
    max-width: 20rem;
    margin-bottom: 2rem;
  }
}

.about__picture {
  max-width: 100%;
  box-shadow: 5px 5px 5px #999;
}

.socials__text {
  margin-top: 3rem;
}

.socials {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 25%;
  margin-bottom: 2rem;
  margin-top: 1.25rem;

  @media screen and (max-width: 992px) {
    flex-direction: row;
    align-content: space-between;
    width: 50%;
  }
  @media screen and (max-width: 400px) {
    flex-direction: row;
    align-content: space-between;
    width: 55%;
  }
}

.socials__link {
  position: relative;

  &::after {
    display: none;
  }

  &:hover::after {
    position: absolute;
    background-color: gray;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 50%;
    border-radius: 50%;
    content: '';
  }
}

.articles-container {
  background-color: #99ccd3;
  height: 18.75rem;
}

.articles {
  display: flex;
  align-content: center;
  flex-direction: row;

  &__preview {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    text-decoration: none;

    &:hover {
      background: #f47216;
      color: black;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 992px) {
    text-align: left;
  }
}
.lines__sideline-left {
  border-left: 5px solid black;
  height: 100%;
}

.lines__sideline-right {
  border-left: 5px solid black;
  height: 100%;
}

.fade-in-img {
  animation: fade-in-img 4s;
}

@keyframes fade-in-img {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in-top {
  color: #fff;
  animation: fade-in 500ms ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes fade-in {
  0% {
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.related-articles {
  &__heading {
    margin-bottom: 1rem;
  }
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    @include respond(tab-landscape) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 36em) {
      grid-template-columns: 1fr;
    }
  }
}

.linkedin,
.github,
.twitter {
  box-shadow: 0.3125rem 0.3125rem 0.3125rem #999;
  border-radius: 50%;
  width: 2.1875rem;
  height: 2.1875rem;
}
</style>
