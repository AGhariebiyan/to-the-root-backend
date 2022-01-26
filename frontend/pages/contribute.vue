<template>
  <BasePageLayout>
    <div class="contribute-wrapper">
      <div class="wrapper">
        <h1>Contribute</h1>
      </div>
    </div>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
  },
})
</script>

<style lang="scss" scoped>
.contribute-wrapper {
  background: linear-gradient(
      0deg,
      rgba($accelerate-blue-primary, 0.5),
      rgba($accelerate-blue-primary, 0.5)
    ),
    url('https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2420&q=80');
  background-size: cover;
  height: 100vh;
}

.wrapper {
  background: crimson;
  padding: 150px;
  max-width: 630px;
  height: 100%;
  margin: 0 auto;
  justify-content: center;

  text-align: center;
}
</style>
