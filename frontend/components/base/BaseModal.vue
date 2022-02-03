<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal__card" @click.stop>
      <div class="modal__close-button" @click="$emit('close')">×</div>
      <h2 class="modal__heading">
        <slot name="heading" />
      </h2>
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(black, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    position: relative;
    max-width: 30rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: white;
  }

  &__close-button {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-size: 2rem;

    &:hover {
      cursor: pointer;
      color: $discovery-blue-primary;
    }
  }

  &__heading {
    margin-bottom: 1rem;
  }
}
</style>
