<template>
  <div class="article__likes" @click="addLike">
    <span class="material-icons-outlined">thumb_up</span>
    <div class="article__number-of-likes">{{ likes.length }}</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useContext,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LikeButton',

  props: {
    articleId: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const isLoading = ref(true)

    const { store } = useContext()

    const likes = computed(() => {
      return store.getters['likes/likes']
    })

    onMounted(async () => {
      try {
        await loadLikes()
      } catch (err) {
        console.log(err)
      }
    })

    async function loadLikes() {
      isLoading.value = true
      try {
        store.dispatch('likes/fetchLikesByArticle', props.articleId)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    async function addLike() {
      store.dispatch('likes/addLike', {
        articleId: props.articleId,
      })
    }

    return {
      likes,
      loadLikes,
      addLike,
    }
  },
})
</script>

<style lang="scss" scoped>
.article {
  &__likes {
    display: flex;
    align-items: center;
    margin-right: 2rem;

    &:hover {
      color: $accelerate-blue-primary;
      cursor: pointer;
    }
  }

  &__number-of-likes {
    margin-left: 1rem;
  }
}
</style>