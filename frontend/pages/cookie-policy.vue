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
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()
    title.value = `Cookie policy / ${process.env.platformName}`
  },
})
</script>


<style lang="scss" scoped>
.header {
  margin-bottom: 3rem;
}
</style>
