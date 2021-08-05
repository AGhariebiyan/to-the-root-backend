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
        <NuxtLink to="/contact"
          ><BaseButton buttonType="primary">Contact</BaseButton></NuxtLink
        >
        <NuxtLink to="/signup"
          ><BaseButton buttonType="primary">Join</BaseButton></NuxtLink
        >
      </div>
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

  &__heading {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__paragraph {
    margin-bottom: 4rem;
  }

  &__buttons {
    display: flex;
    justify-content: center;

    & > a:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
