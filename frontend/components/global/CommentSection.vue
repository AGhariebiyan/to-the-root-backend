<template>
  <div>
    <h3 class="title">Comments</h3>

    <h4 class="leave-a-comment">Leave a comment</h4>
    <form @submit.prevent="addComment">
      <div>
        <textarea
          class="leave-a-comment__comment-text"
          v-model="newCommentText"
        />
      </div>
      <div>
        <button type="submit">Reply</button>
      </div>
    </form>

    <div class="comment-list">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :user="comment.user.username"
        :date="comment.created_at"
        :content="comment.content"
      />
    </div>
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
  name: 'CommentSection',

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

    const comments = computed(() => {
      return store.getters['comments/comments']
    })

    onMounted(async () => {
      try {
        await loadComments()
      } catch (err) {
        console.log(err)
      }
    })

    async function loadComments() {
      isLoading.value = true
      try {
        store.dispatch('comments/fetchCommentsByArticle', props.articleId)
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    }

    const newCommentText = ref('')

    async function addComment() {
      store
        .dispatch('comments/addComment', {
          articleId: props.articleId,
          commentText: newCommentText.value,
        })
        .then(() => {
          newCommentText.value = ''
        })
    }

    return {
      newCommentText,
      addComment,
      comments,
    }
  },
})
</script>

<style lang="scss" scoped>
.title {
  margin-top: 2rem;
}

.leave-a-comment {
  margin-top: 1.5rem;
}

.leave-a-comment__comment-text {
  padding: 0.3rem;
}

.comment-list {
  margin-top: 0.5rem;
}
</style>