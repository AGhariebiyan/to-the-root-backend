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
    <BaseContainer class="mission narrow-grid">
      <h2>Our mission</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
        incidunt voluptas atque sequi similique illo dolor exercitationem in
        repellendus inventore consequuntur error laudantium ratione consequatur,
        eligendi dolore odio sapiente et libero placeat, qui doloribus aliquid
        dignissimos cupiditate. Debitis ipsam quisquam illum nisi, sit sunt
        molestiae quidem dolores repellendus cupiditate non illo animi dolorem
        omnis quaerat rem facilis fuga praesentium, mollitia necessitatibus
        corporis. Deserunt perspiciatis animi magnam quibusdam aut porro at
        quidem aliquid, minus totam dignissimos laudantium, officia, nobis sit
        itaque dolores sequi molestiae earum magni! Quasi animi, dolorem
        doloribus commodi, minus, sapiente minima ratione tempora veritatis quia
        itaque nemo tenetur.
      </p>
      <div class="mission__buttons">
        <BaseButton buttonType="primary">Contact</BaseButton>
        <BaseButton buttonType="primary">Join</BaseButton>
      </div>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '~/components/base/BaseButton.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseContainer from '../components/base/BaseContainer.vue'
import BasePageLayout from '../components/base/BasePageLayout.vue'

export default defineComponent({
  components: { BaseButton, BaseContainer, BasePageLayout, BaseCard },
  setup() {
    const coreValues = [
      {
        name: 'fun',
        heading: 'Have fun',
        icon: 'something',
        description: 'sample text sparkling unicorns lorem ipsum rainbows',
      },
      {
        name: 'learn',
        heading: 'Learn',
        icon: 'something',
        description: 'sample text sparkling unicorns lorem ipsum rainbows',
      },
      {
        name: 'contribute',
        heading: 'Contribute',
        icon: 'something',
        description: 'sample text sparkling unicorns lorem ipsum rainbows',
      },
      {
        name: 'network',
        heading: 'Network',
        icon: 'something',
        description: 'sample text sparkling unicorns lorem ipsum rainbows',
      },
    ]
    return { coreValues }
  },
})
</script>

<style lang="scss" scoped>
.core-values {
  &__heading {
  }

  &__list {
    list-style: none;
    display: flex;

    @media screen and (max-width: 48em) {
      flex-direction: column;
    }
  }

  &__item {
  }
}
.mission {
  display: flex;
  flex-direction: column;
}
</style>
