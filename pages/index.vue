<template>
  <animes season-title="今期のアニメ" :season-id="seasonId" />
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from '@vue/composition-api'
import dayjs from 'dayjs'
import Animes from '@/components/Animes.vue'
import 'dayjs/locale/ja'
import { Season } from '@/entity/Anime'

export default defineComponent({
  components: {
    Animes
  },
  head() {
    return {
      title: '今期のアニメ',
      meta: [
        // TODO: ちゃんと書く
        // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
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
    const seasonId = ref<number>()

    watchEffect(async () => {
      // TODO: season情報はストアにもたせて、ここではAPI呼ばないようにする
      season = await context.root.$axios.$get<Season[]>('/season')
      const filterSeason = season.filter((val) => val.seasonText === thisSeason)
      seasonId.value = filterSeason[0].id
    })

    return {
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
