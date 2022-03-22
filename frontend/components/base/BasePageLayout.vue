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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
