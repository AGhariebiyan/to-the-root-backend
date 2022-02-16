<template>
  <div class="action-card">
    <img
      class="action-card__icon"
      :src="require(`~/assets/icons/${iconImage}`)"
    />
    <h3 class="action-card__title"><slot name="title"></slot></h3>
    <p class="action-card__info-text"><slot name="info-text"></slot></p>
    <OutlineButton
      class="action-card__button"
      :nav-route="navRoute"
      color="gray-darker"
      :is-responsive="true"
      ><slot name="button-text"></slot
    ></OutlineButton>
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
  height: 30rem;
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
    font-size: 1rem;
  }

  &__button {
    position: absolute;
    bottom: 2rem;
  }
}

@media (max-width: 56.25em) {
  .action-card {
    padding: 1.5rem 3rem;

    &__icon {
      width: 4rem;
      margin: 1rem 0 3rem;
    }

    &__title {
      font-size: 1.5rem;
      margin-bottom: 3rem;
    }

    &__info-text {
      font-size: 1rem;
    }

    &__button {
      position: absolute;
      bottom: 1rem;
    }
  }
}

@media (max-width: 42.5em) {
  .action-card {
    padding: 1rem 2rem;
    height: 28rem;

    &__title {
      font-size: 1.4rem;
      margin-bottom: 2rem;
    }

    &__info-text {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 34.375em) {
  .action-card {
    width: 100%;

    &__icon {
      width: 5rem;
    }

    &__title {
      font-size: 1.7rem;
      margin-bottom: 2rem;
    }

    &__info-text {
      font-size: 1.2rem;
    }
  }
}

@media (max-width: $max-width-phone) {
  .action-card {
    &__icon {
      width: 4rem;
    }

    &__title {
      font-size: 1.6rem;
    }

    &__info-text {
      font-size: 1.1rem;
    }
  }
}
</style>
