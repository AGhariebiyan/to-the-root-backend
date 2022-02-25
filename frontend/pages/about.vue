<template>
  <BasePageLayout>
    <section class="what-about-it">
      <div class="wrapper">
        <div class="what-about-it__layout-container">
          <h1 class="what-about-it__header">So, what about it?</h1>
          <div class="what-about-it__content">
            <p class="what-about-it__paragraph">
              "Ahead Of IT" is an accesible platform and guild welcome to
              software developers who are looking for a place to grow,
              contribute to open source software and have cool events or just
              share thoughts and hang out.
            </p>
            <p class="what-about-it__paragraph">
              We are a rich source of top tier developers with knowledge of the
              latests insights, approachable for professionals wether you are a
              junior or an experienced senior.
            </p>
            <p class="what-about-it__paragraph">
              Get inspired, become a better developer using our sources like
              articles, videos, events and offcourse direct contact with your
              peers. So what are you waiting for? Join us!
            </p>
            <div class="what-about-it__button">
              <a href="/discord" class="outline-button-link button-white"
                >Join Us</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="why-to-join">
      <div class="wrapper">
        <h2 class="why-to-join__header">Why to join</h2>
        <p class="why-to-join__paragraph">
          Technology, more than any other science, is a field of cooperation.
          Not only do we do better work together, we wouldn’t even have a field
          if it wasn’t for giants like Nicola Tesla, Alan Turing and Tim
          Berners-Lee. That is what Ahead Of IT is all about. It’s about
          appreciating the shoulders we stand on, and, in all modesty, trying to
          be the shoulders for the next generation. Not only do we share our
          best ideas, we go to work on them. So if you are looking to join a
          community that is on a mission to make a difference – you came to the
          right place.
        </p>
        <div class="why-to-join__button">
          <a href="/open-source" class="outline-button-link button-gray-dark"
            >Contribute together</a
          >
        </div>
      </div>
    </section>

    <section class="how-to-join">
      <div class="wrapper">
        <h2 class="how-to-join__header">How to join</h2>
        <div class="how-to-join__cards">
          <BaseActionCard
            v-for="(actionCard, index) in actionCards"
            :key="index"
            :icon-image="actionCard.iconImage"
            :nav-route="actionCard.navRoute"
          >
            <template #title>{{ actionCard.title }}</template>
            <template #info-text>{{ actionCard.infoText }}</template>
            <template #button-text>{{ actionCard.buttonText }}</template>
          </BaseActionCard>
        </div>
      </div>
    </section>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()
    title.value = `About / ${process.env.platformName}`

    const actionCards = [
      {
        title: 'Start writing articles',
        infoText: 'Knowledge to share? We will help you spread the word.',
        buttonText: 'Contact the editors',
        iconImage: 'newspaper-regular.svg',
        navRoute: '/contribute',
      },
      {
        title: 'Start making videos',
        infoText:
          'Are you into vlogging, making tutorials and rather share a video? Let us know.',
        buttonText: 'Contact the editors',
        iconImage: 'video-solid.svg',
        navRoute: '/contribute',
      },
      {
        title: 'Join our Discord',
        infoText: 'Connect to like-minded IT professionals.',
        buttonText: 'Join our Discord channel',
        iconImage: 'discord-brands.svg',
        navRoute: '/discord',
      },
      {
        title: 'Start mobbing together',
        infoText:
          'We have regular mobbing sessions to help out the open source community.',
        buttonText: 'More about our sessions',
        iconImage: 'handshake-regular.svg',
        navRoute: '/discord',
      },
    ]

    return {
      actionCards,
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 2rem;
  max-width: $desktop-max-width;
  margin: 0 auto;
}

.what-about-it {
  background: $gray;
  color: $white;

  &__layout-container {
    display: flex;
  }

  &__header {
    min-width: 50%;
    font-size: 5rem;
    margin: 5rem 0;
    line-height: 6rem;
    font-family: 'Poppins-Medium';
  }

  &__paragraph {
    margin-bottom: 2rem;
  }
}

.why-to-join {
  background: $gray-light;
  color: $gray-dark;

  &__paragraph {
    margin-bottom: 3rem;
  }
}

.how-to-join {
  background: $gray-dark;
  color: $white;
  padding-bottom: 2.8rem;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 4rem;
  }
}

.why-to-join,
.how-to-join {
  &__header {
    text-transform: uppercase;
    font-family: 'Poppins-Light';
    margin-bottom: 3rem;
  }
}

@media (max-width: 56.25em) {
  .what-about-it {
    &__header {
      min-width: 40%;
      font-size: 3.5rem;
      margin: 5rem 0;
      line-height: 6rem;
    }
  }
}

@media (max-width: $max-width-tablet) {
  .what-about-it {
    &__layout-container {
      display: block;
    }

    &__header {
      font-size: 4rem;
      margin: 1rem 0 5rem;
      line-height: 6rem;
    }

    &__button {
      display: flex;
      justify-content: center;
    }
  }

  .why-to-join {
    &__button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
