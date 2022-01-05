<template>
  <div>
    <h3 class="title">Comments</h3>
    <div class="comment-list">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :author="comment.author.name"
        :date="comment.created_at"
        :content="comment.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    articleId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.title {
  margin-top: 20px;
}

.comment-list {
  margin-bottom: 20px;
}
</style>