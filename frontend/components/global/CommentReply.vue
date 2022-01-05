<template>
  <div class="comment-reply">
    <form @submit.prevent="leaveComment">
      <div class="form-group">
        <textarea class="form-input" v-model="newCommentText" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-blue">Reply</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.comment-reply {
  margin-top: 20px;
}
</style>