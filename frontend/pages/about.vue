<template>
  <BasePageLayout>
    <section class="wrapper what-about-it">
      <div class="what-about-it__layout-container">
        <h1 class="what-about-it__header">So, what about it?</h1>
        <div class="what-about-it__content">
          <p class="what-about-it__paragraph">
            "Ahead Of IT" is an accesible platform and guild welcome to software
            developers who are looking for a place to grow, contribute to open
            source software and have cool events or just share thoughts and hang
            out.
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
          <BaseButtonNew
            class="what-about-it__button"
            nav-route="/discord"
            button-color="white"
            >Join Us</BaseButtonNew
          >
        </div>
      </div>
    </section>

    <section class="wrapper why-to-join">
      <h2 class="why-to-join__header">Why to join</h2>
      <p class="why-to-join__paragraph">
        Technology, more than any other science, is a field of cooperation. Not
        only do we do better work together, we wouldn’t even have a field if it
        wasn’t for giants like Nicola Tesla, Alan Turing and Tim Berners-Lee.
        That is what Ahead Of IT is all about. It’s about appreciating the
        shoulders we stand on, and, in all modesty, trying to be the shoulders
        for the next generation. Not only do we share our best ideas, we go to
        work on them. So if you are looking to join a community that is on a
        mission to make a difference – you came to the right place.
      </p>
      <BaseButtonNew
        class="why-to-join__button"
        nav-route="/open-source"
        button-color="gray-dark"
        >Contribute together</BaseButtonNew
      >
    </section>

    <section class="wrapper how-to-join">
      <h2 class="how-to-join__header">How to join</h2>
      <div class="how-to-join__cards">
        <BaseActionCard
          icon-image="newspaper-regular.svg"
          nav-route="/contribute"
        >
          <template v-slot:title>Start writing articles</template>
          <template v-slot:info-text
            >Knowledge to share? We will help you spread the word.</template
          >
          <template v-slot:button-text>Contact the editors</template>
        </BaseActionCard>

        <BaseActionCard icon-image="video-solid.svg" nav-route="/contribute">
          <template v-slot:title>Start making videos</template>
          <template v-slot:info-text
            >Are you into vlogging, making tutorials and rather share in video?
            Let us know.</template
          >
          <template v-slot:button-text>Contact the editors</template>
        </BaseActionCard>

        <BaseActionCard icon-image="discord-brands.svg" nav-route="/discord">
          <template v-slot:title>Join our Discord</template>
          <template v-slot:info-text
            >Connect to like-minded IT professionals.</template
          >
          <template v-slot:button-text>Join our Discord channel</template>
        </BaseActionCard>

        <BaseActionCard icon-image="handshake-regular.svg" nav-route="/discord">
          <template v-slot:title>Start mobbing* together</template>
          <template v-slot:info-text
            >We have regular mobbing sessions to help out the open source
            community.</template
          >
          <template v-slot:button-text>More about our sessions</template>
        </BaseActionCard>
      </div>
    </section>
  </BasePageLayout>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 12rem;
}

.what-about-it {
  background: $gray;
  color: $white;

  &__layout-container {
    display: flex;
  }

  &__header {
    min-width: 35rem;
    font-size: 6rem;
    margin: 5rem 0 0;
    line-height: 7rem;
    font-family: 'Poppins-Medium';
  }

  &__paragraph {
    margin-bottom: 2rem;
  }

  &__action-button {
  }
}

.why-to-join {
  background: $gray-light;
  color: $gray-dark;

  &__paragraph {
    margin-bottom: 1rem;
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

@media (max-width: 500px) {
}
</style>
