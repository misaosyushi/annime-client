<template>
  <animes :season-title="pageTitle" :season-id="seasonId" />
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from '@vue/composition-api'
import dayjs from 'dayjs'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'
import { Season } from '@/entity/Anime'

const PAGE_TITLE = '今期のアニメ'

export default defineComponent({
  head() {
    return {
      title: PAGE_TITLE
    }
  },
  components: {
    Animes
  },
  setup(_props, context) {
    dayjs.locale('ja')

    const splited = dayjs()
      .format('YYYY-MM')
      .split('-')

    let thisSeason = ''
    if (splited[1] === '04' || splited[1] === '05' || splited[1] === '06') {
      thisSeason = splited[0] + '-spring'
    } else if (splited[1] === '07' || splited[1] === '08' || splited[1] === '09') {
      thisSeason = splited[0] + '-summer'
    } else if (splited[1] === '10' || splited[1] === '11' || splited[1] === '12') {
      thisSeason = splited[0] + '-autumn'
    } else if (splited[1] === '01' || splited[1] === '02' || splited[1] === '03') {
      thisSeason = splited[0] + '-winter'
    }

    let season: Season[] = []
    const pageTitle = PAGE_TITLE
    const seasonId = ref<number>()

    watchEffect(async () => {
      // TODO: season情報はストアにもたせて、ここではAPI呼ばないようにする
      season = await context.root.$axios.$get<Season[]>('/season')
      const filterSeason = season.filter((val) => val.seasonText === thisSeason)
      seasonId.value = filterSeason[0].id
    })

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
