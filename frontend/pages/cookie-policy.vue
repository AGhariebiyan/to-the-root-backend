<template>
  <BasePageLayout>
    <BaseContainer>
      <h1 class="header">Cookie Policy</h1>
      <p class="paragraph">
        These cookies are still in the
        <a href="https://www.cookiesandyou.com">oven</a>
      </p>
    </BaseContainer>
  </BasePageLayout>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { composePageTitle } from '~/utils/helpers'

export default defineComponent({
  head: {},
  setup() {
    composePageTitle('Cookie policy')
  },
})
</script>


<style lang="scss" scoped>
.header {
  margin-bottom: 3rem;
}
</style>
