<template>
  <div class="comment">
    <div class="comment__user">{{ user }}</div>
    <span class="comment__date">{{ formattedDate }}</span>
    <div class="comment__content">{{ content }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

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

  setup(props) {
    const formattedDate = computed(() => {
      var newDate = props.date.replace('T', ' at ')
      return newDate.replace('Z', '')
    })

    return {
      formattedDate,
    }
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