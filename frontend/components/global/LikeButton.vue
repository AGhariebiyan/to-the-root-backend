<template>
  <div class="article__likes" @click="toggleLike">
    <span
      :class="[
        {
          'material-icons-outlined': likeFromUser === undefined,
          'material-icons': likeFromUser,
        },
      ]"
      >thumb_up</span
    >
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
  useRouter,
} from '@nuxtjs/composition-api'
import { Like } from '~/utils/types'

export default defineComponent({
  name: 'LikeButton',

  props: {
    articleId: {
      type: Number,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const isLoading = ref(true)

    const { store, $auth } = useContext()
    const router = useRouter()

    const likes = computed(() => {
      return store.getters['likes/likes'] as Like[]
    })

    var likeFromUser = computed(() => {
      return store.getters['likes/likeFromUser'] as Like
    })

    onMounted(async () => {
      try {
        await loadLikes()
        await loadLikeFromUser()
      } catch (err) {
        console.log(err)
      }
    })

    async function loadLikes() {
      isLoading.value = true
      try {
        await store.dispatch('likes/fetchLikesByArticle', props.articleId)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    async function loadLikeFromUser() {
      isLoading.value = true

      if (!$auth.user) {
        await store.dispatch('likes/removeLikeFromUser')
        return
      }

      try {
        await store.dispatch('likes/fetchLikeFromUser', $auth.user.id)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    async function toggleLike() {
      const user = $auth.user

      if (user === null || user === false) {
        router.push({
          path: '/login',
          query: { redirectSlug: `${props.articleSlug}` },
        })
        return
      }

      if (!likeFromUser.value) {
        await store.dispatch('likes/addLike', {
          userId: user.id,
          articleId: props.articleId,
        })
      } else {
        await store.dispatch('likes/removeLike', {
          like: likeFromUser.value,
        })
      }
    }

    return {
      likes,
      likeFromUser,
      toggleLike,
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