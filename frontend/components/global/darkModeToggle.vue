<template>
  <div class="toggle">
    <input
      type="checkbox"
      id="toggle__input"
      class="toggle__input"
      checked="checked"
    />
    <label class="toggle__label" for="toggle__input">Dark Mode</label>
    <div class="toggle__switch"></div>
  </div>
</template>

<style lang="scss" scoped>
.toggle {
  //   color: $accelerate-blue-primary;
  display: flex;
  align-items: center;
  position: relative;

  @include respond(tab-port) {
    padding: 2rem 0;
    border-top: 1px solid $accelerate-blue-primary;
    justify-content: flex-start;
  }

  &__label {
    font-weight: 400;
    padding: 1rem 4.5rem 1rem 0rem;
    margin-right: -3.5rem;
    position: relative;
    cursor: pointer;
    z-index: 100;
  }

  &__switch {
    width: 3.5rem;
    height: 2rem;
    border-radius: 100px;
    background-image: var(--color-toggle-bg);
    position: relative;

    &::before {
      transition: all 0.8s ease;
      position: absolute;
      left: 0.25rem;
      top: 50%;
      transform: translate(0, -50%);
      content: '';
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: $accelerate-blue-primary;
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
    left: 1rem;
  }

  &__input:checked ~ .toggle__switch::before {
    transform: translate(1.525rem, -50%);
  }
}
</style>