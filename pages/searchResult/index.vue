<template>
  <div>
    <animes :target-anime-title="animeTitle" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'
import { useSeason } from '@/store/season'

export default defineComponent({
  components: {
    Animes
  },
  setup(_props, context: SetupContext) {
    const animeTitle = computed(() => context.root.$route.query.title || '')
    const season = useSeason()
    season.$reset()

    return {
      animeTitle
    }
  },
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
  }
})
</script>
