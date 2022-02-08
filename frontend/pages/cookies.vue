<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>Cookies</h1>
    </BaseContainer>
    <BaseContainer>
      <div v-if="isLoading">Loading</div>
      <section v-else>
        <p></p>

        <div class="toggle" @click="toggleGA">
          <input
            type="checkbox"
            id="toggle__input"
            class="toggle__input"
            checked="checked"
            v-model="enableGoogleAnalytics"
          />
          <label class="toggle__label" for="toggle__input"
            >Enable Google Analytics</label
          >
          <div class="toggle__switch"></div>
        </div>
      </section>
    </BaseContainer>
  </BasePageLayout>
</template>

<script>
import BasePageLayout from '../components/base/BasePageLayout.vue'
export default {
  components: { BasePageLayout },
}
</script>

<style lang="scss">
.toggle {
  display: flex;
  align-items: center;
  position: relative;

  &__label {
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
    background-image: linear-gradient(to right, $gray-darkest, $gray-darker);
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
      background-color: $white;
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

  &__input:checked ~ .toggle__switch {
    background-image: linear-gradient(
      to right,
      $accelerate-blue-primary,
      $discovery-blue-primary
    );
  }
}
</style>
