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
          <div class="about__picture">
            <img
              class="picture"
              id="fade-in-img"
              alt=""
              :src="
                author.photo
                  ? `${strapiUrl}${author.photo.url}`
                  : require('~/assets/img/rainbow_ordina.png')
              "
            />
          </div>
        </section>

        <div
          v-if="author.linkedIn || author.github || author.twitter"
          class="socials"
        >
          <a
            v-if="author.linkedIn"
            :href="author.linkedIn"
            target="_blank"
            class="material-icons-outlined"
            id="fade-in-left"
            ><img
              style="box-shadow: 5px 5px 5px #999"
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="A link to LinkedIn"
              width="35px"
              height="35px"
            />
          </a>
          <a
            v-if="author.github"
            :href="author.github"
            target="_blank"
            class="material-icons-outlined"
            ><img
              style="box-shadow: 5px 5px 5px #999"
              src="data:image/png;base64,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"
              alt="A link to Github"
              width="35px"
              height="35px"
            />
          </a>
          <a
            v-if="author.twitter"
            :href="author.twitter"
            target="_blank"
            class="material-icons-outlined"
            id="fade-in-right"
            ><img
              style="box-shadow: 5px 5px 5px #999"
              src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
              alt="A link to Twitter"
              width="35px"
              height="35px"
            />
          </a>
        </div>
      </div>
    </BaseContainer>
    <BaseContainer class="related-articles" containerType="color">
      <template v-if="sortedArticles && sortedArticles.length > 0">
        <h3 class="related-articles__heading">Recent articles</h3>
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
  margin-bottom: 6rem;

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
  box-shadow: 5px 5px 5px #999;
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
    width: 40%;
  }
  @media screen and (max-width: 400px) {
    flex-direction: row;
    align-content: space-between;
    width: 55%;
  }
}

.socials a {
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

.socials a img {
  border-radius: 50%;
}

.articles-container {
  background-color: #99ccd3;
  height: 300px;
}

.articles-container {
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

#fade-in-img {
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

#fade-in-right {
  color: #fff;
  animation: fadeInRight 1s ease-in-out;
}

@keyframes fadeInRight {
  0% {
    opacity: 1;
    transform: translateX(60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

#fade-in-left {
  color: #fff;
  animation: fadeInLeft 1s ease-in-out;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
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
</style>
