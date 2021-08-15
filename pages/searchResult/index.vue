<template>
  <animes season-title="検索結果" :target-anime-title="animeTitle" />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'

export default defineComponent({
  head() {
    return {
      title: '検索結果',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'アニメタイトルによる検索結果です。'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
  },
  components: {
    Animes
  },
  setup(_props, context: SetupContext) {
    const animeTitle = context.root.$route.query.title || ''
    console.log(animeTitle)

    return {
      animeTitle
    }
  }
})
</script>
