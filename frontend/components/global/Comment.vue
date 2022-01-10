<template>
  <div class="comment">
    <div class="comment__user">{{ user }}</div>
    <AppDate class="comment__date" :timeStamp="date" />
    <div class="comment__content">{{ content }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Comment',

  props: {
    user: {
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
.comment__user {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.comment__date {
  color: gray;
  font-size: 0.75rem;
}
</style>