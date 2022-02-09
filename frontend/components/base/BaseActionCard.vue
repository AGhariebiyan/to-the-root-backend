<template>
  <div class="action-card">
    <img
      class="action-card__icon"
      :src="require(`~/assets/icons/${iconImage}`)"
      alt="newspaper"
    />
    <h1 class="action-card__title"><slot name="title"></slot></h1>
    <p class="action-card__info-text"><slot name="info-text"></slot></p>
    <BaseButtonNew
      class="action-card__button"
      :nav-route="navRoute"
      button-color="gray-darker"
      ><slot name="button-text"></slot
    ></BaseButtonNew>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    navRoute: {
      type: String,
      required: true,
    },
    iconImage: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.action-card {
  width: 47%;
  background: $white;
  color: $gray-darker;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  min-height: 30rem;
  position: relative;

  &__icon {
    width: 5rem;
    margin: 1rem 0 3rem;
  }

  &__title {
    font-size: 1.7rem;
    margin-bottom: 3rem;
  }

  &__info-text {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  &__button {
    margin-bottom: 1rem;
    position: absolute;
    bottom: 3rem;
  }
}
</style>
