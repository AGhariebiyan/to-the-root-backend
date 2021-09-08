<template>
  <BasePageLayout>
    <BaseContainer>
      <div>this is a space for a header image or video</div>
    </BaseContainer>
    <BaseContainer containerType="color">
      <section class="core-values">
        <h2 class="core-values__heading">Our community core values</h2>
        <ul class="core-values__list">
          <li
            class="core-values__item"
            v-for="coreValue in coreValues"
            :key="coreValue.name"
          >
            <CoreValue :core-value="coreValue" />
          </li>
        </ul>
      </section>
    </BaseContainer>
    <BaseContainer class="mission" containerType="narrow">
      <h2 class="mission__heading">Our mission</h2>
      <p class="mission__paragraph">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
        incidunt voluptas atque sequi similique illo dolor exercitationem in
        repellendus inventore consequuntur error laudantium ratione consequatur,
        eligendi dolore odio sapiente et libero placeat, qui doloribus aliquid
        dignissimos cupiditate. Debitis ipsam quisquam illum nisi, sit sunt
        molestiae quidem dolores repellendus cupiditate non illo animi dolorem
        omnis quaerat rem facilis fuga praesentium, mollitia necessitatibus
        corporis. Deserunt perspiciatis animi magnam quibusdam aut porro at
        quidem aliquid, minus totam dignissimos laudantium.
      </p>
      <div class="mission__buttons">
        <NuxtLink to="/contact" class="mission__button button-link"
          >Contact</NuxtLink
        >
        <NuxtLink to="/signup" class="mission__button button-link"
          >Join</NuxtLink
        >
      </div>
    </BaseContainer>
    <BaseContainer class="discord">
      <div class="discord__text">
        <h2 class="discord__title">Join Our Discord Community</h2>
        <p class="discord__paragraph">
          Feel free to join our Discord Community. For everyone interested in
          contributing to open-source Feel free to join our Discord Community.
          For everyone interested in contributing to open-source Feel free to
          join our Discord Community. For everyone interested in contributing to
          open-source Feel free to join our Discord Community. For everyone
          interested in contributing to open-source Feel free to join our
          Discord Community. For everyone interested in contributing to
          open-source
        </p>
      </div>
      <iframe
        src="https://discordapp.com/widget?id=845429016798035999&theme=dark"
        width="350"
        height="500"
        allowtransparency="true"
        frameborder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '~/components/base/BaseButton.vue'
import BaseContainer from '~/components/base/BaseContainer.vue'
import BasePageLayout from '~/components/base/BasePageLayout.vue'

export default defineComponent({
  components: { BaseButton, BaseContainer, BasePageLayout },
  setup() {
    const coreValues = [
      {
        name: 'discover',
        heading: 'Discover',
        icon: 'compass',
        description:
          'Discover the possibilities of contributing to open source',
      },
      {
        name: 'learn',
        heading: 'Learn',
        icon: 'learn',
        description: 'Get better at programming by learning from your peers',
      },
      {
        name: 'contribute',
        heading: 'Contribute',
        icon: 'git_merge',
        description:
          'Make and share your contribution to the open source world',
      },
      {
        name: 'network',
        heading: 'Network',
        icon: 'network',
        description: 'See what other opportunities lie ahead for your career',
      },
    ]
    return { coreValues }
  },
})
</script>

<style lang="scss" scoped>
.core-values {
  &__heading {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__list {
    list-style: none;
    display: flex;

    @include respond(tab-landscape) {
      flex-direction: column;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 3rem;

      @include respond(tab-landscape) {
        margin-right: 0;
        margin-bottom: 3rem;
      }
    }
  }
}
.mission {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  &__heading {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__paragraph {
    margin-bottom: 2rem;
  }

  &__buttons {
    display: flex;
    justify-content: center;

    & > a:not(:last-child) {
      margin-right: 2rem;
    }
  }

  &__button {
    min-width: 6rem;
    text-align: center;
  }
}

.discord {
  &__title {
    margin-bottom: 2rem;
    margin-right: 1rem;
  }
  &__text {
    .discord__paragraph {
      width: 80%;
    }
  }
  @include respond(tab-portrait) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &__text {
      padding-bottom: 2rem;
      .discord__paragraph {
        margin: 0 auto 1rem;
        text-align: left;
        width: 100%;
      }
    }
  }
  @include respond(phone) {
    padding: 3rem 0.5rem;
    margin: 0;
    iframe {
      width: 18.75rem;
    }
  }
}
</style>
