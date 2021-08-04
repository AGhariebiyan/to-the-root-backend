<template>
  <div class="share-buttons">
    <p class="share-buttons__text">Share:</p>
    <ShareNetwork
      v-for="social in socials"
      :key="social.name"
      class="share-buttons__button"
      :network="social.name"
      :url="url"
      :title="article.title"
      :description="article.title"
      :hashtags="categories"
    >
      <span class="icon-wrapper" v-html="social.icon"></span>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: ['article', 'url'],
  setup(props) {
    const socials = [
      {
        name: 'facebook',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path
            d="M15 4.129h-2.856c-.338 0-.715.444-.715 1.039V7.23H15v2.94h-3.571V19H8.057v-8.829H5V7.23h3.057V5.5c0-2.481 1.722-4.5 4.086-4.5H15v3.129z"
            fill="#333"
          /></svg
      >`,
      },
      {
        name: 'linkedin',
        icon: `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.963 10.42v6.562h-3.85V10.86c0-1.538-.557-2.588-1.95-2.588-1.064 0-1.697.708-1.976 1.392-.101.245-.128.585-.128.927v6.39H6.208s.052-10.368 0-11.442h3.851v1.622l-.025.037h.025v-.037c.512-.779 1.425-1.89 3.47-1.89 2.535 0 4.434 1.635 4.434 5.15zM2.18.023C.862.023 0 .877 0 2c0 1.098.837 1.978 2.128 1.978h.026c1.343 0 2.178-.88 2.178-1.978C4.307.877 3.497.023 2.18.023zM.23 16.982h3.85V5.539H.229v11.443z"
            fill="#333"
          /></svg
      >`,
      },
    ]

    const categories = props.article.categories
      .map((category) => category.name)
      .join(',')
    return { socials, categories }
  },
}
</script>

<style lang="scss" scoped>
.share-buttons {
  display: flex;
  align-items: center;

  &__text {
    margin-right: 0.5rem;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: $accelerate-blue-5;
    border-radius: 50%;
    padding: 1.3rem;
    height: 2rem;
    width: 2rem;

    &:not(:last-child) {
      margin-right: 0.25rem;
    }

    &:hover {
      background-color: $accelerate-blue-3;
    }
  }
  .icon-wrapper {
    display: flex;
    align-items: center;
  }
}
.path {
  fill: red;
}
</style>
