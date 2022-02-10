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
      :is-responsive="true"
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
    font-size: 1rem;
  }

  &__button {
    position: absolute;
    bottom: 2rem;
  }
}

@media (max-width: 900px) {
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

@media (max-width: 680px) {
  .action-card {
    padding: 1rem 2rem;
    min-height: 28rem;

    &__icon {
      width: 4rem;
      margin: 1rem 0 3rem;
    }

    &__title {
      font-size: 1.4rem;
      margin-bottom: 2rem;
    }

    &__info-text {
      font-size: 0.9rem;
    }

    &__button {
      position: absolute;
      bottom: 1rem;
    }
  }
}

@media (max-width: 550px) {
  .action-card {
    width: 100%;
    padding: 1rem 2rem;

    &__icon {
      width: 5rem;
      margin: 1rem 0 3rem;
    }

    &__title {
      font-size: 1.7rem;
      margin-bottom: 2rem;
    }

    &__info-text {
      font-size: 1.2rem;
    }

    &__button {
      position: absolute;
      bottom: 1rem;
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
      margin-bottom: 2rem;
    }

    &__info-text {
      font-size: 1.1rem;
    }
  }
}
</style>
