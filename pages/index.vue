<template>
  <v-layout column>
    <h1>今期のアニメ</h1>
    <v-row>
      <v-col v-for="anime in animes" :key="anime.id" class="anime_card">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 16 : 2" class="mx-auto" max-width="600">
            <nuxt-link :to="`detail?id=${anime.id}&search=${anime.annictId}`">
              <!-- TODO: NO IMGEの表示のさせ方をもう少し考える -->
              <v-img height="250px" :src="anime.imageUrl" lazy-src="/no_image2.png" />
            </nuxt-link>
            <nuxt-link :to="`detail?id=${anime.id}&search=${anime.annictId}`" class="anime_link">
              <v-card-title>{{ anime.title }}</v-card-title>
            </nuxt-link>
            <v-divider />
            <v-card-subtitle
              >公式サイトURL：
              <a :href="anime.officialSiteUrl" target="_blank" rel="noopener noreferrer" class="anime_link">
                {{ anime.officialSiteUrl }}
              </a>
            </v-card-subtitle>
            <v-card-text>
              <!-- TODO: コンポーネント化-->
              <v-chip color="accent" outlined>
                <v-icon v-if="anime.media === 'TV'" left>mdi-television-classic</v-icon>
                <v-icon v-else-if="anime.media === 'OVA'" left>mdi-video</v-icon>
                <v-icon v-else-if="anime.media === '映画'" left>mdi-movie</v-icon>
                <v-icon v-else-if="anime.media === 'Web'" left>mdi-web</v-icon>
                <v-icon v-else-if="anime.media === 'その他'" left>mdi-television</v-icon>
                {{ anime.media }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import dayjs from 'dayjs'
import { Anime, Season } from '@/entity/Anime'
import 'dayjs/locale/ja'

export default defineComponent({
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
    const animes = ref<Anime[]>([])

    watchEffect(async () => {
      // TODO: season情報はストアにもたせて、ここではAPI呼ばないようにする
      season = await context.root.$axios.$get<Season[]>('/season')
      const filterSeason = season.filter((val) => val.seasonText === thisSeason)
      animes.value = await context.root.$axios.$get<Anime[]>(`/annimes/${filterSeason[0].id}`)
    })

    return {
      animes
    }
  }
})
</script>

<style lang="scss" scoped>
.anime_card {
  width: 450px;
}
</style>
