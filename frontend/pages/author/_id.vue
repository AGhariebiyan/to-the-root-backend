<template>
  <BasePageLayout>
    <BaseContainer>
      <h1></h1>
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
      biography: 'this is a biography',
      github: 'github.com/awesome',
      linkedIn: 'linkedin.com/awesome',
      twitter: 'twitter.com/awesome',
      email: 'awesome@unicorns.com',
      id: 6,
      name: 'Kylian The Awesome Intern',
      photo: 'http://localhost:1337/uploads/1517692035374_b0c8b9e4f5.jpeg',
    }

    return { authorData, strapiUrl }
  },
})
</script>

<style lang="scss" scoped></style>
