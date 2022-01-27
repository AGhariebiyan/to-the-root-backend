<template>
  <div class="cookie-modal__wrapper">
    <div class="cookie-modal__card">
      <p>This is the cookieModal</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cookie-modal {
  &__wrapper {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(black, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__card {
    width: 400px;
    height: 400px;
    background-color: white;
  }
}
</style>
