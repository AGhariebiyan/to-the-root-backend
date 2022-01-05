<template>
  <div class="comment-card">
    <div class="author comment-card">{{ author }}</div>
    <span class="date">{{ date }}</span>
    <div class="content">{{ content }}</div>
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
.comment-card {
  margin-top: 15px;
}
</style>