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
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseButton from '~/components/base/BaseButton.vue'
import BaseContainer from '../components/base/BaseContainer.vue'
import BasePageLayout from '../components/base/BasePageLayout.vue'

export default defineComponent({
  components: { BaseButton, BaseContainer, BasePageLayout },
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
  }

  &__item {
  }
}
</style>
