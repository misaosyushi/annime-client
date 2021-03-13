<template>
  <animes :season-title="seasonName + 'のアニメ'" :target-season="$route.params.seasonId" />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'

export default defineComponent({
  head() {
    return {
      title: 'クール別アニメ一覧',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'クール別のアニメ一覧です。'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
    }
  },
  components: {
    Animes
  },
  setup(_props, context: SetupContext) {
    const seasonName = context.root.$store.state.season.seasonNameText

    return {
      seasonName
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
