<template>
  <div>
    <h3 class="comment-section-title">Comments</h3>

    <h4 class="leave-a-comment">Leave a comment</h4>
    <form @submit.prevent="leaveComment">
      <div class="form-group">
        <textarea class="form-input" v-model="newCommentText" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-blue">Reply</button>
      </div>
    </form>

    <div class="comment-list">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :author="comment.user.username"
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
  },

  setup(props) {
    const isLoading = ref(true)

    const { store } = useContext()

    // comments
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

    async function leaveComment() {
      store
        .dispatch('comments/addComment', {
          articleId: props.articleId,
          commentText: newCommentText.value,
        })
        .then(() => {
          newCommentText.value = ''
          loadComments()
        })
    }

    return {
      newCommentText,
      leaveComment,
      comments,
    }
  },
})
</script>

<style lang="scss" scoped>
.comment-section-title {
  margin-top: 20px;
}

.leave-a-comment {
  margin-top: 15px;
}

.comment-list {
  margin-top: 5px;
}
</style>