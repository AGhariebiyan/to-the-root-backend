<template>
  <main class="main">
    <slot>BASE_PAGE_LAYOUT</slot>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
