<template>
  <BasePageLayout>
    <BaseContainer>
      <div class="outer__outerdiv">
        <div class="outer__div">
          <header class="header">
            <h3 class="container-name-person">{{ authorData.name }}</h3>
          </header>

          <section class="about">
            <div class="about__text">
              <h4>About {{ authorData.name }}</h4>
              <P>
                {{ authorData.biography }}
              </P>
            </div>
            <div class="picture__div">
              <img class="picture" :src="authorData.photo" />
            </div>
          </section>

          <div class="socials">
            <a :href="authorData.linkedIn" target="_blank"
              ><span class="material-icons-outlined">do_disturb_off</span></a
            >
            <a :href="authorData.github" target="_blank"
              ><span class="material-icons-outlined">do_disturb_off</span></a
            >
            <a :href="authorData.twitter" target="_blank"
              ><span class="material-icons-outlined">do_disturb_off</span></a
            >
          </div>

          <section class="articles">
            <div class="articles__most-liked">
              <p>
                CONTENT 1CONTENT 1CONTENT 1CONTENT 1CONTENT 1CONTENT 1CONTENT
                1CONTENT 1CONTENT 1CONTENT 1CONTENT 1CONTENT 1
              </p>
            </div>
            <div class="articles__most-viewed">
              <p>
                CONTENT 2CONTENT 2CONTENT 2CONTENT 2CONTENT 2CONTENT 2CONTENT
                2CONTENT 2CONTENT 2CONTENT 2CONTENT 2CONTENT 2
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  useRoute,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageAuthor',
  setup() {
    const { store, $config } = useContext()
    const route: any = useRoute()
    const strapiUrl: string = $config.strapiUrl
    const baseUrl = process.env.baseUrl
    const id = route?.value?.params?.id

    const authorData = {
      biography:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae debitis itaque aliquid libero quod porro, aut id, consequuntur illo veritatis nesciunt quos laudantium explicabo. Ullam voluptas quasi deleniti suscipit et!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae debitis itaque aliquid libero quod porro, aut id, consequuntur illo veritatis nesciunt quos laudantium explicabo. Ullam voluptas quasi deleniti suscipit et!',
      github: 'github.com/awesome',
      linkedIn: 'linkedin.com/awesome',
      twitter: 'twitter.com/awesome',
      email: 'awesome@unicorns.com',
      id: 6,
      name: 'Kylian The Awesome Intern',
      photo: 'https://media.nu.nl/m/x34xcs7asctr_std1024.jpg',
    }

    return { authorData, strapiUrl }
  },
})
</script>

<style lang="scss" scoped>
.outer__outerdiv {
  justify-content: center;
  margin: 0 auto;
}

.outer__div {
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
  max-width: 50rem;
  margin-top: 3rem;
  @media screen and (max-width: 992px) {
    margin: 0 4rem;
  }
}

.container-name-person {
  font-size: x-large;
  @media screen and (max-width: 778px) {
    font-size: large;
  }
  @media screen and (max-width: 600px) {
    font-size: medium;
  }
}

.header {
  align-items: left;
}

.about {
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin-top: 3rem;
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
  }
}

.about__text {
  padding-right: 10rem;
  flex: 1;
  flex-basis: 50%;
  @media screen and (max-width: 992px) {
    padding-right: 0;
  }
}

.picture__div {
  flex: 1;
  flex-basis: 50%;
  padding-right: 4rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 992px) {
    padding-right: 0;
    max-width: 20rem;
  }
}

.picture {
  max-width: 100%;
  border: 3px solid white;
}

.socials {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 25%;
  margin-bottom: 5rem;
  margin-top: 3rem;
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    padding: 0;
  }
}

.articles {
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  gap: 80px;
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 20px;
  }
}
</style>
