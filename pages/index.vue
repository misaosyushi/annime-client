<template>
  <animes :page-title="pageTitle" :target-season="thisSeason" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import Animes from '@/components/Animes.vue'

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
  setup() {
    const pageTitle = PAGE_TITLE
    let thisSeason = ''

    const splited = dayjs()
      .locale(ja)
      .format('YYYY-MM')
      .split('-')

    if (splited[1] === '04' || splited[1] === '05' || splited[1] === '06') {
      thisSeason = splited[0] + '-spring'
    } else if (splited[1] === '07' || splited[1] === '08' || splited[1] === '09') {
      thisSeason = splited[0] + '-summer'
    } else if (splited[1] === '10' || splited[1] === '11' || splited[1] === '12') {
      thisSeason = splited[0] + '-autumn'
    } else if (splited[1] === '01' || splited[1] === '02' || splited[1] === '03') {
      thisSeason = splited[0] + '-winter'
    }

    return {
      pageTitle,
      thisSeason
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
