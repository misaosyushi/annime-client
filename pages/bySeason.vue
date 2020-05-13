<template>
  <animes :season-title="name + 'のアニメ'" :season-id="id" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'

export default defineComponent({
  head() {
    return {
      title: 'シーズン別アニメ一覧'
    }
  },
  components: {
    Animes
  },
  setup(_props, context) {
    const id = context.root.$route.query.id || 0
    const name = context.root.$route.query.name || ''

    return {
      id,
      name
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
