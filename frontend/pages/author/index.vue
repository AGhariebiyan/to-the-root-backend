<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>Author</h1>
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
  },
})
</script>

<style lang="scss" scoped>
        </style>
