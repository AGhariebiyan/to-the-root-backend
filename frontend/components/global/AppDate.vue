<template>
  <span>
    {{ differenceForHumans }}
  </span>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugins/relativeTime'
// import localizedDate from 'dayjs/plugins/localizedFormat'
// dayjs.extend(relativeTime)
// dayjs.extend(localizedDate)

export default defineComponent({
  props: {
    timeStamp: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const differenceForHumans = computed(() => {
      const date = new Date(props.timeStamp)
      //   return dayjs(date).fromNow()
      return dayjs(date).format('DD-MM-YYYY - HH:mm')
    })

    return {
      differenceForHumans,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>