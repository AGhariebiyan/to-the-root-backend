<template>
  <BasePageLayout>
    <h1>Community</h1>
    <BaseContainer containerType="color">
      <div>this is a space for a header image or video</div>
      <section class="core-values">
        <h2>Our community core values</h2>
        <ul>
          <li v-for="coreValue in coreValues" :key="coreValue.name">
            <CoreValue :core-value="coreValue" />
          </li>
        </ul>
      </section>
    </BaseContainer>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
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

<style lang="scss" scoped></style>
