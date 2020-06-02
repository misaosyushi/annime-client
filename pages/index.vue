<template>
  <animes :season-title="pageTitle" :season-id="seasonId" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import { Season } from '@/entity/Anime'

const PAGE_TITLE = '今期のアニメ'

export default defineComponent({
  head() {
    return {
      title: PAGE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: '今期のアニメ一覧です。'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
  },
  components: {
    Animes
  },
  setup(_props, context) {
    const pageTitle = PAGE_TITLE
    const seasonId = ref<number>()

    const season: Season[] = context.root.$store.state.season.season
    context.root.$nuxt.$store.commit('season/filterSeasonId', season)
    seasonId.value = context.root.$store.state.season.seasonId

    return {
      pageTitle,
      seasonId
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
