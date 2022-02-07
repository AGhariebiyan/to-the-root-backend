<template>
  <div class="color-mode__options">
    <div v-for="color of colors" :key="color">
      <label class="color-mode__label">
        <input
          class="color-mode__input"
          type="radio"
          v-model="$colorMode.preference"
          :value="color"
          :name="color"
        />
        <img
          class="color-mode__image"
          :src="require(`~/assets/icons/icon-${color}.png`)"
          :alt="color"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const colors = ['system', 'light', 'dark']

    return {
      colors,
    }
  },
}
</script>

<style lang="scss" scoped>
.color-mode {
  &__options {
    display: flex;
  }

  &__label {
    padding-right: 10px;
  }

  /* HIDE RADIO */
  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* IMAGE STYLES */
  &__input + &__image {
    cursor: pointer;
    padding: 5px;
    height: 30px;
    width: auto;
  }

  /* CHECKED STYLES */
  &__input:checked + &__image {
    background: $gray;
  }
}
</style>